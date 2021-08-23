import React, { FC, useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import atf from "../addTeamsForm/addTeamsForm.module.scss";
import { AddPhotoIcon } from "../../assets/icon/addPhotoIcon";

export const FileInput: FC<FieldValues> = ({ control }) => {
  const [imageBG, setImageBG] = useState("");
  return (
    <div className={atf.inputFile_wrapper}>
      <Controller
        name="file"
        control={control}
        rules={{ required: true }}
        defaultValue=""
        render={(props) => (
          <>
            <input
              type="file"
              id="file"
              onChange={(e) => {
                if (e.target.files) {
                  setImageBG(URL.createObjectURL(e.target.files[0]));
                }
                props.field.onChange(e.target.files);
              }}
            />
          </>
        )}
      />
      <div className={atf.inputFile_bg}></div>
      <AddPhotoIcon />
      <div
        className={atf.BGimg}
        style={{ backgroundImage: `url(${imageBG !== "" ? imageBG : ""})` }}
      ></div>
    </div>
  );
};
