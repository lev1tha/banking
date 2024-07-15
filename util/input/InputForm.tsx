import React, { AllHTMLAttributes } from "react";

interface PropsInputT {
  placeholder?: string;
  id: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputForm({
  placeholder,
  id,
  className,
  onChange,
}: PropsInputT) {
  return (
    <input
      placeholder={placeholder}
      id={id}
      className={className}
      onChange={onChange}
    />
  );
}
