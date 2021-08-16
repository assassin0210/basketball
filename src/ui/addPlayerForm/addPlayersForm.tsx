import {SubmitHandler, useForm} from "react-hook-form";
import {AddPlayersFormType, getTeamType, RootState,} from "../../api/dto/types";
import atf from "../allTeams/addTeamsForm/addTeamsForm.module.scss";
import {AddPhotoIcon} from "../../assets/icon/addPhotoIcon";
import React, {useEffect, useState} from "react";
import {ErrorText} from "../errorText/errorText";
import {ButtonCancel} from "../buttons/buttonCatcel";
import {useDispatch, useSelector} from "react-redux";
import {addImagePlayer, getPositions} from "../../modules/players/playerSlice";
import {getTeams} from "../../modules/teams/teamsSlice";

export const AddPlayersForm = () => {
    const players = useSelector((state: RootState) => state.players)
    const teams = useSelector((state: RootState & getTeamType) => state.teams.data)
    const {register, handleSubmit, watch, formState: {errors}} = useForm<AddPlayersFormType>();
    const dispatch = useDispatch()
    const [inputPosition, setInputPosition] = useState(false)

    useEffect(() => {
        dispatch(getPositions())
        dispatch(getTeams())

    }, [dispatch,inputPosition])
    const onSubmit: SubmitHandler<AddPlayersFormType> = data => {
        // @ts-ignore
        const teamId = teams.find(team => team.name === data.team).id
        data.team = teamId
        dispatch(addImagePlayer(data))

            setInputPosition(!inputPosition)
    };



    const file = watch()
    const checkFile = () => {
        if (!file.file) {
            return false
        } else if (file.file.length === 0) {
            return false
        }
        return true
    }


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
                {errors.file && <span className={atf.errorLabel}>Image is required</span>}
            </div>

            <div className='formWrapper'>
                <div className='form-container'>
                    <label style={{marginTop: '0'}}> Name</label>
                    <input className='input_form' {...register("name", {required: true})} />
                    {errors.name && <ErrorText>Name is required</ErrorText>}
                    <label> Position</label>
                    <div style={{position:'relative'}}>

                       <select style={{width: '100%'}} placeholder='Selected'
                                className='input_form' {...register("position", {required: true})}>
                            <option className='default_option-in-select' style={{display: 'none'}} >Select...
                            </option>
                            {players.positions?.map((position) => <option value={position}>{position}</option>)}
                        </select>


                        {errors.position &&<span className={atf.errorLabelPosition}>Position is required</span>}
                    </div>



                    <label> Team</label>

                    <select style={{width: '100%'}} placeholder='Selected'
                            className='input_form' {...register("team", {required: true})}>

                        <option className='default_option-in-select' style={{display: 'none'}} >Select...
                        </option>
                        {teams.map((team) => <option key={team.id}>{team.name}</option>)}
                    </select>

                    { errors.team?  <ErrorText>Team is required</ErrorText> : '' }
                    <div className={atf.block_inputs}>
                        <div>
                            <label> Height (cm)</label>
                            <input  {...register("height", {required: true})} />
                            {errors.height && <ErrorText>Height is required</ErrorText>}
                        </div>
                        <div>
                            <label> Weight (kg)</label>
                            <input className='input_form' {...register("weight", {required: true})} />
                            {errors.weight && <ErrorText>Weight is required</ErrorText>}

                        </div>
                    </div>
                    <div className={atf.block_inputs}>
                        <div>
                            <label> Birthday</label>
                            <input type="date" {...register('birthday', {required: true})} />
                            {errors.birthday && <ErrorText>Birthday is required</ErrorText>}
                        </div>
                        <div>
                            <label> Number</label>
                            <input type='number' className='input_form' {...register("number", {required: true})} />
                            {errors.number && <ErrorText>Number is required</ErrorText>}
                        </div>
                    </div>
                    <div className={atf.buttons_block}>
                        <ButtonCancel/>
                        <input value='Save' className='red-button' type="submit"/>
                    </div>
                </div>
            </div>
        </form>
    )
}
