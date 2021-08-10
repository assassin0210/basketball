import {SubmitHandler, useForm} from "react-hook-form";
import React, {useEffect, useRef, useState} from "react";
import atf from './addTeamsForm.module.scss'

import {ErrorText} from "../../errorText/errorText";
import {useHistory} from "react-router";
import {useDispatch, useStore} from "react-redux";
import {addImage} from "../../../modules/getTeams/teamsSlice";
import {AddPhotoIcon} from "../../../assets/icon/addPhotoIcon";


export interface AddTeamIType {
    name: string;
    division: string;
    conference: string;
    foundationYear: number | string
    file: any

}

export const AddTeamsForm = () => {

    const {register, handleSubmit, watch, formState: {errors}} = useForm<AddTeamIType>();
    const [imgage, setImage] = useState(null)
    const dispatch = useDispatch()
    const onSubmit: SubmitHandler<AddTeamIType> = data => {
        dispatch(addImage(data))
    };


    const history = useHistory()
    const file = watch()


    return (

        <form className={atf.container} onSubmit={handleSubmit(onSubmit)}>
            <div className={atf.testWrapper}>
                <div className={atf.inputFile_wrapper}>
                    <input accept="image/*" id="imgInp" type="file" {...register("file", {required: true})}/>
                    <div
                        className={atf.inputFile_bg}>

                    </div>
                    <AddPhotoIcon/>
                    <div className={atf.testBGimg}
                         style={{backgroundImage: `url(${file.file ? URL.createObjectURL(file.file[0]) : ''})`}}>
                    </div>
                </div>
            </div>
            <div className='formWrapper'>
                <div className='form-container'>
                    <label> Name</label>
                    <input className='input_form' {...register("name", {required: true})} />
                    {errors.name && <ErrorText>Name is required</ErrorText>}
                    <label> Division</label>
                    <input className='input_form' {...register("division", {required: true})} />
                    {errors.division && <ErrorText>Division is required</ErrorText>}
                    <label> Conference</label>
                    <input className='input_form' {...register("conference", {required: true})} />
                    {errors.conference && <ErrorText>Conference is required</ErrorText>}
                    <label> Year of foundation</label>
                    <input className='input_form'  {...register("foundationYear", {required: true})} />
                    {errors.foundationYear && <ErrorText>YearOfFoundation is required</ErrorText>}

                    <div className={atf.buttons_block}>
                        <button onClick={() => history.goBack()} className='gray-button'>Cancel</button>
                        <input className='red-button' type="submit"/>
                    </div>
                </div>
            </div>
        </form>

    );
}

