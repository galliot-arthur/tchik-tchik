import { ComponentProps } from "@/libs/domain/type/ui";
import Image from "next/image";
import Typography from "./Typography";

export default function Portrait({
  imgsrc,
  name,
  subTitle,
}: ComponentProps<{ name: string; subTitle?: string; imgsrc: string }>) {
  return (
    <div className="flex flex-row-reverse w-full mb-4 md:mb-0">
      <div className="relative rounded-sm tchik-shadow overflow-hidden aspect-[3/4] w-1/2 ">
        <Image
          src={imgsrc}
          alt={`${name} - ${subTitle ?? ""}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="text-end mr-2 w-1/2 my-auto">
        <Typography className="font-bold text-large leading-none">
          {name}
        </Typography>
        {subTitle && (
          <Typography className="text-xs" color="gray-500">
            {subTitle}
          </Typography>
        )}
      </div>
    </div>
  );
}
