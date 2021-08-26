import at from "./allTeams.module.scss";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddPlayersFormType, RootState } from "../../api/dto/types";
import { Search } from "../../assets/icon/search";
import { MissingTeams } from "../missingTeam/missingTeams";
import { useHistory } from "react-router";
import { Preloader } from "../../ui/preloader/preloader";
import { TeamCard } from "../../ui/teamCard/teamCard";
import React from "react";
import { getTeams } from "../../modules/teams/teamThunk";
import ap from "../allPlayers/allPlayers.module.scss";
import { useForm } from "react-hook-form";
import { SearchTeam } from "../../ui/inputs/serchTeam";

export const AllTeams = () => {
  const history = useHistory();

  const teams = useSelector((state: RootState) => state.teams);
  const handleHistoryPush = () => history.push("/teams/addTeams");
  const [resultSearch, setResultSearch] = useState();

  const dispatch = useDispatch();
  console.log(resultSearch);
  let mapFunc: any[] = [];
  if (resultSearch !== undefined || null) {
    // @ts-ignore
    mapFunc.push(resultSearch.value);
  } else {
    mapFunc = teams.data;
  }
  console.log(mapFunc);
  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch, resultSearch]);

  const teamsCardList = useMemo(() => {
    return mapFunc.map((team, index) => (
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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddPlayersFormType>();

  const positionsDataForSelect = () => {
    const positionsAll = [];
    for (let team of teams.data) {
      positionsAll.push({ value: team, label: team.name });
    }
    return positionsAll;
  };

  return (
    <div className={at.allTeams_container}>
      <div className={at.top_side}>
        {/*<div className={at.search_block}>*/}
        <SearchTeam
          options={positionsDataForSelect()}
          name={"resultSearch"}
          control={control}
          resultSearch={resultSearch}
          setResultSearch={setResultSearch}
        />
        {/*</div>*/}

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
