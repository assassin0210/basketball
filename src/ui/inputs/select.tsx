import React, { forwardRef } from "react";
import { FC } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import "./selectCastom.css";

export const SelectComponent: FC<any> = forwardRef(
  ({ options, control, name }, ref) => {
    return (
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={(props) => {
          return (
            <Select
              isClearable
              className="react-select"
              classNamePrefix="react-select"
              inputRef={props.field.ref}
              options={options}
              onChange={(val) => props.field.onChange(val?.value)}
            />
          );
        }}
      />
    );
  }
);
