import Button, { ButtonAction } from "./Button";
import { CustomInputNumber } from "./CustomInputNumber";

interface PersonCounterProps {
  label: string;
  subLabel?: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  isDisabledIncrement: boolean;
  isDisabledDecrement: boolean;
  onChangeValue: (newValue: number) => void;
}
export const PersonCounter: React.FC<PersonCounterProps> = ({
  label,
  subLabel,
  count,
  onIncrement,
  onDecrement,
  isDisabledIncrement,
  isDisabledDecrement,
  onChangeValue,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (isNaN(newValue)) {
      onChangeValue(0);
    } else {
      onChangeValue(newValue);
    }
    // console.log(e.target.name, e.target.value);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // handle input blur logic here
    // console.log(e.target.name, e.target.value);
  };

  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-1">
        <h4 className="text-lg font-semibold">{label}</h4>
        {subLabel && <p className="text-xs text-gray-600">{subLabel}</p>}
      </div>
      <div className="flex gap-2 text-base">
        <Button
          disabled={isDisabledDecrement}
          action={ButtonAction.Decrement}
          onClick={onDecrement}
        />

        <CustomInputNumber
          min={0}
          max={4}
          step={1}
          name={label}
          value={count}
          disabled={isDisabledIncrement && isDisabledDecrement}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />

        <Button
          disabled={isDisabledIncrement}
          action={ButtonAction.Increment}
          onClick={onIncrement}
        />
      </div>
    </div>
  );
};
