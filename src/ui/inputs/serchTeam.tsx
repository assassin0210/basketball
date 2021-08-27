import React, { useEffect } from "react";
import { FC } from "react";
import Select, { components } from "react-select";
import { Controller } from "react-hook-form";
import "./selectCastom.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../api/dto/types";
import { getTeamsSelect } from "../../modules/interfaseResponse/interfaseResponseThunk";
import { moreOptionsItSelect } from "../../modules/interfaseResponse/interfaseResponseSlice";
import { getPlayerFromSelect } from "../../modules/players/playerThunk";

export const SearchTeam: FC<any> = ({ control, name, setResultSearch }) => {
  const dispatch = useDispatch();
  const selectData = useSelector((state: RootState) => state.interfaceData);

  useEffect(() => {
    dispatch(getTeamsSelect());
  }, [selectData.page, dispatch]);

  const setOptionsForSelect = () => {
    const positionsAll = [];
    for (let team of selectData.data) {
      positionsAll.push({ value: team.id, label: team.name });
    }
    return positionsAll;
  };
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      render={(props) => {
        return (
          <>
            <Select
              isMulti
              isClearable
              className="react-select"
              classNamePrefix="react-select"
              inputRef={props.field.ref}
              options={setOptionsForSelect()}
              components={{ MenuList }}
              openMenuOnClick
              onChange={(e) => {
                setResultSearch(e);
                let blabla = e.map((item) => item.value);
                if (e.length > 0) {
                  dispatch(getPlayerFromSelect(blabla[blabla.length - 1]));
                  console.log(blabla[blabla.length - 1]);
                }
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
  const dispatch = useDispatch();
  const optionsHandler = () => {
    dispatch(moreOptionsItSelect());
  };

  const menuHeaderStyle = {
    padding: "8px 12px",
    color: "black",
  };
  return (
    <components.MenuList {...props}>
      <div
        onClick={optionsHandler}
        className={`next_ten ${teamsCount > 10 ? "" : ""}`}
        style={menuHeaderStyle}
      >
        Show next 10 of {teamsCount}
      </div>
      {props.children}
    </components.MenuList>
  );
};
