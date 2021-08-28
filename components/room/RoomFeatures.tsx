import React from "react";

const RoomFeatures = ({ room }) => {
  return (
    <div className="features mt-5">
      <h3 className="mb-4">Information:</h3>
      <div className="room-feature">
        <i className="fa fa-cog fa-fw fa-users" aria-hidden="true"></i>
        <p>{room.guestCapacity} guest capacity</p>
      </div>
    </div>
  );
};

export default RoomFeatures;
