import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    cookies().delete({
      name: "token",
    });

    return NextResponse.json(true);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
