import React, {useState} from "react";
import {Controller, useController} from "react-hook-form";
import atf from "../addTeamsForm/addTeamsForm.module.scss";
import {AddPhotoIcon} from "../../assets/icon/addPhotoIcon";


// @ts-ignore
export const FileInput = ({control, imageBG, setImageBG, dataImageUrl, setDataImageUrl}) => {


    return (

        <div className={atf.inputFile_wrapper}>
            <Controller
                name="file"
                defaultValue={[dataImageUrl]}
                control={control}
                render={({field}) => (
                    <>
                        <input  {...field}  type="file" id='file'
                            /*    onChange={(e) => {
                                    if (e.target.files) {
                                        field.onChange(parseInt(e.target.value))
                                        setDataImageUrl(dataImageUrl = e.target.files[0]);
                                        setImageBG(URL.createObjectURL(e.target.files[0]))
                                        console.log(field)
                                    }
                                }
                                }*/
                        />

                    </>

                )}
                rules={{
                    required: true
                }}

            />
            <div className={atf.inputFile_bg}>
            </div>
            <AddPhotoIcon/>
            <div className={atf.BGimg}
                 style={{backgroundImage: `url(${imageBG !== '' ? imageBG : ''})`}}
            >
            </div>


        </div>

    );
};
