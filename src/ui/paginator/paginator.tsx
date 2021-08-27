import React, { useState, useEffect } from "react";
import s from "./paginator.module.scss";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../api/dto/types";
import { ArrowUp } from "../../assets/icon/arrowUp";
import { getTeams } from "../../modules/teams/teamThunk";
import { setPageAction, setSizeAction } from "../../modules/teams/teamsSlice";
import { ArrowSelect } from "../../assets/icon/arrowSelect";

export const Paginator: React.FC<any> = ({}) => {
  const dispatch = useDispatch();
  const teamData = useSelector((state: RootState) => state.teams);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(2);
  const [select, setPageSelect] = useState(false);

  useEffect(() => {
    dispatch(setSizeAction(size));
    dispatch(getTeams());
  }, [size]);

  useEffect(() => {
    dispatch(setPageAction(currentPage));
    dispatch(getTeams());
  }, [currentPage]);

  const styles = {
    setCountCardShow: {
      display: "flex",
    },
    setCountCardHidden: {
      display: "none",
    },
  };

  const handlePageClick = (e: { selected: number }) => {
    setCurrentPage(e.selected + 1);
  };

  const setCountCard = (e: any) => {
    setSize(+e.target.innerHTML);
    setPageSelect(!select);
    //dispatch(setSizeAction(size));
  };

  return (
    <div className={s.pagination_wrapper}>
      <ReactPaginate
        disableInitialCallback={false}
        previousLabel={<ArrowSelect />}
        nextLabel={<ArrowSelect />}
        breakLabel={<div>...</div>}
        /*breakClassName={`${s.breakMe}`}*/
        pageCount={teamData.count / size}
        marginPagesDisplayed={5}
        pageRangeDisplayed={6}
        containerClassName={`${s.pagination}`}
        activeClassName={`${s.active}`}
        onPageChange={handlePageClick}
      />

      <div className={s.pagination_selectCountCard}>
        <ul
          style={select ? styles.setCountCardShow : styles.setCountCardHidden}
          className={s.pagination_setCountCard}
        >
          <li onChange={(e) => console.log(e.target)} onClick={setCountCard}>
            2
          </li>
          <li onClick={setCountCard}>4</li>
          <li onClick={setCountCard}>6</li>
        </ul>
        <div
          className={s.pagination_currentCard}
          onClick={() => setPageSelect(!select)}
        >
          <span>{size}</span>
          <ArrowUp select={select} />
        </div>
      </div>
    </div>
  );
};
