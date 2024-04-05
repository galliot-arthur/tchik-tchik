import { i18n } from "@/libs/i18n/i18n";
import Card from "@/libs/ui/atoms/Card";
import Portrait from "@/libs/ui/atoms/Portrait";
import TchikLink from "@/libs/ui/atoms/TchikLink";
import Typography from "@/libs/ui/atoms/Typography";
import LeftSection from "@/libs/ui/molecule/LeftSection";
import MainContainer from "@/libs/ui/molecule/MainContainer";
import MiddleSection from "@/libs/ui/molecule/MiddleSection";
import RightSection from "@/libs/ui/molecule/RightSection";
import { Tooltip } from "@nextui-org/react";
import classNames from "classnames";
import { Metadata } from "next";
import Image from "next/image";
import { Instagram } from "react-bootstrap-icons";

export const metadata: Metadata = {
  title: i18n.menu.contact.label,
  description: i18n.contact.portrait.title,
  robots: {
    index: true,
  },
  openGraph: {
    title: i18n.menu.contact.label,
    description: i18n.contact.portrait.title,
  },
};

export default async function Contact() {
  return (
    <MainContainer>
      <LeftSection>
        <Typography variant="h1" className="mb-3">
          {i18n.menu.contact.label}
        </Typography>
        <Card>
          {i18n.contact.address.map((item) => (
            <div key={item.title} className="mb-4 flex items-center gap-4">
              <item.icon
                size="1.25rem"
                className="hidden md:block text-gray-500"
              />
              <div>
                <Typography variant="tiny-bold" className="mt-2">
                  {item.title}
                </Typography>
                {item.content.map((c) => (
                  <Typography key={c} className="text-sm">
                    {c}
                  </Typography>
                ))}
              </div>
            </div>
          ))}
        </Card>
        <div className="mt-8 hidden md:block">
          <Typography variant="tiny-bold" color="black" className="my-2">
            {i18n.contact.logo.title}
          </Typography>
          <div
            className={classNames(
              "relative w-full md:w-1/6 aspect-[18/9]",
              "hover:opacity-50",
              "transition ease-in-out duration-300"
            )}
          >
            <Tooltip
              content={i18n.contact.logo.tooltip}
              placement="top"
              className="bg-white tchik-shadow"
            >
              <a href={i18n.contact.logo.url} target="_blank">
                <Image
                  src={i18n.contact.logo.url}
                  fill
                  alt="tchik tchik productions logo"
                />
              </a>
            </Tooltip>
          </div>
        </div>
      </LeftSection>
      <MiddleSection className="mt-4 md:mt-0">
        <Portrait
          name="Adèle Galliot"
          imgsrc="/adele.jpg"
          subTitle="Productrice"
        />
        <Portrait
          name="Florian Séjourné"
          imgsrc="/florian.jpg"
          subTitle="Producteur"
        />
      </MiddleSection>
      <RightSection className="!text-start md:!text-end">
        <Card>
          <Typography variant="h4" className="!text-sm md:!text-base">
            {i18n.contact.links.title}
          </Typography>
          <li>
            <TchikLink
              href={i18n.contact.links.instagram.url}
              variant="red"
              target="_blank"
              className="inline-flex flex-row justify-end text-salmon"
            >
              <Instagram className="mr-1.5 mt-1" />
              {i18n.contact.links.instagram.label}
            </TchikLink>
          </li>
        </Card>
        <Typography className="mb-2 mt-6 md:mt-2 text-sm">
          {i18n.contact.portrait.title}
        </Typography>
      </RightSection>
    </MainContainer>
  );
}
