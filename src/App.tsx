import React from "react";
import RoomAllocation from "components/RoomAllocation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-300">
      <div className="flex flex-col gap-4 w-96 border-4 border-dashed border-black p-4 bg-slate-100">
        <RoomAllocation guest={10} room={3} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
