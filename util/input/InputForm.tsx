import React from "react";
import style from "./input.module.css";

interface PropsInputT {
  placeholder?: string;
  id: string;

  type?: string;
  options?: { value: string; label: string }[];
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const InputForm: React.FC<PropsInputT> = ({
  placeholder,
  id,
  type = "text",
  options,
  onChange,
}) => {
  if (type === "select" && options) {
    return (
      <select id={id} className={style.select} onChange={onChange}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      placeholder={placeholder}
      id={id}
      type={type}
      onChange={onChange}
    />
  );
};

export default InputForm;
