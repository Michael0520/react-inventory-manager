import { ButtonAction } from "components/Button";
import { PersonCounter } from "components/PersonCounter";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Room {
  adults: number;
  children: number;
}

const updateRoom = (
  room: Room,
  type: "adults" | "children",
  newValue: number,
  maxGuestsPerRoom: number,
  totalGuests: number,
  totalInRooms: number
): Room => {
  const newRoom = { ...room };
  const otherType = type === "adults" ? "children" : "adults";
  const newTotal = newValue + newRoom[otherType];

  if (newTotal > maxGuestsPerRoom) {
    newValue = maxGuestsPerRoom - newRoom[otherType];
  }

  const addedGuests = newValue - newRoom[type];
  if (totalInRooms + addedGuests > totalGuests) {
    newValue = newRoom[type] + (totalGuests - totalInRooms);
  }

  newRoom[type] = newValue;

  return newRoom;
};
const updateRoomForAction = (
  room: Room,
  type: "adults" | "children",
  action: ButtonAction,
  maxGuestsPerRoom: number,
  totalGuests: number,
  totalInRooms: number
): Room => {
  const newRoom = { ...room };
  const totalOccupancy = newRoom.adults + newRoom.children;

  if (action === ButtonAction.Increment && totalOccupancy < maxGuestsPerRoom) {
    newRoom[type]++;
  }
  if (action === ButtonAction.Decrement && newRoom[type] > 0) {
    newRoom[type]--;
  }
  return newRoom;
};

const App: React.FC = () => {
  const totalGuests = 10;
  const maxGuestsPerRoom = 4;

  const [rooms, setRooms] = useState<Room[]>([
    { adults: 1, children: 0 },
    { adults: 1, children: 0 },
    { adults: 1, children: 0 },
  ]);

  const totalInRooms = rooms.reduce(
    (acc, room) => acc + room.adults + room.children,
    0
  );

  const unallocated = totalGuests - totalInRooms;

  const handleChange = (
    roomIndex: number,
    type: "adults" | "children",
    action: ButtonAction
  ) => {
    if (totalInRooms >= totalGuests && action === ButtonAction.Increment) {
      return;
    }

    setRooms((prevRooms) => {
      return prevRooms.map((room, index) => {
        if (index !== roomIndex) return room;

        return updateRoomForAction(
          room,
          type,
          action,
          maxGuestsPerRoom,
          totalGuests,
          totalInRooms
        );
      });
    });
  };

  const handleInputChange = (
    roomIndex: number,
    type: "adults" | "children",
    newValue: number | string
  ) => {
    let numericValue =
      typeof newValue === "string" ? parseInt(newValue, 10) : newValue;

    if (isNaN(numericValue)) {
      return;
    }

    if (type === "adults" && numericValue < 1) {
      numericValue = 1;
    }

    setRooms((prevRooms) => {
      return prevRooms.map((room, index) => {
        if (index !== roomIndex) return room;

        return updateRoom(
          room,
          type,
          numericValue,
          maxGuestsPerRoom,
          totalGuests,
          totalInRooms
        );
      });
    });
  };

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
          const isDisabledIncrementCommon =
            room.adults + room.children >= maxGuestsPerRoom ||
            totalInRooms >= totalGuests;

          const personCounterPropsCommon = {
            onIncrement: (type: "adults" | "children") =>
              handleChange(index, type, ButtonAction.Increment),
            onDecrement: (type: "adults" | "children") =>
              handleChange(index, type, ButtonAction.Decrement),
            isDisabledIncrement: isDisabledIncrementCommon,
            onChangeValue: (newCount: number, type: "adults" | "children") =>
              handleInputChange(index, type, newCount.toString()),
          };

          return (
            <div key={index} className="flex flex-col gap-4">
              <PersonCounter
                {...personCounterPropsCommon}
                label="大人"
                subLabel="年齡 20+"
                count={room.adults}
                isDisabledDecrement={room.adults <= 1}
                onIncrement={() =>
                  personCounterPropsCommon.onIncrement("adults")
                }
                onDecrement={() =>
                  personCounterPropsCommon.onDecrement("adults")
                }
                onChangeValue={(newCount) =>
                  personCounterPropsCommon.onChangeValue(newCount, "adults")
                }
              />

              <PersonCounter
                {...personCounterPropsCommon}
                label="小孩"
                count={room.children}
                isDisabledDecrement={room.children <= 0}
                onIncrement={() =>
                  personCounterPropsCommon.onIncrement("children")
                }
                onDecrement={() =>
                  personCounterPropsCommon.onDecrement("children")
                }
                onChangeValue={(newCount) =>
                  personCounterPropsCommon.onChangeValue(newCount, "children")
                }
              />
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
