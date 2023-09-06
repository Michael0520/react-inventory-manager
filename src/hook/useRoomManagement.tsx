import { ButtonAction } from "components/Button";
import { useState } from "react";

interface Room {
  adults: number;
  children: number;
}

export const useRoomManagement = (
  initialRooms: Room[],
  totalGuests: number,
  maxGuestsPerRoom: number
) => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);

  const totalInRooms = rooms.reduce(
    (acc, room) => acc + room.adults + room.children,
    0
  );

  const unallocated = totalGuests - totalInRooms;

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

    if (
      action === ButtonAction.Increment &&
      totalOccupancy < maxGuestsPerRoom
    ) {
      newRoom[type]++;
    }
    if (action === ButtonAction.Decrement && newRoom[type] > 0) {
      newRoom[type]--;
    }
    return newRoom;
  };

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

  return {
    rooms,
    totalInRooms,
    unallocated,
    handleChange,
    handleInputChange,
  };
};
