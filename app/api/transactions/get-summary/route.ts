import { accounts, categories, transactions } from "@/app/db/schema";
import { getAuthRouteData, parseJwt } from "@/shared/utils/api.utils";
import {
  differenceInDays,
  eachDayOfInterval,
  isSameDay,
  parse,
  subDays,
} from "date-fns";
import { and, desc, eq, gte, lt, lte, sql, sum } from "drizzle-orm";
import { NextResponse } from "next/server";

function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) {
    return previous === current ? 0 : 100;
  }

  return ((current - previous) / previous) * 100;
}

function fillMissionDays(
  activeDays: { date: Date; income: number; expenses: number }[],
  startDate: Date,
  endDate: Date,
) {
  const allDays = eachDayOfInterval({ start: startDate, end: endDate });

  const transactionsByDay = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day));

    if (found) {
      return found;
    } else {
      return {
        date: day,
        income: 0,
        expenses: 0,
      };
    }
  });

  return transactionsByDay;
}

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

  const from = new URL(req.url).searchParams.get("from");
  const to = new URL(req.url).searchParams.get("to");
  const accountId = new URL(req.url).searchParams.get("accountId");

  const userId = (await parseJwt(token as string)) as { id: string };

  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  const startDate = from ? parse(from, "yyyy-MM-dd", new Date()) : defaultFrom;

  const endDate = to ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo;

  const periodLength = differenceInDays(endDate, startDate) + 1;

  const lastPeriodStart = subDays(startDate, periodLength);
  const lastPeriodEnd = subDays(endDate, periodLength);

  async function fetchFinancialData(
    userId: string,
    startDate: Date,
    endDate: Date,
  ) {
    return await db
      .select({
        income:
          sql`SUM(CASE WHEN ${transactions.amount} >= 0 THEN ${transactions.amount} ELSE 0 END)`.mapWith(
            Number,
          ),
        expenses:
          sql`SUM(CASE WHEN ${transactions.amount} < 0 THEN ${transactions.amount} ELSE 0 END)`.mapWith(
            Number,
          ),
        remaining: sum(transactions.amount).mapWith(Number),
      })
      .from(transactions)
      .innerJoin(accounts, eq(transactions.accountId, accounts.id))
      .where(
        and(
          accountId ? eq(transactions.accountId, accountId) : undefined,
          eq(accounts.userId, userId),
          gte(transactions.date, startDate),
          lte(transactions.date, endDate),
        ),
      );
  }

  const [currentPeriod] = await fetchFinancialData(
    userId.id,
    startDate,
    endDate,
  );

  const [lastPeriod] = await fetchFinancialData(
    userId.id,
    lastPeriodStart,
    lastPeriodEnd,
  );

  console.log("lastPeriod", lastPeriod);

  const incomeChange = calculatePercentageChange(
    currentPeriod.income,
    lastPeriod.income,
  );

  const expensesChange = calculatePercentageChange(
    currentPeriod.expenses,
    lastPeriod.expenses,
  );

  const remainingChange = calculatePercentageChange(
    currentPeriod.remaining,
    lastPeriod.remaining,
  );

  const category = await db
    .select({
      name: categories.name,
      value: sql`SUM(ABS(${transactions.amount}))`.mapWith(Number),
    })
    .from(transactions)
    .innerJoin(accounts, eq(transactions.accountId, accounts.id))
    .innerJoin(categories, eq(transactions.categoryId, categories.id))
    .where(
      and(
        accountId ? eq(transactions.accountId, accountId) : undefined,
        eq(accounts.userId, userId.id),
        lt(transactions.amount, 0),
        gte(transactions.date, startDate),
        lte(transactions.date, endDate),
      ),
    )
    .groupBy(categories.name)
    .orderBy(desc(sql`SUM(ABS(${transactions.amount}))`));

  const topCategories = category.slice(0, 3);
  const otherCategories = category.slice(3);

  const otherSum = otherCategories.reduce(
    (sum, current) => sum + current.value,
    0,
  );
  const finalCategories = topCategories;

  if (otherCategories.length > 0) {
    finalCategories.push({
      name: "Other",
      value: otherSum,
    });
  }

  const activeDays = await db
    .select({
      date: transactions.date,
      income:
        sql`SUM(CASE WHEN ${transactions.amount} >= 0 THEN ${transactions.amount} ELSE 0 END)`.mapWith(
          Number,
        ),
      expenses:
        sql`SUM(CASE WHEN ${transactions.amount} < 0 THEN ABS(${transactions.amount}) ELSE 0 END)`.mapWith(
          Number,
        ),
    })
    .from(transactions)
    .innerJoin(accounts, eq(transactions.accountId, accounts.id))
    .where(
      and(
        accountId ? eq(transactions.accountId, accountId) : undefined,
        eq(accounts.userId, userId.id),
        gte(transactions.date, startDate),
        lte(transactions.date, endDate),
      ),
    )
    .groupBy(transactions.date)
    .orderBy(transactions.date);

  const days = fillMissionDays(activeDays, startDate, endDate);

  return NextResponse.json({
    data: {
      remainingAmount: currentPeriod.remaining,
      remainingChange: remainingChange,
      incomeAmount: currentPeriod.income,
      incomeChange,
      expensesAmount: currentPeriod.expenses,
      expensesChange,
      categories: finalCategories,
      days,
    },
  });
}
