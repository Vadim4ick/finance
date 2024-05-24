import { accounts as accountsSchema } from "@/app/db/schema";
import {
  NextApiError,
  getAuthRouteData,
  parseJwt,
} from "@/shared/utils/api.utils";
import { createId } from "@paralleldrive/cuid2";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { reqBody, db, token, validatedTokenResult } = await getAuthRouteData<{
    body: { name: string };
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

  const [data] = await db
    .insert(accountsSchema)
    .values({
      id: createId(),
      name: reqBody.body.name,
      userId: userId.id,
    })
    .returning();

  return NextResponse.json({ data });
}
