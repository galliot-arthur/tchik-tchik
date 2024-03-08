"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import classNames from "classnames";
import Typography from "../atoms/Typography";
import Image from "next/image";
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  XCircle,
  ZoomIn,
} from "react-bootstrap-icons";
import { Dispatch, SetStateAction, useState } from "react";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { i18n } from "@/libs/i18n/i18n";
import { MovieType } from "@/libs/domain/type/movie";
import { getPicture } from "@/libs/domain/type/file";

const arrowCommonClasses = "absolute z-20 top-[50%] -translate-y-1/2";
const zoomClasses = "absolute z-20 bottom-4 left-[50%] -translate-x-1/2";
const buttonCommonClasses =
  "text-2xl text-white cursor-pointer hover:text-salmon";

const NextArrow = (props: any) => {
  return (
    <button
      aria-label="photo suivante"
      {...props}
      className={classNames(arrowCommonClasses, "right-4", buttonCommonClasses)}
    >
      <ArrowRightCircle />
    </button>
  );
};
const PrevArrow = (props: any) => {
  return (
    <button
      aria-label="photo précédente"
      {...props}
      className={classNames(arrowCommonClasses, "left-4", buttonCommonClasses)}
    >
      <ArrowLeftCircle />
    </button>
  );
};

type Props = {
  pictures: MovieType["pictures"] | undefined;
};

export default function PhotoSwiper({ pictures = [] }: Props) {
  const [modalUrl, setModalUrl] = useState<string | undefined>();

  return (
    <div className="w-full">
      <Typography variant="h2" className="mb-2 md:mb-4 w-full">
        {i18n.movies.photogram(pictures.length > 1)}
      </Typography>
      {pictures.length > 1 ? (
        <MultiPictures pictures={pictures} setModalUrl={setModalUrl} />
      ) : (
        <div
          className="relative aspect-[16/9] w-full h-full"
          key={pictures.at(0)?.id}
        >
          <Image
            alt="alt"
            src={getPicture(pictures.at(0)?.id)}
            fill
            className={classNames("object-cover")}
          />
          <button
            className={classNames(zoomClasses, buttonCommonClasses)}
            onClick={() => setModalUrl(getPicture(pictures.at(0)?.id))}
          >
            <ZoomIn />
          </button>
        </div>
      )}

      <Modal
        isOpen={!!modalUrl}
        onOpenChange={() => setModalUrl(undefined)}
        scrollBehavior="inside"
        size="full"
        backdrop="blur"
        classNames={{
          closeButton: "text-white hover:text-salmon text-2xl",
        }}
        closeButton={
          <button
            style={{
              zIndex: 51,
              background: "transparent",
            }}
          >
            <XCircle />
          </button>
        }
      >
        <ModalContent>
          <ModalBody className="relative aspect-[16/9] w-full h-full ">
            {modalUrl && (
              <Image
                alt="alt"
                src={modalUrl}
                fill
                className={classNames("object-cover")}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

const MultiPictures = ({
  pictures,
  setModalUrl,
}: {
  pictures: MovieType["pictures"];
  setModalUrl: Dispatch<SetStateAction<string | undefined>>;
}) => (
  <Slider
    infinite
    fade
    speed={800}
    autoplaySpeed={2000}
    slidesToShow={1}
    slidesToScroll={1}
    arrows
    nextArrow={<NextArrow />}
    prevArrow={<PrevArrow />}
    adaptiveHeight
    draggable
  >
    {pictures.map((item) => {
      const url = getPicture(item.id);
      return (
        <div className="relative aspect-[16/9] w-full h-full" key={item.id}>
          <Image
            alt="alt"
            src={url}
            fill
            className={classNames("object-cover")}
          />
          <button
            className={classNames(zoomClasses, buttonCommonClasses)}
            onClick={() => setModalUrl(url)}
          >
            <ZoomIn />
          </button>
        </div>
      );
    })}
  </Slider>
);
