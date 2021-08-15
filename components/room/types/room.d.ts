import type { ImageProps } from "next/image";

export type Room = {
  images: ImageProps & { url: string }[];
  _id: string;
  pricePerNight: string;
  ratings: number;
  numOfReviews: string;
  name: string;
};
