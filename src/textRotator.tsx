import React from "react";

interface Props {
  text: string;
}

export const RotatingText = ({ text }: Props) => {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
};

export const HelloWrapper = ({ text }: Props) => (
  <div>
    <p>Hello {text}</p>
  </div>
);
