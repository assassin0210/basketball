import {SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import atf from './addTeamsForm.module.scss'

import {ErrorText} from "../../errorText/errorText";
import {useHistory} from "react-router";


interface IFormInput {
    Name: string;
    Division: string;
    Conference: string;
    YearOfFoundation: number|string
}

export const AddTeamsForm = () => {

    const { register, handleSubmit ,formState: {errors}} = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);
    const history = useHistory()

    return (

        <form className={atf.container} onSubmit={handleSubmit(onSubmit)}>
            <div className={atf.inputFile_wrapper}>
                <input type="file"/></div>
            <div className='formWrapper'>
                <div className='form-container'>
                    <label> Name</label>
                    <input  {...register("Name", {required: true})} />
                    {errors.Name && <ErrorText>Name is required</ErrorText>}
                    <label> Division</label>
                    <input  {...register("Division", {required: true})} />
                    {errors.Division && <ErrorText>Division is required</ErrorText>}
                    <label> Conference</label>
                    <input  {...register("Conference", {required: true})} />
                    {errors.Conference && <ErrorText>Conference is required</ErrorText>}
                    <label> Year of foundation</label>
                    <input  {...register("YearOfFoundation", {required: true})} />
                    {errors.YearOfFoundation && <ErrorText>YearOfFoundation is required</ErrorText>}

                    <div className={atf.buttons_block}>
                        <button onClick={()=> history.goBack()} className='gray-button'>Cancel</button>
                        <input className='red-button' type="submit" />
                    </div>
                </div>
            </div>
        </form>

    );
}

