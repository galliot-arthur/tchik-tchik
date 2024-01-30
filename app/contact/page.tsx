import { i18n } from "@/libs/i18n/i18n";
import TchikLink from "@/libs/ui/atoms/TchikLink";
import Typography from "@/libs/ui/atoms/Typography";
import LeftSection from "@/libs/ui/molecule/LeftSection";
import MiddleSection from "@/libs/ui/molecule/MiddleSection";
import RightSection from "@/libs/ui/molecule/RightSection";

export default async function Contact() {
  return (
    <main className="flex relative top-[3rem] flex-col sm:flex-row">
      <LeftSection>
        <Typography variant="h1">{i18n.menu.contact}</Typography>
        {i18n.contact.address.map((item) => (
          <div key={item.title}>
            <Typography variant="p" className="text-gray-500">
              {item.title}
            </Typography>
            {item.content.map((c) => (
              <Typography key={c}>{c}</Typography>
            ))}
          </div>
        ))}
      </LeftSection>
      <MiddleSection></MiddleSection>
      <RightSection>
        <TchikLink href="test" target="_blank">
          Instagram
        </TchikLink>
        <TchikLink href="test" target="_blank">
          FaceBook
        </TchikLink>
      </RightSection>
    </main>
  );
}
