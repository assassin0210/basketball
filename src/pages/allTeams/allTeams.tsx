import at from "./allTeams.module.scss";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../api/dto/types";
import { Search } from "../../assets/icon/search";
import { MissingTeams } from "../missingTeam/missingTeams";
import { useHistory } from "react-router";
import { Preloader } from "../../ui/preloader/preloader";
import { TeamCard } from "../../ui/teamCard/teamCard";
import React from "react";
import { getTeams } from "../../modules/teams/teamThunk";
import ap from "../allPlayers/allPlayers.module.scss";

export const AllTeams = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const teams = useSelector((state: RootState) => state.teams);
  const handleHistoryPush = () => history.push("/teams/addTeams");

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

      {teams.isFetching && <Preloader />}
      {teams.count === 0 ? (
        <MissingTeams />
      ) : (
        <div className={at.contentWrapper}>{teamsCardList}</div>
      )}
      <div>
        <div>пагинация</div>
        <div>пагинация</div>
      </div>
    </div>
  );
};
