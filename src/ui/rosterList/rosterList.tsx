import { FC } from "react";
import { IPlayerInfo } from "../../api/dto/playerTypes";
import { getAgePlayer } from "../secondaryFunctions";

export const RosterList: FC<IPlayerInfo> = ({
  number,
  height,
  name,
  position,
  weight,
  avatarUrl,
  birthday,
  team,
  id,
}) => {
  return (
    <li className="roster_container">
      <div>
        <span className="one_number">{number}</span>
        <span className="two_photo">
          <img src={avatarUrl} alt="avatar" />
        </span>
        <span className="three_name">
          {name} <br />
          <p>{position}</p>
        </span>
      </div>
      <div className="charisma">
        <span className="four_height">{height}cm</span>
        <span className="five_weight">{weight} kg</span>
        <span className="six_age">{getAgePlayer(birthday)}</span>
      </div>
    </li>
  );
};
