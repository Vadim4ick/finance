import { categories as categoriesSchema } from "@/app/db/schema";
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

  const categories = await db
    .select({
      id: categoriesSchema.id,
      name: categoriesSchema.name,
    })
    .from(categoriesSchema)
    .where(eq(categoriesSchema.userId, userId.id));

  return NextResponse.json({ categories });
}
