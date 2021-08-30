import React, { useEffect, useState } from "react";
import at from "../../pages/allTeams/allTeams.module.scss";
import { FC } from "react";
import Select, { components } from "react-select";
import { Controller } from "react-hook-form";
import "./selectCastom.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../api/dto/types";
import { getTeamsSelect } from "../../modules/interfaseResponse/interfaseResponseThunk";
import { moreOptionsItSelect } from "../../modules/interfaseResponse/interfaseResponseSlice";
import { getPlayerFromSelect } from "../../modules/players/playerThunk";
import { menuHeaderStyle, stylesForSelect } from "../../assets/styles/styles";
import { ClearIndicatorCustom } from "../../assets/icon/clearIndicator";
import { clearIndicatorCust } from "../../modules/players/playerSlice";

export const SearchTeam: FC<any> = ({ control, name, setResultSearch }) => {
  const dispatch = useDispatch();
  const selectData = useSelector((state: RootState) => state.interfaceData);
  const [valuess, getValuess] = useState([]);
  const setOptionsForSelect = () => {
    const positionsAll = [];
    for (let team of selectData.data) {
      positionsAll.push({ value: team.id, label: team.name });
    }
    return positionsAll;
  };

  useEffect(() => {
    dispatch(getTeamsSelect());
  }, [selectData.page, dispatch, valuess]);

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      render={(props) => {
        return (
          <>
            <Select
              styles={stylesForSelect}
              ClearIndicator
              isMulti
              isClearable
              inputRef={props.field.ref}
              options={setOptionsForSelect()}
              components={{ MenuList, ClearIndicator }}
              openMenuOnClick
              getValue
              onChange={(e) => {
                setResultSearch(e);
                let value = e.map((item) => item.value);
                dispatch(getPlayerFromSelect(value[value.length - 1]));
              }}
            />
          </>
        );
      }}
    />
  );
};

const MenuList = (props: any) => {
  const teamsCount = useSelector((state: RootState) => state.teams.count);
  const selectSize = useSelector(
    (state: RootState) => state.interfaceData.size
  );
  const dispatch = useDispatch();
  const optionsHandler = () => {
    dispatch(moreOptionsItSelect());
  };

  return (
    <components.MenuList {...props}>
      <div
        onClick={optionsHandler}
        className={`next_ten ${teamsCount > 10 ? "" : ""}`}
        style={menuHeaderStyle}
      >
        Show next 10 of {teamsCount < selectSize ? 0 : selectSize - teamsCount}
      </div>
      {props.children}
    </components.MenuList>
  );
};
const ClearIndicator = (props: any) => {
  const dispatch = useDispatch();
  const clearIndicatorHandler = () => {
    dispatch(clearIndicatorCust([]));
  };
  return (
    <div>
      <components.ClearIndicator {...props}>
        <div
          onMouseDown={(e: any) => {
            clearIndicatorHandler();
          }}
          className={at.clearIndicator}
        >
          <ClearIndicatorCustom />
        </div>
      </components.ClearIndicator>
    </div>
  );
};
