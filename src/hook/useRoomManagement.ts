import { ButtonAction } from "components/Button";
import { useState } from "react";

export interface Room {
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

  const getPersonCounterProps = (
    roomIndex: number,
    type: 'adults' | 'children'
  ) => {
    const room = rooms[roomIndex];
    return {
      label: type === 'adults' ? '大人' : '小孩',
      count: room[type],
      onIncrement: () => handleChange(roomIndex, type, ButtonAction.Increment),
      onDecrement: () => handleChange(roomIndex, type, ButtonAction.Decrement),
      isDisabledIncrement: room.adults + room.children >= maxGuestsPerRoom || totalInRooms >= totalGuests,
      isDisabledDecrement: (type === 'adults' && room.adults <= 1) || (type === 'children' && room.children <= 0),
      onChangeValue: (newCount: number) => handleInputChange(roomIndex, type, newCount.toString())
    };
  };

  const handleChange = (
    roomIndex: number,
    type: "adults" | "children",
    action: ButtonAction
  ) => {
    // 現有的條件，防止遞增超過 totalGuests
    if (totalInRooms >= totalGuests && action === ButtonAction.Increment) {
      return;
    }

    setRooms((prevRooms) => {
      return prevRooms.map((room, index) => {
        if (index !== roomIndex) return room;

        // 只在大人的情況下防止遞減到小於 1
        if (
          type === "adults" &&
          action === ButtonAction.Decrement &&
          room[type] <= 1
        ) {
          return room;
        }

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
    getPersonCounterProps
  };
};
