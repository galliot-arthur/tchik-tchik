"use client";

import { ComponentProps } from "@/libs/domain/type/ui";
import { Facebook, Twitter } from "react-bootstrap-icons";
import { FacebookShareButton, TwitterShareButton } from "react-share";

export default function ShareButton({ className }: ComponentProps<{}>) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="p-2 px-4 text-tiny w-1/2">
        <div className="flex flex-col items-center justify-center">
          <small className="text-default-500">Partager sur vos réseaux</small>
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
