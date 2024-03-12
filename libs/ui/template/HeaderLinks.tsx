"use client";
import { usePathname } from "next/navigation";
import TchikLink from "../atoms/TchikLink";
import { i18n } from "@/libs/i18n/i18n";
import classNames from "classnames";

export default function HeaderLinks() {
  const pathName = usePathname();
  if (!pathName) {
    return null;
  }

  return (
    <ul className="flex flex-col sm:flex-row items-end">
      <li>
        <TchikLink
          href={i18n.menu.homepage.url}
          className={classNames(getStatus(i18n.menu.homepage.url, pathName))}
        >
          {i18n.menu.homepage.label}
        </TchikLink>
      </li>
      <li>
        <TchikLink
          href={i18n.menu.catalog.url}
          className={classNames(
            getStatus(i18n.menu.catalog.url, pathName),
            "ml-3"
          )}
        >
          {i18n.menu.catalog.label}
        </TchikLink>
      </li>
      <li>
        <TchikLink
          href={i18n.menu.contact.url}
          className={classNames(
            getStatus(i18n.menu.contact.url, pathName),
            "ml-3"
          )}
        >
          {i18n.menu.contact.label}
        </TchikLink>
      </li>
    </ul>
  );
}

const getStatus = (url: string, path: string): string => {
  if (url === "/") {
    return path === "/" ? "active-underline" : "hover-underline";
  }

  if (path.match("/catalogue/")) {
    return "hover-underline";
  }

  return path.includes(url.replace("/", "")) ?? false
    ? "active-underline"
    : "hover-underline";
};
