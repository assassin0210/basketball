import tc from "./teamCard.module.scss";
import { FC } from "react";
import { TeamType } from "../../api/dto/types";
import { useHistory } from "react-router";
import React from "react";

export const TeamCard: FC<TeamType> = React.memo(
  ({ name, foundationYear, division, conference, imageUrl, id }) => {
    const history = useHistory();
    const handleCheckId = () => {
      history.push(`/teams/${id}`);
    };

    return (
      <div onClick={handleCheckId} className={tc.teamCardContainer}>
        <div className={tc.teamLogoBlock}>
          <img src={imageUrl} alt="team" />
        </div>
        <div className={tc.teamDescription}>
          <h3>{name}</h3>
          <h4>Year of foundation: {foundationYear}</h4>
        </div>
      </div>
    );
  }
);
