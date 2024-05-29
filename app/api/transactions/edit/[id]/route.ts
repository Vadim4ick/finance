import {
  accounts as accountsSchema,
  categories as categoriesSchema,
  transactions as transactionsSchema,
} from "@/app/db/schema";
import { BodyTransaction } from "@/entities/TableColumns";
import {
  NextApiError,
  getAuthRouteData,
  parseJwt,
} from "@/shared/utils/api.utils";
import { and, eq, inArray, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, params: { params: { id: string } }) {
  const { reqBody, db, token, validatedTokenResult } = await getAuthRouteData<{
    body: BodyTransaction;
  }>(req);

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

  if (!reqBody) {
    return NextApiError({
      error: "Введите название!",
      status: 400,
    });
  }

  const id = params.params.id;

  if (!id) {
    return NextApiError({
      error: "Введите id!",
      status: 400,
    });
  }

  const userId = (await parseJwt(token as string)) as { id: string };

  const data = await db
    .update(transactionsSchema)
    .set({
      payee: reqBody.body.payee,
      amount: reqBody.body.amount,
      date: new Date(reqBody.body.date),
      accountId: reqBody.body.accountId,
      notes: null,
    })
    .where(
      and(
        eq(transactionsSchema.userId, userId.id),
        eq(transactionsSchema.id, id),
      ),
    )
    .returning();

  if (!data) {
    return NextApiError({
      error: "Не удалось обновить!",
      status: 400,
    });
  }

  return NextResponse.json({ data: data });
}
