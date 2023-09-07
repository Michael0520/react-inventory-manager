import { ButtonAction } from "components/Button";
import { PersonCounter } from "components/PersonCounter";
import { useRoomManagement } from "hook/useRoomManagement";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Room {
  adults: number;
  children: number;
}

const createPersonCounterProps = (
  room: Room,
  index: number,
  type: "adults" | "children",
  totalInRooms: number,
  maxGuestsPerRoom: number,
  totalGuests: number,
  handleChange: Function,
  handleInputChange: Function
) => ({
  label: type === "adults" ? "大人" : "小孩",
  subLabel: type === "adults" ? "年齡 20+" : undefined,
  count: room[type],
  isDisabledIncrement:
    room.adults + room.children >= maxGuestsPerRoom ||
    totalInRooms >= totalGuests,
  isDisabledDecrement: room[type] <= (type === "adults" ? 1 : 0),
  onIncrement: () => handleChange(index, type, ButtonAction.Increment),
  onDecrement: () => handleChange(index, type, ButtonAction.Decrement),
  onChangeValue: (newCount: number) =>
    handleInputChange(index, type, newCount.toString()),
});

const App: React.FC = () => {
  const totalGuests = 10;
  const maxGuestsPerRoom = 4;

  const initialRooms = [
    { adults: 1, children: 0 },
    { adults: 1, children: 0 },
    { adults: 1, children: 0 },
  ];

  const { rooms, totalInRooms, unallocated, handleChange, handleInputChange } =
    useRoomManagement(initialRooms, totalGuests, maxGuestsPerRoom);

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

  return (
    <div className="flex items-center justify-center h-screen bg-slate-300">
      <div className="flex flex-col gap-4 w-96 border-4 border-dashed border-black p-4 bg-slate-100">
        {/* Title */}
        <h2 className="text-2xl font-bold">
          住客人數: {totalGuests}人 / {rooms.length}房
        </h2>
        {/* Block */}
        <div className="p-4 text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 text-white rounded-xl shadow-lg">
          尚未分配人數: {unallocated}人
        </div>

        {/* Data Group */}
        {rooms.map((room, index) => {
          const adultProps = createPersonCounterProps(
            room,
            index,
            "adults",
            totalInRooms,
            maxGuestsPerRoom,
            totalGuests,
            handleChange,
            handleInputChange
          );
          const childrenProps = createPersonCounterProps(
            room,
            index,
            "children",
            totalInRooms,
            maxGuestsPerRoom,
            totalGuests,
            handleChange,
            handleInputChange
          );
          return (
            <div key={index} className="flex flex-col gap-4">
              <div className="h-[2px] bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 rounded-full my-4 shadow-lg"></div>

              <PersonCounter {...adultProps} />
              <PersonCounter {...childrenProps} />
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
