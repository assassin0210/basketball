import at from "../addTeam/addTeams.module.scss";
import React from "react";
import { UpdatePlayerForm } from "../../ui/updatePlayerForm/updatePlayerForm";

export const UpdatePlayer = () => {
  return (
    <div className={at.container}>
      <div className={at.addTeam_block}>
        <div className={at.headerContainer}>
          <p>
            Player <span>/ </span>Add new player
          </p>
        </div>
        <div>
          <UpdatePlayerForm />
        </div>
      </div>
    </div>
  );
};
