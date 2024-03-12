import { ComponentProps } from "@/libs/domain/type/ui";
import Image from "next/image";
import Typography from "./Typography";

export default function Portrait({
  imgsrc,
  name,
  subTitle,
}: ComponentProps<{ name: string; subTitle?: string; imgsrc: string }>) {
  return (
    <div className="flex flex-row-reverse md:flex-row w-full mb-4 md:mb-0">
      <div className="relative overflow-hidden rounded-full aspect-square w-1/3 md:w-1/2 max-w-[120px]">
        <Image
          src={imgsrc}
          alt={`${name} - ${subTitle ?? ""}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="text-end md:ml-4 mr-4 md:mr-0 w-2/3 md:w-1/2">
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
