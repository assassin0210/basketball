import { SubmitHandler, useForm } from "react-hook-form";
import { AddPlayersFormType, RootState } from "../../api/dto/types";
import atf from "../addTeamsForm/addTeamsForm.module.scss";
import { AddPhotoIcon } from "../../assets/icon/addPhotoIcon";
import React, { useEffect, useMemo, useState } from "react";
import { ErrorText } from "../errorText/errorText";
import { ButtonCancel } from "../buttons/buttonCatcel";
import { useDispatch, useSelector } from "react-redux";
import {
  addImagePlayer,
  getPositions,
} from "../../modules/players/playerThunk";
import { getTeams } from "../../modules/teams/teamThunk";
import { FileInput } from "../inputs/fileInput";

export const AddPlayersForm = () => {
  const players = useSelector((state: RootState) => state.players);
  const teams = useSelector((state: RootState) => state.teams.data);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddPlayersFormType>();
  const dispatch = useDispatch();
  const [inputPosition, setInputPosition] = useState(false);

  useEffect(() => {
    dispatch(getPositions());
    dispatch(getTeams());
  }, [dispatch]);

  const onSubmit: SubmitHandler<AddPlayersFormType> = (data) => {
    const teamId = teams.find((team) => team.name === data.team)?.id;
    // @ts-ignore
    data.team = teamId;
    dispatch(addImagePlayer(data));
    setInputPosition(!inputPosition);
  };
  const teamsList = useMemo(() => {
    return teams.map((team) => <option key={team.id}>{team.name}</option>);
  }, [teams]);

  const positions = useMemo(() => {
    return players.positions.map((position, index) => (
      <option key={index} value={position}>
        {position}
      </option>
    ));
  }, [players]);

  return (
    <form className={atf.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={atf.testWrapper}>
        <FileInput control={control} />
        {errors.file && (
          <span className={atf.errorLabel}>Image is required</span>
        )}
      </div>
      <div className="formWrapper">
        <div className="form-container">
          <label className="labelName">Name</label>
          <input
            className="input_form"
            {...register("name", { required: true })}
          />
          {errors.name && <ErrorText>Name is required</ErrorText>}
          <label> Position</label>
          <div className="select-container">
            <select
              placeholder="Selected"
              className="input_form"
              {...register("position", { required: true })}
            >
              <option className="default_option-in-select">Select...</option>
              {positions}
            </select>
            {errors.position && (
              <span className={atf.errorLabelPosition}>
                Position is required
              </span>
            )}
          </div>
          <label> Team</label>
          <select
            placeholder="Selected"
            className="input_form"
            {...register("team", { required: true })}
          >
            <option className="default_option-in-select">Select...</option>
            {teamsList}
          </select>
          {errors.team ? <ErrorText>Team is required</ErrorText> : ""}
          <div className={atf.block_inputs}>
            <div>
              <label> Height (cm)</label>
              <input {...register("height", { required: true })} />
              {errors.height && <ErrorText>Height is required</ErrorText>}
            </div>
            <div>
              <label> Weight (kg)</label>
              <input
                className="input_form"
                {...register("weight", { required: true })}
              />
              {errors.weight && <ErrorText>Weight is required</ErrorText>}
            </div>
          </div>
          <div className={atf.block_inputs}>
            <div>
              <label> Birthday</label>
              <input
                type="date"
                {...register("birthday", { required: true })}
              />
              {errors.birthday && <ErrorText>Birthday is required</ErrorText>}
            </div>
            <div>
              <label> Number</label>
              <input
                type="number"
                className="input_form"
                {...register("number", { required: true })}
              />
              {errors.number && <ErrorText>Number is required</ErrorText>}
            </div>
          </div>
          <div className={atf.buttons_block}>
            <ButtonCancel />
            <input value="Save" className="red-button" type="submit" />
          </div>
        </div>
      </div>
    </form>
  );
};
