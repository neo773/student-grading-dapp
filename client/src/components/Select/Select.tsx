import React, { useState, HTMLAttributes, InputHTMLAttributes } from "react"
import {
  Control,
  Controller,
  FieldPath,
  FieldPathValue,
  FieldValues,
  RegisterOptions,
} from "react-hook-form"

const Select = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  rules = {},
  listData,
  placeholder,
  defaultValue,
  label,
}: {
  name: TName
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >
  listData: {
    [key: string]: any
  }[]
  defaultValue?: FieldPathValue<TFieldValues, TName>
  control?: Control<TFieldValues>
  placeholder: string
  label: string
  inputType?: InputHTMLAttributes<HTMLInputElement>["type"]
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-[#EBECF0]">{label}</span>
            </label>
            <select
              onChange={onChange}
              placeholder={placeholder}
              className="select w-full text-white bg-[#ffffff22] border-[#8b8b8b3b] "
            >
              {listData.map((item, itemIndex) =>
                Object.entries(item).map(([key, value]) => {
                  return (
                    <option value={key} key={key}>
                      {value}
                    </option>
                  )
                })
              )}
            </select>
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

export default Select
