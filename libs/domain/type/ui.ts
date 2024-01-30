import { ReactNode } from "react";

export type ComponentProps<T extends {}> = {
  children?: ReactNode;
  className?: string;
} & T;
