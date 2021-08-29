import React, { forwardRef } from "react";
import { FC } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import "./selectCastom.css";
import { stylesForSelect } from "../../assets/styles/styles";

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
              styles={stylesForSelect}
              isClearable
              inputRef={props.field.ref}
              options={options}
              onChange={(val) => {
                props.field.onChange(val?.value);
              }}
            />
          );
        }}
      />
    );
  }
);
