import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import atf from "../addTeamsForm/addTeamsForm.module.scss";
import { ErrorText } from "../errorText/errorText";
import { useDispatch } from "react-redux";
import { ButtonCancel } from "../buttons/buttonCatcel";
import { useHistory, useParams } from "react-router";
import { addImage } from "../../modules/teams/teamThunk";
import { FileInput } from "../inputs/fileInput";
import { AddTeamIType } from "../../api/dto/teamTypes";
import si from "../../pages/singIn/singIn.module.scss";

export const UpdateTeamForm = React.memo(() => {
  const history = useHistory();
  const params: { id: string } = useParams();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddTeamIType>();
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<AddTeamIType> = async (data) => {
    data.id = Number(params.id);
    await dispatch(addImage(data));
    await history.push(`/teams/${params.id}`);
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
          <label> Name</label>
          <input
            className={errors.name && si.input_Error}
            {...register("name", { required: true })}
          />
          {errors.name && <ErrorText>Name is required</ErrorText>}
          <label> Division</label>
          <input
            className={errors.division && si.input_Error}
            {...register("division", { required: true })}
          />
          {errors.division && <ErrorText>Division is required</ErrorText>}
          <label> Conference</label>
          <input
            className={errors.conference && si.input_Error}
            {...register("conference", { required: true })}
          />
          {errors.conference && <ErrorText>Conference is required</ErrorText>}
          <label> Year of foundation</label>
          <input
            className={errors.foundationYear && si.input_Error}
            type="number"
            {...register("foundationYear", {
              required: true,
              min: 0,
              max: 2022,
            })}
          />
          {errors.foundationYear && (
            <ErrorText>
              Foundation year cannot be higher than 2022 or absent
            </ErrorText>
          )}
          <div className={atf.buttons_block}>
            <ButtonCancel />
            <input value="Save" type="submit" />
          </div>
        </div>
      </div>
    </form>
  );
});
