"use client";
import { ComponentProps } from "@/libs/domain/type/ui";
import { Tab, Tabs } from "@nextui-org/react";

export default function TabDisplayer({
  items,
}: ComponentProps<{
  items: {
    title: string;
    children: JSX.Element;
  }[];
}>) {
  return (
    <Tabs size="lg" variant="underlined">
      {items.map((item) => (
        <Tab key={item.title} title={item.title}>
          {item.children}
        </Tab>
      ))}
    </Tabs>
  );
}
