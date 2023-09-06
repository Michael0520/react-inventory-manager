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
  let bgColor = "bg-blue-300 hover:bg-blue-400";
  let textColor = "text-white";

  if (action === ButtonAction.Increment) {
    bgColor = "bg-blue-400 hover:bg-blue-500";
  } else if (action === ButtonAction.Decrement) {
    bgColor = "bg-blue-300 hover:bg-blue-400";
  }

  const buttonStyle = disabled
    ? `border-blue-300 text-blue-300 opacity-50 cursor-not-allowed`
    : `border-blue-800 ${bgColor} ${textColor}`;

  const label = action === ButtonAction.Increment ? "+" : "-";

  return (
    <button
      className={` select-none w-12 h-12 text-2xl border-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${buttonStyle}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
