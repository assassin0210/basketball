import { FC } from "react";
import { IPlayerInfo } from "../../api/dto/playerTypes";
import { getAgePlayer } from "../secondaryFunctions";
import s from "./rosterList.module.scss";

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
    <li className={s.roster_container}>
      <div>
        <span className={s.one_number}>{number}</span>
        <span className={s.two_photo}>
          <img src={avatarUrl} alt="avatar" />
        </span>
        <span className={s.three_name}>
          {name} <br />
          <p>{position}</p>
        </span>
      </div>
      <div className={s.charisma}>
        <span className={s.four_height}>{height}cm</span>
        <span className={s.five_weight}>{weight} kg</span>
        <span className={s.six_age}>{getAgePlayer(birthday)}</span>
      </div>
    </li>
  );
};
