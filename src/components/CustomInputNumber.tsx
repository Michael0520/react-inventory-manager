interface CustomInputNumberProps {
  min: number;
  max: number;
  step: number;
  name: string;
  value: number;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const CustomInputNumber: React.FC<CustomInputNumberProps> = ({
  min,
  max,
  step,
  name,
  value,
  disabled,
  onChange,
  onBlur,
}) => {
  return (
    <input
      className={`w-12 h-12 text-center border-2 border-indigo-700 rounded-lg outline-none focus:border-indigo-500 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      type="number"
      min={min}
      max={max}
      step={step}
      name={name}
      value={value}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      maxLength={1}
    />
  );
};
