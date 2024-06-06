import {
  accounts as accountsSchema,
  transactions as transactionsSchema,
  categories as categoriesSchema,
} from "@/app/db/schema";
import { getAuthRouteData, parseJwt } from "@/shared/utils/api.utils";
import { parse, subDays } from "date-fns";
import { and, desc, eq, gte, lte } from "drizzle-orm";
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

  const from = new URL(req.url).searchParams.get("from");
  const to = new URL(req.url).searchParams.get("to");
  const accountId = new URL(req.url).searchParams.get("accountId");

  const deafultTo = new Date();
  const deafultFrom = subDays(deafultTo, 30);

  const startDate = from ? parse(from, "yyyy-MM-dd", new Date()) : deafultFrom;
  const endDate = to ? parse(to, "yyyy-MM-dd", new Date()) : deafultTo;

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
    .where(
      and(
        accountId ? eq(transactionsSchema.accountId, accountId) : undefined,
        eq(accountsSchema.userId, userId.id),
        gte(transactionsSchema.date, startDate),
        lte(transactionsSchema.date, endDate),
      ),
    )
    .orderBy(desc(transactionsSchema.date));

  return NextResponse.json({ transactions: transactions });
}
