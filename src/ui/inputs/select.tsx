import React, { forwardRef } from "react";
import { FC } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

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
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: "hotpink",
                  primary: "black",
                },
              })}
              inputRef={props.field.ref}
              classNamePrefix="select"
              options={options}
              onChange={(val) => props.field.onChange(val?.value)}
            />
          );
        }}
      />
    );
  }
);
