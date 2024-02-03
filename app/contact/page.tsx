import { i18n } from "@/libs/i18n/i18n";
import Portrait from "@/libs/ui/atoms/Portrait";
import TchikLink from "@/libs/ui/atoms/TchikLink";
import Typography from "@/libs/ui/atoms/Typography";
import ContentContainer from "@/libs/ui/molecule/ContentContainer";
import LeftSection from "@/libs/ui/molecule/LeftSection";
import MainContainer from "@/libs/ui/molecule/MainContainer";
import MiddleSection from "@/libs/ui/molecule/MiddleSection";
import RightSection from "@/libs/ui/molecule/RightSection";

export default async function Contact() {
  return (
    <MainContainer>
      <LeftSection>
        <Typography variant="h1">{i18n.menu.contact.label}</Typography>
        <ContentContainer>
          {i18n.contact.address.map((item) => (
            <div key={item.title} className="mb-4">
              <item.icon size="1.5rem" />
              <Typography variant="tiny-bold" className="my-2">
                {item.title}
              </Typography>
              {item.content.map((c) => (
                <Typography key={c} variant="tiny-bold" color="black">
                  {c}
                </Typography>
              ))}
            </div>
          ))}
        </ContentContainer>
      </LeftSection>
      <MiddleSection>
        <Typography variant="h2">{i18n.contact.portrait.title}</Typography>
        <Portrait
          name="Adèle Galliot"
          imgsrc="/adele.jpg"
          subTitle="Jeune cadre dynamique"
        />
        <Portrait
          name="Florian Séjourné"
          imgsrc="/florian.jpg"
          subTitle="Jeune cadre dynamique"
        />
      </MiddleSection>
      <RightSection>
        <li>
          <Typography variant="h4">{i18n.contact.links.title}</Typography>
        </li>
        <li>
          <TchikLink
            href={i18n.contact.links.instagram.url}
            variant="red"
            target="_blank"
          >
            {i18n.contact.links.instagram.label}
          </TchikLink>
        </li>
      </RightSection>
    </MainContainer>
  );
}
