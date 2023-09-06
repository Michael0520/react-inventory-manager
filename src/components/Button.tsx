import { useTimer } from "../hook/useTimer";
import { useMouseEvent } from "../hook/useMouseEvent";

export enum ButtonAction {
  Increment = "INCREMENT",
  Decrement = "DECREMENT",
}

interface ButtonProps {
  disabled: boolean;
  action: ButtonAction;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ disabled, action, onClick }) => {
  const { startTimer, clearTimer } = useTimer(onClick, 1000);

  const mouseEvents = useMouseEvent(
    () => {
      startTimer();
    },
    () => {
      clearTimer();
    }
  );

  const disableButtonStyle = disabled
    ? "border-blue-300 text-blue-300 opacity-50 cursor-not-allowed"
    : "border-blue-800 bg-blue-400 hover:bg-blue-500 text-white";

  const label = action === ButtonAction.Increment ? "+" : "-";

  return (
    <button
      className={`select-none w-12 h-12 text-2xl border-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${disableButtonStyle}`}
      onClick={onClick}
      disabled={disabled}
      {...mouseEvents}
    >
      {label}
    </button>
  );
};

export default Button;
