import { ComponentProps } from "@/libs/domain/type/ui";
import { Card } from "@nextui-org/react";
import Link from "next/link";
import TchikCardHeader from "../molecule/TchikCardHeader";
import Image from "next/image";

export default function TchikCard({
  title,
  subtitle,
  subtitle2,
  caption,
  caption2,

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
      shadow="none"
      className="rounded-none bg-transparent min-h-0 min-w-0"
      {...(href ? maybeLink : {})}
    >
      {img && (
        <div className="relative h-full aspect-[1080/1349]">
          <Image fill alt={img.alt} className="object-cover" src={img.src} />
        </div>
      )}
      <TchikCardHeader
        title={title}
        subtitle={subtitle}
        subtitle2={subtitle2}
        caption={caption}
        caption2={caption2}
      />
    </Card>
  );
}
