import type { ImageProps } from "next/image";

export type Room = {
  images: ImageProps & { url: string }[];
  _id: string;
  name: string;
};
