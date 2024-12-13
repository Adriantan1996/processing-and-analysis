import React from "react";

export interface ButtonProps {
  onClickHandler: () => void;
  buttonText: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { onClickHandler, buttonText } = props;
  return (
    <div>
      <button className="bg-blue-300 rounded-md" onClick={onClickHandler}>
        <p className="text-base font-medium text-center p-4">{buttonText}</p>
      </button>
    </div>
  );
};

export default Button;
