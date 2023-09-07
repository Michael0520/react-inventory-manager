// RoomAllocation.tsx
import React, { useEffect } from "react";
import { useRoomManagement, Room } from "../hook/useRoomManagement"; // 匯入自定義的 hook
import { ButtonAction } from "components/Button";
import { PersonCounter } from "./PersonCounter";
import { toast } from "react-toastify";

type RoomAllocationProps = {
  guest: number;
  room: number;
  onChange: (rooms: { adults: number; children: number }[]) => void;
};

const RoomAllocation: React.FC<RoomAllocationProps> = ({
  guest,
  room,
  onChange,
}) => {
  const maxGuestsPerRoom = 4;

  const initialRooms: Room[] = Array.from({ length: room }, () => ({
    adults: 1,
    children: 0,
  }));

  const {
    rooms,
    totalInRooms,
    unallocated,
    handleChange,
    handleInputChange,
    getPersonCounterProps,
  } = useRoomManagement(initialRooms, guest, maxGuestsPerRoom);

  useEffect(() => {
    if (totalInRooms === 10) {
      toast("所有人都已經分配到房間了！", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [totalInRooms]);

  useEffect(() => {
    onChange(rooms);
  }, [rooms, onChange]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">
        住客人數: {guest}人 / {room}房
      </h2>
      <div className="p-4 text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 text-white rounded-xl shadow-lg">
        尚未分配人數: {unallocated}人
      </div>
      {rooms.map((room, index) => (
        <div key={index} className="flex flex-col gap-4">
          <PersonCounter {...getPersonCounterProps(index, "adults")} />
          <PersonCounter {...getPersonCounterProps(index, "children")} />
        </div>
      ))}
    </div>
  );
};

export default RoomAllocation;
