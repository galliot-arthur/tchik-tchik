import { i18n } from "@/libs/i18n/i18n";
import Card from "@/libs/ui/atoms/Card";
import Portrait from "@/libs/ui/atoms/Portrait";
import TchikLink from "@/libs/ui/atoms/TchikLink";
import Typography from "@/libs/ui/atoms/Typography";
import LeftSection from "@/libs/ui/molecule/LeftSection";
import MainContainer from "@/libs/ui/molecule/MainContainer";
import MiddleSection from "@/libs/ui/molecule/MiddleSection";
import RightSection from "@/libs/ui/molecule/RightSection";
import { Instagram } from "react-bootstrap-icons";

export default async function Contact() {
  return (
    <MainContainer>
      <LeftSection>
        <Typography variant="h1" className="border-b-2 border-bl pb-2 mb-2">
          {i18n.menu.contact.label}
        </Typography>
        <Card>
          {i18n.contact.address.map((item) => (
            <div key={item.title} className="mb-4 flex items-center gap-4">
              <item.icon size="1.5rem" className="hidden md:block" />
              <div>
                <Typography variant="tiny-bold" className="my-2">
                  {item.title}
                </Typography>
                {item.content.map((c) => (
                  <Typography key={c}>{c}</Typography>
                ))}
              </div>
            </div>
          ))}
        </Card>
      </LeftSection>
      <MiddleSection>
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
      <RightSection>
        <Card>
          <Typography variant="h4">{i18n.contact.links.title}</Typography>
          <li>
            <TchikLink
              href={i18n.contact.links.instagram.url}
              variant="red"
              target="_blank"
              className="inline-flex flex-row justify-end text-salmon"
            >
              <Instagram size="1rem" className="mr-1.5 mt-1" />
              {i18n.contact.links.instagram.label}
            </TchikLink>
          </li>
        </Card>
        <Typography className="my-2 text-sm">
          {i18n.contact.portrait.title}
        </Typography>
      </RightSection>
    </MainContainer>
  );
}
