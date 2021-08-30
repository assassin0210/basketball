import ap from "./allPlayers.module.scss";
import { Search } from "../../assets/icon/search";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddPlayersFormType, StateType } from "../../api/dto/types";
import { MissingPlayers } from "../../ui/playerCard/missingPlayers";
import { useHistory } from "react-router";
import { PlayerCard } from "../../ui/playerCard/playerCard";
import { getPlayers } from "../../modules/players/playerThunk";
import { getTeams } from "../../modules/teams/teamThunk";
import { SearchTeam } from "../../ui/inputs/serchTeam";
import { useForm } from "react-hook-form";
import at from "../allTeams/allTeams.module.scss";
import { toUpperFirst } from "../../ui/secondaryFunctions";
import { PaginatorForPlayers } from "../../ui/paginator/paginatorForPlayers";
import { setResultSearchStatePlayers } from "../../modules/players/playerSlice";

export const AllPlayer = () => {
  const dispatch = useDispatch();
  const players = useSelector((state: StateType) => state.players);
  const teams = useSelector((state: StateType) => state.teams);
  const team = teams.data.map((item) => item.name);
  const history = useHistory();
  const handleHistoryPush = () => history.push("/players/addPlayer");
  const { control } = useForm<AddPlayersFormType>();
  const [resultSearch, setResultSearch] = useState();

  const filterForRenderPlayerCard = useMemo(() => {
    if (players.optionsData.length > 0) {
      return players.optionsData;
    } else {
      return players.data;
    }
  }, [players]);

  useEffect(() => {
    dispatch(getPlayers());
    dispatch(getTeams());
  }, [players.resultSearch, dispatch]);

  const playerCardList = useMemo(() => {
    return filterForRenderPlayerCard.map((player, index) => (
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
  }, [team, filterForRenderPlayerCard]);

  return (
    <div className={ap.container}>
      <div className={ap.top_side}>
        <div className={at.search_block}>
          <input
            className={at.input}
            type="text"
            placeholder="Search..."
            value={players.resultSearch}
            onChange={(e) => {
              dispatch(
                setResultSearchStatePlayers(toUpperFirst(e.currentTarget.value))
              );
            }}
          />
          <Search />
        </div>

        <div className={ap.teamSearch}>
          <SearchTeam
            name={"resultSearchPlayersInTeam"}
            control={control}
            resultSearch={resultSearch}
            setResultSearch={setResultSearch}
          />
        </div>
        <input
          onClick={handleHistoryPush}
          className={ap.red_button}
          value="Add  +"
          type="submit"
        />
      </div>
      {!players.count ? (
        <MissingPlayers />
      ) : (
        <div className={ap.contentWrapper}>{playerCardList}</div>
      )}
      <PaginatorForPlayers />
    </div>
  );
};
