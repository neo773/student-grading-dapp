import React, { useState, HTMLAttributes, InputHTMLAttributes } from "react"
import {
  Control,
  Controller,
  FieldPath,
  FieldPathValue,
  FieldValues,
  RegisterOptions,
} from "react-hook-form"

const Input = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  rules = {},
  placeholder,
  defaultValue,
  disabled = false,
  label,
  inputType = "text",
}: {
  name: TName
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >
  defaultValue?: FieldPathValue<TFieldValues, TName>
  control?: Control<TFieldValues>
  placeholder: string
  disabled?: boolean
  label: string
  inputType?: InputHTMLAttributes<HTMLInputElement>["type"]
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">
                {label}
              </span>
            </label>
            <input
              onChange={onChange}
              disabled={disabled}
              placeholder={placeholder}
              type={inputType}
              value={defaultValue}
              defaultValue={defaultValue}
              className="input input-bordered bg-[#ffffff22] rounded-lg border border-[#8b8b8b3b] placeholder:text-sm"
            />
          </div>
          {error && (
            <span style={{ color: "red", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </span>
          )}
        </>
      )}
    />
  )
}

export default Input
