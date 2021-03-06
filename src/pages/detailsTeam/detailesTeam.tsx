import dt from "./detailsTeam.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../api/dto/types";
import { DeleteTeam } from "../../assets/icon/deleteTeam";
import { useHistory, useParams } from "react-router";
import { RosterList } from "../../ui/rosterList/rosterList";
import { Update } from "../../assets/icon/update";
import { useEffect, useMemo } from "react";
import { Preloader } from "../../ui/preloader/preloader";
import { deleteTeam, getTeam } from "../../modules/teams/teamThunk";
import { getPlayers } from "../../modules/players/playerThunk";

export const DetailsTeam = () => {
  const params: { id: string } = useParams();

  const dispatch = useDispatch();

  const history = useHistory();
  const currentTeam = useSelector(
    (state: RootState) => state.teams.currentTeam
  );
  useEffect(() => {
    dispatch(getTeam(Number(params.id)));
    dispatch(getPlayers());
  }, [dispatch, params.id, currentTeam]);
  const isFetching = useSelector((state: RootState) => state.teams.isFetching);
  const players = useSelector((state: RootState) => state.players.data);

  const currentTeamRoster = players.filter(
    (player) => player.team === Number(params.id)
  );

  const handleDelete = () => {
    const question = window.confirm(
      "are you sure you want to delete the player?"
    );
    if (question) {
      dispatch(deleteTeam(Number(params.id)));
    }
    console.log(Number(params.id));
  };

  const handleUpdate = () => {
    history.push(`/teams/updateTeam/${params.id}`);
  };

  const rosterListForTeam = useMemo(() => {
    return currentTeamRoster.map((player, index) => (
      <RosterList
        key={index}
        team={player.id}
        id={player.id}
        height={player.height}
        number={player.number}
        name={player.name}
        position={player.position}
        weight={player.weight}
        avatarUrl={player.avatarUrl}
        birthday={player.birthday}
      />
    ));
  }, [currentTeamRoster]);

  return (
    <div className={dt.container}>
      {isFetching && <Preloader />}
      <div className={dt.teamInfo}>
        <div className={dt.team_info_header}>
          <div className={dt.descBlock}>
            <span className={dt.goBack} onClick={() => history.push("/teams")}>
              Team
            </span>{" "}
            <p> / </p> {currentTeam.name}{" "}
          </div>
          <div className={dt.iconBlock}>
            <Update handleUpdate={handleUpdate} />
            <DeleteTeam handleDelete={handleDelete} />
          </div>
        </div>

        <div className={dt.team_info_content}>
          <div className={dt.imageUrl_container}>
            <img src={currentTeam.imageUrl} alt=" team logo" />
          </div>
          <div className={dt.current_info_container}>
            <h2>{currentTeam.name}</h2>
            <div className={dt.YearFound_divisions}>
              <p>
                <span>Year of foundation </span>
                <span>{currentTeam.foundationYear}</span>
              </p>
              <p>
                <span>Division</span> <span> {currentTeam.division}</span>
              </p>
            </div>
            <p>
              <span>Conference </span>
              <span>{currentTeam.conference}</span>
            </p>
          </div>
        </div>
        <div className={dt.roster_container}>
          <ul className={dt.roster_list}>
            <li>Roster</li>
            <li className={dt.second_li}>
              <div>
                <span className={dt.first_item}>#</span>
                <span className={dt.second_item}>Player</span>
                <span className={dt.no_items}> </span>
              </div>
              <div className={dt.charisma}>
                <span>Height</span>
                <span>Weight</span>
                <span>Age</span>
              </div>
            </li>
            {rosterListForTeam}
          </ul>
        </div>
      </div>
    </div>
  );
};
