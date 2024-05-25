import { categories as categoriesSchema } from "@/app/db/schema";
import {
  NextApiError,
  getAuthRouteData,
  parseJwt,
} from "@/shared/utils/api.utils";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, params: { params: { id: string } }) {
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

  const id = params.params.id;

  if (!id) {
    return NextApiError({
      error: "Введите id!",
      status: 400,
    });
  }

  const userId = (await parseJwt(token as string)) as { id: string };

  const [data] = await db
    .update(categoriesSchema)
    .set({
      name: reqBody.body.name,
    })
    .where(
      and(eq(categoriesSchema.userId, userId.id), eq(categoriesSchema.id, id)),
    )
    .returning();

  if (!data) {
    return NextApiError({
      error: "Не удалось обновить!",
      status: 400,
    });
  }

  return NextResponse.json({ data });
}
