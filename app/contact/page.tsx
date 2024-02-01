import { i18n } from "@/libs/i18n/i18n";
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
        <Typography variant="h1">{i18n.menu.contact}</Typography>
        <ContentContainer>
          {i18n.contact.address.map((item) => (
            <div key={item.title} className="mb-4">
              <Typography variant="tiny-bold" className="mb-2">
                {item.title}
              </Typography>
              {item.content.map((c) => (
                <Typography key={c}>{c}</Typography>
              ))}
            </div>
          ))}
        </ContentContainer>
      </LeftSection>
      <MiddleSection></MiddleSection>
      <RightSection>
        <li>
          <Typography variant="h4">Liens</Typography>
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
