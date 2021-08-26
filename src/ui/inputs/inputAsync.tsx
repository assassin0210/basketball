import React, { Component, FC } from "react";
import AsyncSelect from "react-select/async";

export const InputAsync: FC<any> = ({ options }) => {
  const filterColors = (inputValue: string) => {
    return options.filter((i: { label: string }) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue: string) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 300);
    });

  return (
    // @ts-ignore
    <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} />
  );
};
