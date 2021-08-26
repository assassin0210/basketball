import ap from "./allPlayers.module.scss";
import { Search } from "../../assets/icon/search";
import React, { useEffect, useMemo } from "react";
import { Preloader } from "../../ui/preloader/preloader";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../api/dto/types";
import { MissingPlayers } from "../../ui/playerCard/missingPlayers";
import { useHistory } from "react-router";
import { PlayerCard } from "../../ui/playerCard/playerCard";
import { getPlayers } from "../../modules/players/playerThunk";
import { getTeams } from "../../modules/teams/teamThunk";

export const AllPlayer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTeams());
    dispatch(getPlayers());
  }, [dispatch]);

  const players = useSelector((state: StateType) => state.players);
  const teams = useSelector((state: StateType) => state.teams);
  const team = teams.data.map((item) => item.name);
  const history = useHistory();
  const handleHistoryPush = () => history.push("/players/addPlayer");

  const playerCardList = useMemo(() => {
    return players.data.map((player, index) => (
      <PlayerCard
        key={index}
        number={player.number}
        teamName={team[index]}
        name={player.name}
        position={player.position}
        team={player.team}
        birthday={player.birthday}
        height={player.height}
        weight={player.weight}
        avatarUrl={player.avatarUrl}
        id={player.id}
      />
    ));
  }, [players, team]);

  return (
    <div className={ap.container}>
      <div className={ap.top_side}>
        <div className={ap.search_block}>
          <input placeholder="Search..." type="text" />
          <Search />
        </div>
        <div className={ap.search_block}>
          <input placeholder="Search..." type="text" />
          <Search />
        </div>
        <input
          onClick={handleHistoryPush}
          className={ap.red_button}
          value="Add  +"
          type="submit"
        />
      </div>
      {players.isFetching && <Preloader />}
      {!players.count ? (
        <MissingPlayers />
      ) : (
        <div className={ap.contentWrapper}>{playerCardList}</div>
      )}
      <div>
        <div>пагинация</div>
        <div>пагинация</div>
      </div>
    </div>
  );
};
