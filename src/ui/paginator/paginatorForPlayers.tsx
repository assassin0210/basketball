import React, { useState, useEffect } from "react";
import s from "./paginator.module.scss";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../api/dto/types";
import { ArrowUp } from "../../assets/icon/arrowUp";
import { ArrowSelect } from "../../assets/icon/arrowSelect";
import {
  setPagePlayers,
  setSizePlayers,
} from "../../modules/players/playerSlice";
import { getPlayers } from "../../modules/players/playerThunk";

export const PaginatorForPlayers = () => {
  const dispatch = useDispatch();
  const teamData = useSelector((state: RootState) => state.teams);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(6);
  const [select, setPageSelect] = useState(false);

  useEffect(() => {
    dispatch(setPagePlayers(currentPage));
    dispatch(setSizePlayers(size));
    dispatch(getPlayers());
  }, [currentPage, size, dispatch]);

  const handlePageClick = (e: { selected: number }) => {
    setCurrentPage(e.selected + 1);
  };

  const setCountCard = (e: any) => {
    setSize(+e.target.innerHTML);
    setPageSelect(!select);
  };

  return (
    <div className={s.pagination_wrapper}>
      <ReactPaginate
        pageCount={teamData.count / size}
        pageRangeDisplayed={5}
        marginPagesDisplayed={6}
        disableInitialCallback={true}
        previousLabel={<ArrowSelect />}
        nextLabel={<ArrowSelect />}
        containerClassName={`${s.pagination}`}
        activeClassName={`${s.active}`}
        onPageChange={handlePageClick}
        previousClassName={`${s.previous}`}
        nextClassName={`${s.next}`}
      />

      <div className={s.pagination_selectCountCard}>
        <ul
          className={`${s.pagination_setCountCard} ${
            !select ? s.display_none : ""
          }`}
        >
          <li onClick={setCountCard}>6</li>
          <li onClick={setCountCard}>12</li>
          <li onClick={setCountCard}>24</li>
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
