import at from "../addTeam/addTeams.module.scss";
import { Preloader } from "../../ui/preloader/preloader";
import React from "react";
import { useSelector } from "react-redux";
import { StateType } from "../../api/dto/types";
import { UpdateTeamForm } from "../../ui/updateTeamForm/updateTeamForm";
import { useHistory } from "react-router";

export const UpdateTeam = () => {
  const isFetching = useSelector<StateType>((state) => state.teams.isFetching);
  const history = useHistory();
  const handleHistoryTeam = () => {
    history.push("/teams");
  };
  return (
    <div className={at.container}>
      <div className={at.addTeam_block}>
        {isFetching ? <Preloader /> : ""}
        <div onClick={handleHistoryTeam} className={at.headerContainer}>
          <p>
            Teams <span>/ </span>Edit Team
          </p>
        </div>
        <UpdateTeamForm />
      </div>
    </div>
  );
};
