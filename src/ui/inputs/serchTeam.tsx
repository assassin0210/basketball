import React from "react";
import { FC } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import "./selectCastom.css";

export const SearchTeam: FC<any> = ({
  options,
  control,
  name,
  setResultSearch,
}) => {
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
            onChange={(e) => {
              console.log(e);
              if (e) {
                setResultSearch(e);
              }
            }}
            /*onChange={(val) => {
                            props.field.onChange(val?.value);
                            console.log(val);
                          }}*/
          />
        );
      }}
    />
  );
};
