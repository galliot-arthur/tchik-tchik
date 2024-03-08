import {
  badRequestError,
  forbiddenError,
  //notFoundError,
} from "@/libs/api/error";
import { isFile } from "@/libs/domain/type/file";

import { ressources } from "@/libs/domain/type/ressources";

import { getSession, Session } from "@auth0/nextjs-auth0";
import { writeFileSync } from "fs";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getSession();

  if (!(session instanceof Session) || !("user" in session)) {
    return forbiddenError(ressources.files);
  }

  try {
    let formData = await request.formData();
    const fileData = formData.get("file");

    if (!isFile(fileData)) {
      return badRequestError(ressources.files);
    }

    const fileName = crypto.randomUUID() + fileData.name;

    const buffer = Buffer.from(await fileData.arrayBuffer());

    writeFileSync(`public/pictures/${fileName}`, buffer);

    return NextResponse.json(
      { fileName },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return badRequestError(ressources.files);
  }
}
