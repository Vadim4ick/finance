import type { BodyTransaction } from "@/entities/TableColumns";
import { transactions as transactionsSchema } from "@/app/db/schema";
import {
  NextApiError,
  getAuthRouteData,
  parseJwt,
} from "@/shared/utils/api.utils";
import { createId } from "@paralleldrive/cuid2";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { reqBody, db, token, validatedTokenResult } = await getAuthRouteData<{
    body: BodyTransaction[];
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

  const userId = (await parseJwt(token as string)) as { id: string };

  //   const [data] = await db
  //     .insert(transactionsSchema)
  //     .values({
  //       id: createId(),
  //       ...reqBody.body,
  //       date: new Date(reqBody.body.date),
  //       userId: userId.id,
  //     })
  //     .returning();

  //   const newArray = reqBody.body.map((value) => ({
  //     id: createId(),
  //     ...value,
  //     accountId: "f5l1ml98f0n1fsnh496cg16q",
  //     userId: userId.id,
  //   }));

  const data = await db
    .insert(transactionsSchema)
    .values(
      reqBody.body.map((value) => ({
        id: createId(),
        ...value,
        date: new Date(value.date),
        accountId: "f5l1ml98f0n1fsnh496cg16q",
        userId: userId.id,
      })),
    )
    .returning();

  //   console.log("data", newArray);

  return NextResponse.json({ data: data });
}
