import { ComponentProps } from "@/libs/domain/type/ui";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Link from "next/link";
import TchikCardHeader from "../molecule/TchikCardHeader";
import Image from "next/image";

export default function TchikCard({
  title,
  subtitle,
  subtitle2,
  caption,
  caption2,
  hoverText,
  img,
  href,
}: ComponentProps<{
  title: string;
  subtitle: string;
  subtitle2?: string;
  caption?: string;
  caption2?: string;
  hoverText?: string;
  img?: { src: string; alt: string };
  href?: string;
}>) {
  const maybeLink = {
    isPressable: true,
    disableRipple: true,
    as: Link,
    href: href,
  };
  return (
    <Card
      isFooterBlurred
      fullWidth
      shadow="none"
      className="rounded-none bg-transparent"
      {...(href ? maybeLink : {})}
    >
      <CardBody className="overflow-hidden p-0">
        {img && (
          <div className="relative h-full aspect-[1080/1349]">
            <Image fill alt={img.alt} className="object-cover" src={img.src} />
          </div>
        )}
      </CardBody>
      <TchikCardHeader
        title={title}
        subtitle={subtitle}
        subtitle2={subtitle2}
        caption={caption}
        caption2={caption2}
      />
      {hoverText && (
        <CardFooter className="opacity-0 justify-between overflow-hidden py-1 px-2 absolute bottom-1 z-10 bg-white/50">
          <p className="">{hoverText}</p>
        </CardFooter>
      )}
    </Card>
  );
}
