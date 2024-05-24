import { accounts as accountsSchema } from "@/app/db/schema";
import {
  NextApiError,
  getAuthRouteData,
  parseJwt,
} from "@/shared/utils/api.utils";
import { and, eq, inArray } from "drizzle-orm";
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

  const data = await db
    .delete(accountsSchema)
    .where(
      and(
        eq(accountsSchema.userId, userId.id),
        inArray(accountsSchema.id, ids),
      ),
    )
    .returning({
      id: accountsSchema.id,
      name: accountsSchema.name,
    });

  return NextResponse.json({ data });
}
