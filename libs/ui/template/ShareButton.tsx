"use client";

import { ComponentProps } from "@/libs/domain/type/ui";
import { Facebook, Twitter } from "react-bootstrap-icons";
import { FacebookShareButton, TwitterShareButton } from "react-share";

export default function ShareButton({}: ComponentProps<{}>) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="p-2 px-4 text-tiny sm:w-1/2">
        <div className="flex flex-col items-center justify-center">
          <small className="text-default-500 mb-1">
            Partager sur vos réseaux
          </small>
          <FacebookShareButton
            url={"url"}
            className="flex items-center hover:text-gray-sand"
          >
            <Facebook className="h-4 w-4" />
            <span className="ml-2">FaceBook</span>
          </FacebookShareButton>
          <TwitterShareButton
            url={"url"}
            className="flex items-center hover:text-gray-sand"
          >
            <Twitter className="h-4 w-4" />
            <span className="ml-2">Twitter</span>
          </TwitterShareButton>
        </div>
      </div>
    </div>
  );
}
