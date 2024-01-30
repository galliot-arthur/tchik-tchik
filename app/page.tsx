import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import Image from "next/image";

export default async function Home() {
  const isFollowed = false;
  return (
    <>
      <header className="fixed flex justify-between items-center px-2 min-h-[3rem] border-b-2 border-black w-screen bg-white/20 z-10 backdrop-blur">
        <p className="font-bold">Tchik-Tchik Production</p>
      </header>
      <main className="flex relative top-[3rem] relative z-0 min-h-[100vh_-_3rem]">
        <section className="sm:w-1/2 p-[1rem] sm:border-e-2 border-black">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit
            voluptate enim, iusto iure neque tenetur amet, nam voluptates,
            nesciunt corrupti suscipit repellendus. Eos, odio tenetur
            repellendus laboriosam consectetur mollitia quod assumenda porro
            facilis eveniet cumque possimus cum repellat enim aspernatur id
            perspiciatis. Est eligendi fugiat voluptatibus repellat minus enim
            hic quae officiis, eius sit sint rerum necessitatibus odit
            reiciendis dicta? Omnis nam doloribus eaque vel, id fugit suscipit
            animi ullam hic enim perferendis pariatur tempora tempore rerum.
            Sint accusantium corrupti deserunt mollitia a hic, veniam
            repudiandae laborum expedita officiis blanditiis explicabo, dolores
            voluptatem esse laboriosam iusto porro aliquid voluptas? Sapiente
            harum saepe quaerat aliquam perferendis deserunt neque placeat.
            Voluptatum sed tenetur libero placeat tempore magni! Voluptas
            laudantium quam atque consequatur aliquid suscipit iure voluptates,
            officiis ullam impedit quaerat doloremque veniam ea similique
            aliquam aut natus, nesciunt dolorem dignissimos recusandae nam sint
            voluptatem totam. Quibusdam, pariatur! Debitis voluptates optio
            possimus modi a dolorum voluptatum unde, sint aspernatur. Suscipit
            iusto aut blanditiis accusamus fugiat quaerat, at quam consequatur
            tempora cupiditate aliquid, officiis rem in et quia illo! Fuga
            maxime doloribus accusantium voluptate, consequuntur mollitia illum
            debitis sapiente sit ipsam delectus doloremque eum deleniti eaque
            quibusdam suscipit ratione dolorem sed repellat officiis, temporibus
            aliquid quisquam eos nemo. Eveniet molestias explicabo distinctio
            sit quae aliquid doloremque quos, ratione corrupti labore voluptatum
            itaque rem dicta dolores provident culpa adipisci suscipit eos
            assumenda beatae hic perspiciatis quod? Aliquid ad tempora aperiam
            veniam non molestias consectetur ipsam eligendi fugiat alias, aut
            sunt facere et quasi, assumenda amet optio saepe, enim blanditiis
            maiores corporis. Rem unde sint, earum dolores ut quas non sapiente
            ea inventore animi deserunt veniam, expedita incidunt eligendi sit
            labore? Voluptate modi omnis qui recusandae, ullam eveniet soluta!
          </p>
        </section>
        <section className="ms-4 sm:w-1/4 py-4">
          {[{ id: "1", name: "A", description: "A" }]?.map((item) => (
            <Card
              key={item.id}
              isFooterBlurred
              isPressable
              isHoverable
              fullWidth
              shadow="none"
              className="rounded-none mb-4"
            >
              <CardBody className="overflow-hidden p-0">
                <div className="relative aspect-[1080/1349]">
                  <Image
                    alt="text"
                    fill
                    className="object-cover"
                    src="/quittez-chouchou.jpg"
                  />
                </div>
              </CardBody>

              <CardHeader className="justify-between items-end py-2 min-w-64 border-b-2 border-black">
                <div className="pb-0 flex-col flex items-start">
                  <h4 className="font-bold text-large">{item.name}</h4>
                  <p className="text-tiny uppercase font-bold">{item.name}</p>
                  <small className="text-default-500">
                    {new Date().toLocaleDateString()}
                  </small>
                </div>
                <Button color="default" radius="full" size="sm" variant="light">
                  Voir plus
                </Button>
              </CardHeader>
              <CardFooter className="opacity-0 justify-between overflow-hidden py-1 px-2 absolute bottom-1 z-10 bg-white/50">
                <p className="">{item.description}</p>
              </CardFooter>
            </Card>
          ))}
        </section>
      </main>
    </>
  );
}
