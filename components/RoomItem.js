const RoomItem = ({ room }) => {
  return (
    <div className="aspect-video bg-primary-100 text-primary-700 rounded-md p-2">
      <img src={room.thumb} className="rounded-md" />
      {room.nick}
    </div>
  );
};

export default RoomItem;
