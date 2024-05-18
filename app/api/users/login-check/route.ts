import db from "@/app/db/drizzle";
import { isValidAccessToken, parseJwt } from "@/shared/utils/api.utils";
import { NextResponse } from "next/server";
import { user as userSchema } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  const validatedTokenResult = await isValidAccessToken(token);

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

  const email = parseJwt(token as string).email;

  const [user] = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, email));

  return NextResponse.json({
    status: 200,
    message: "token is valid",
    user,
  });
}
