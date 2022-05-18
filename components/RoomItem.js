import { useState } from "react";
import Link from "next/link";

const RoomItem = ({ room }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/room/${room.id}`}>
        <a>
          {isHovered ? (
            <HoverContent room={room} />
          ) : (
            <NotHoverContent room={room} />
          )}
        </a>
      </Link>
    </div>
  );
};

const NotHoverContent = ({ room }) => {
  return (
    <>
      <span
        className="absolute right-1 top-1 text-xs text-[#5efcb8] drop-shadow-md"
        style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, .8)" }}
      >
        En directo
      </span>
      <img src={room.thumb} className="aspect-[4/3] w-full" />
      <div className="absolute bottom-0 w-full text-center text-xs bg-black/50 p-1 text-white">
        {room.nick}
      </div>
    </>
  );
};

const HoverContent = ({ room }) => {
  return (
    <>
      <span
        className="absolute right-1 top-1 text-xs text-[#5efcb8] drop-shadow-md"
        style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, .8)" }}
      >
        HOVER
      </span>
      <img src={room.thumb} className="aspect-[4/3] w-full opacity-50" />
      <div className="absolute bottom-0 w-full text-center text-xs bg-black/50 p-1 text-white">
        {room.nick}
      </div>
    </>
  );
};

export default RoomItem;
