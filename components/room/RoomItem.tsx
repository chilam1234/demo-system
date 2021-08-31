import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Room } from "./types/room";

const RoomItem = ({ room }: { room: Room }) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-2">
        <Image
          className="card-img-top mx-auto"
          src={room.images[0].url}
          width={300}
          height={200}
          alt={"item_image"}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link href={`/room/${room._id}`}>
              <a>{room.name}</a>
            </Link>
          </h5>

          <button className="btn btn-block view-btn">
            <Link href={`/room/${room._id}`}>View Details</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
