import Link from "next/link";

const RoomItem = ({ room }) => {
  return (
    <div className="aspect-video bg-primary-100 text-primary-700 rounded-md p-2">
      <Link href={`/room/${room.id}`}>
        <a>
          <img src={room.thumb} className="rounded-md" />
        </a>
      </Link>
      {room.nick}
    </div>
  );
};

export default RoomItem;
