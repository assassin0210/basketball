import { SubmitHandler, useForm } from "react-hook-form";
import { AddPlayersFormType, RootState } from "../../api/dto/types";
import atf from "../addTeamsForm/addTeamsForm.module.scss";
import React, { useEffect, useState } from "react";
import { ErrorText } from "../errorText/errorText";
import { ButtonCancel } from "../buttons/buttonCatcel";
import { useDispatch, useSelector } from "react-redux";
import {
  addImagePlayer,
  getPositions,
} from "../../modules/players/playerThunk";
import { getTeams } from "../../modules/teams/teamThunk";
import { FileInput } from "../inputs/fileInput";
import { SelectComponent } from "../inputs/select";

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

  const teamsDataForSelect = () => {
    const teamsData = [];
    for (let team of teams) {
      teamsData.push({ value: team.id, label: team.name });
    }
    return teamsData;
  };

  const positionsDataForSelect = () => {
    const positionsAll = [];
    for (let position of players.positions) {
      positionsAll.push({ value: position, label: position });
    }
    return positionsAll;
  };

  const onSubmit: SubmitHandler<AddPlayersFormType> = (data) => {
    dispatch(addImagePlayer(data));
    setInputPosition(!inputPosition);
  };

  return (
    <form className={atf.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={atf.testWrapper}>
        <FileInput control={control} />
        {errors.file && (
          <span className={atf.errorLabel}>Image is required</span>
        )}
      </div>
      <div className={atf.formWrapper}>
        <div className={atf.form_container}>
          <label className={atf.labelName}>Name</label>
          <input {...register("name", { required: true })} />
          {errors.name && <ErrorText>Name is required</ErrorText>}
          <label> Position</label>
          <div>
            <SelectComponent
              options={positionsDataForSelect()}
              height="30px"
              name={"position"}
              control={control}
            />
            {errors.position && (
              <span className={atf.errorLabelPosition}>
                Position is required
              </span>
            )}
          </div>
          <label> Team</label>
          <SelectComponent
            {...register("team", { required: true })}
            options={teamsDataForSelect()}
            name={"team"}
            control={control}
          />
          {errors.team ? <ErrorText>Team is required</ErrorText> : ""}
          <div className={atf.block_inputs}>
            <div>
              <label> Height (cm)</label>
              <input {...register("height", { required: true })} />
              {errors.height && <ErrorText>Height is required</ErrorText>}
            </div>
            <div>
              <label> Weight (kg)</label>
              <input {...register("weight", { required: true })} />
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
                {...register("number", { required: true })}
              />
              {errors.number && <ErrorText>Number is required</ErrorText>}
            </div>
          </div>
          <div className={atf.buttons_block}>
            <ButtonCancel />
            <input value="Save" type="submit" />
          </div>
        </div>
      </div>
    </form>
  );
};
