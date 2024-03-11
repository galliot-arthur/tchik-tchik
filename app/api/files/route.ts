import { badRequestError } from "@/libs/api/error";
import withAutentification from "@/libs/api/withAutentification";
import { isFile } from "@/libs/domain/type/file";
import { ressources } from "@/libs/domain/type/ressources";
import { writeFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  return withAutentification(async () => {
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
  }, ressources.files);
}