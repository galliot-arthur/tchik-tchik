import { badRequestError } from "@/libs/api/error";
import withAutentification from "@/libs/api/withAutentification";
import { isFile } from "@/libs/domain/type/file";
import { ressources } from "@/libs/domain/type/ressources";
import { NextRequest, NextResponse } from "next/server";
import { del, put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  return withAutentification(async () => {
    try {
      let formData = await request.formData();
      const fileData = formData.get("file");

      if (!isFile(fileData)) {
        return badRequestError(ressources.files);
      }

      const blob = await put(fileData.name, fileData, {
        access: "public",
      });

      return NextResponse.json(blob, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (_) {
      return badRequestError(ressources.files);
    }
  }, ressources.files);
}

export async function DELETE(request: NextRequest) {
  return withAutentification(async () => {
    try {
      const body = await request.json();

      if (!body.file) {
        return badRequestError(ressources.files);
      }

      console.log(body.file);

      await del(body.file);

      return NextResponse.json(
        { message: `${body.file} succefully deleted` },
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error(error);
      return badRequestError(ressources.files);
    }
  }, ressources.files);
}
