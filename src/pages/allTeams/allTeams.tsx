import at from "./allTeams.module.scss";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../api/dto/types";
import { Search } from "../../assets/icon/search";
import { MissingTeams } from "../missingTeam/missingTeams";
import { useHistory } from "react-router";
import { TeamCard } from "../../ui/teamCard/teamCard";
import React from "react";
import { getTeams } from "../../modules/teams/teamThunk";
import ap from "../allPlayers/allPlayers.module.scss";
import { PaginatorForTeams } from "../../ui/paginator/paginatorForTeams";
import { setResultSearchState } from "../../modules/teams/teamsSlice";
import { toUpperFirst } from "../../ui/secondaryFunctions";

export const AllTeams = () => {
  const history = useHistory();

  const teams = useSelector((state: RootState) => state.teams);
  const handleHistoryPush = () => history.push("/teams/addTeams");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch, teams.resultSearch]);

  const teamsCardList = useMemo(() => {
    return teams.data.map((team, index) => (
      <TeamCard
        key={index}
        name={team.name}
        foundationYear={team.foundationYear}
        division={team.division}
        conference={team.conference}
        imageUrl={team.imageUrl}
        id={team.id}
      />
    ));
  }, [teams]);

  return (
    <div className={at.allTeams_container}>
      <div className={at.top_side}>
        <div className={at.search_block}>
          <input
            className={at.input}
            type="text"
            placeholder="Search"
            value={teams.resultSearch}
            onChange={(e) => {
              dispatch(
                setResultSearchState(toUpperFirst(e.currentTarget.value))
              );
            }}
          />
          <Search />
        </div>

        <input
          onClick={handleHistoryPush}
          className={ap.red_button}
          value="Add  +"
          type="submit"
        />
      </div>

      {teams.count === 0 ? (
        <MissingTeams />
      ) : (
        <div className={at.contentWrapper}>{teamsCardList}</div>
      )}
      <div>
        <PaginatorForTeams />
      </div>
    </div>
  );
};
