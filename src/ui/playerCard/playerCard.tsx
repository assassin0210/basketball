import React from "react";
import tc from "../teamCard/teamCard.module.scss";
import { FC } from "react";
import { AddPlayersFormType } from "../../api/dto/types";
import { useHistory } from "react-router";

export const PlayerCard: FC<AddPlayersFormType> = ({
  number,
  name,
  id,
  avatarUrl,
  teamName,
  team,
}) => {
  const history = useHistory();

  const handleCheckId = () => {
    history.push(`/players/${id}`);
  };

  return (
    <div onClick={handleCheckId} className={tc.teamCardContainer}>
      <div className={tc.playerLogoBlock}>
        <img src={avatarUrl} alt="team" />
      </div>
      <div className={tc.teamDescription}>
        <h3>
          {name}
          <span> #{number}</span>
        </h3>
        <h4> {teamName}</h4>
      </div>
    </div>
  );
};
