import React from "react";
import dt from "../detailsTeam/detailsTeam.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../api/dto/types";
import { DeleteTeam } from "../../assets/icon/deleteTeam";
import { useHistory, useParams } from "react-router";
import { Update } from "../../assets/icon/update";
import { useEffect } from "react";
import { Preloader } from "../../ui/preloader/preloader";
import { deletePlayer, getPlayer } from "../../modules/players/playerThunk";
import { getAgePlayer } from "../../ui/secondaryFunctions";
import { getTeams } from "../../modules/teams/teamThunk";

export const DetailsPlayer = () => {
  const currentPlayer = useSelector(
    (state: RootState) => state.players.currentPlayer
  );
  const isFetching = useSelector(
    (state: RootState) => state.players.isFetching
  );
  const teams = useSelector((state: RootState) => state.teams);
  const params: { id: string } = useParams();
  const dispatch = useDispatch();

  const teamName = teams.data.find(
    (team) => team.id === currentPlayer.team
  )?.name;

  useEffect(() => {
    dispatch(getPlayer(Number(params.id)));
    dispatch(getTeams());
  }, [dispatch, params.id]);
  const history = useHistory();

  const handleDelete = () => {
    const question = window.confirm(
      "are you sure you want to delete the player?"
    );
    if (question) {
      dispatch(deletePlayer(Number(params.id)));
    }
    history.push("/players");
  };
  const handleUpdate = () => {
    history.push(`/players/updatePlayer/${params.id}`);
  };
  return (
    <div className={dt.container}>
      {isFetching && <Preloader />}
      <div className={dt.teamInfo}>
        <div className={dt.team_info_header}>
          <div className={dt.descBlock}>
            <span
              className={dt.goBack}
              onClick={() => history.push("/players")}
            >
              Player
            </span>{" "}
            <p> / </p> {currentPlayer.name}
          </div>
          <div className={dt.iconBlock}>
            <Update handleUpdate={handleUpdate} />
            <DeleteTeam handleDelete={handleDelete} />
          </div>
        </div>

        <div className={dt.playerInfo_content}>
          <div className={dt.imageUrl_player_container}>
            <img src={currentPlayer.avatarUrl} alt=" team logo" />
          </div>
          <div className={dt.current_info_container}>
            <h2>
              {currentPlayer.name}{" "}
              <span className={dt.currentPlayer_number}>
                #{currentPlayer.number}
              </span>
            </h2>
            <div className={dt.YearFound_divisions}>
              <p>
                Position <br /> <span>{currentPlayer.position}</span>
              </p>
              <p>
                Team <br /> <span> {teamName} </span>
              </p>
            </div>
            <div className={dt.YearFound_divisions}>
              <p>
                Height <br /> <span>{currentPlayer.height}</span>
              </p>
              <p>
                Weight <br /> <span> {currentPlayer.weight} </span>
              </p>
            </div>
            <p>
              Age <br />
              <span>{getAgePlayer(currentPlayer.birthday)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
