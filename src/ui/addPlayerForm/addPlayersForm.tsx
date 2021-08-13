import {SubmitHandler, useForm} from "react-hook-form";
import {AddTeamIType, RootState, } from "../../api/dto/types";
import atf from "../allTeams/addTeamsForm/addTeamsForm.module.scss";
import {AddPhotoIcon} from "../../assets/icon/addPhotoIcon";
import React, {useEffect} from "react";
import {ErrorText} from "../errorText/errorText";
import {ButtonCancel} from "../buttons/buttonCatcel";
import {useDispatch, useSelector} from "react-redux";
import {getPositions} from "../../modules/players/playerSlice";
import {SelectStyle} from "../selectStyle/selectStyle";
import Calendar from 'react-calendar'
import { CalendarUi } from "../calendarUi/calendarUi";




export const AddPlayersForm = () => {
    const players = useSelector((state: RootState) => state.players)
    const {register, handleSubmit, watch, formState: {errors}} = useForm<AddTeamIType>();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPositions())
    }, [dispatch])

    const onSubmit: SubmitHandler<AddTeamIType> = data => {

    };

    const checkFile = () => {
        if (!file.file) {
            return false
        } else if (file.file.length === 0) {
            return false
        }
        return true
    }

    const file = watch()

    return (
        <form className={atf.container} onSubmit={handleSubmit(onSubmit)}>
            <div className={atf.testWrapper}>
                <div className={atf.inputFile_wrapper}>
                    <input accept="image/*" id="imgInp" type="file" {...register("file", {required: true})}/>
                    <div className={atf.inputFile_bg}>
                    </div>
                    <AddPhotoIcon/>
                    <div className={atf.BGimg}
                         style={{backgroundImage: `url(${checkFile() ? URL.createObjectURL(file.file[0]) : ''})`}}>
                    </div>
                </div>
            </div>
            <div className='formWrapper'>
                <div className='form-container'>
                    <label> Name</label>
                    <input className='input_form' {...register("name", {required: true})} />
                    {errors.name && <ErrorText>Name is required</ErrorText>}
                    <label> Division</label>

                    <select style={{width: '100%'}} placeholder='Selected'
                            className='input_form' {...register("division", {required: true})}>
                        <option className='default_option-in-select' style={{display: 'none'}} value="0">Select...
                        </option>
                        <SelectStyle/>
                        {players.positions?.map((position) => <option value={position}>{position}</option>)}
                    </select>
                    {errors.division && <ErrorText>Division is required</ErrorText>}
                    <label> Conference</label>
                    <input type='data'  {...register("conference", {required: true})} />
                    <CalendarUi/>
                    {errors.conference && <ErrorText>Conference is required</ErrorText>}
                    <label> Year of foundation</label>
                    <input type='number' className='input_form'  {...register("foundationYear", {
                        required: true,
                        min: 0,
                        max: 2022
                    })} />
                    {errors.foundationYear &&
                    <ErrorText>Foundation year cannot be higher than 2022 or absent</ErrorText>}
                    <div className={atf.buttons_block}>
                        <ButtonCancel/>
                        <input value='Save' className='red-button' type="submit"/>
                    </div>
                </div>
            </div>
        </form>
    )
}
