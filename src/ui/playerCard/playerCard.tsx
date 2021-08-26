import React from "react";
import pc from "./playerCard.module.scss";
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
    <div onClick={handleCheckId} className={pc.teamCardContainer}>
      <div className={pc.playerLogoBlock}>
        <img src={avatarUrl} alt="team" />
      </div>
      <div className={pc.teamDescription}>
        <h3>
          {name}
          <span> #{number}</span>
        </h3>
        <h4> {teamName}</h4>
      </div>
    </div>
  );
};
