import {
  accounts as accountsSchema,
  transactions as transactionsSchema,
  categories as categoriesSchema,
} from "@/app/db/schema";
import {
  NextApiError,
  getAuthRouteData,
  parseJwt,
} from "@/shared/utils/api.utils";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request, params: { params: { id: string } }) {
  const { db, token, validatedTokenResult } = await getAuthRouteData<{
    body: { name: string };
  }>(req, false);

  if (validatedTokenResult.status !== 200 && "error" in validatedTokenResult) {
    return NextResponse.json(
      {
        message: validatedTokenResult.error.message,
      },
      {
        status: validatedTokenResult.status,
      },
    );
  }

  const userId = (await parseJwt(token as string)) as { id: string };

  const id = params.params.id;

  if (!id) {
    return NextApiError({
      error: "Введите id!",
      status: 400,
    });
  }

  const [transaction] = await db
    .select({
      id: transactionsSchema.id,
      amount: transactionsSchema.amount,
      payee: transactionsSchema.payee,
      notes: transactionsSchema.notes,
      date: transactionsSchema.date,
      accountId: transactionsSchema.accountId,
      categoryId: transactionsSchema.categoryId,
      account: accountsSchema.name,
      category: categoriesSchema.name,
    })
    .from(transactionsSchema)
    .innerJoin(
      accountsSchema,
      eq(transactionsSchema.accountId, accountsSchema.id),
    )
    .leftJoin(
      categoriesSchema,
      eq(transactionsSchema.categoryId, categoriesSchema.id),
    )
    .where(
      and(
        eq(transactionsSchema.userId, userId.id),
        eq(transactionsSchema.id, id),
      ),
    );

  return NextResponse.json({ transaction: transaction });
}
