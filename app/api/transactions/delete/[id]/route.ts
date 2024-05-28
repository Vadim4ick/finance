import {
  accounts as accountsSchema,
  transactions as transactionsSchema,
} from "@/app/db/schema";
import {
  NextApiError,
  getAuthRouteData,
  parseJwt,
} from "@/shared/utils/api.utils";
import { and, eq, inArray, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, params: { params: { id: string } }) {
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

  const ids = params.params.id.split(",");

  if (!ids.length) {
    return NextApiError({
      error: "Введите id!",
      status: 400,
    });
  }

  const transactionsToDelete = db.$with("transactions_to_delete").as(
    db
      .select({ id: transactionsSchema.id })
      .from(transactionsSchema)
      .innerJoin(
        accountsSchema,
        eq(transactionsSchema.accountId, accountsSchema.id),
      )
      .where(
        and(
          inArray(transactionsSchema.id, ids),
          eq(transactionsSchema.userId, userId.id),
        ),
      ),
  );

  const data = await db
    .with(transactionsToDelete)
    .delete(transactionsSchema)
    .where(
      inArray(
        transactionsSchema.id,
        sql`(select id from ${transactionsToDelete})`,
      ),
    )
    .returning({
      id: transactionsSchema.id,
    });

  return NextResponse.json({ data });
}
