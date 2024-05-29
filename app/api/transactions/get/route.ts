import {
  accounts as accountsSchema,
  transactions as transactionsSchema,
  categories as categoriesSchema,
} from "@/app/db/schema";
import { getAuthRouteData, parseJwt } from "@/shared/utils/api.utils";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
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

  const transactions = await db
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
    .where(eq(transactionsSchema.userId, userId.id));

  return NextResponse.json({ transactions: transactions });
}
