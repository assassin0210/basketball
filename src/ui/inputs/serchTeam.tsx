import React, {useEffect, useState} from "react";
import at from "../../pages/allTeams/allTeams.module.scss";
import {FC} from "react";
import Select, {components} from "react-select";
import {Controller} from "react-hook-form";
import "./selectCastom.css";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../api/dto/types";
import {getTeamsSelect} from "../../modules/interfaseResponse/interfaseResponseThunk";
import {moreOptionsItSelect} from "../../modules/interfaseResponse/interfaseResponseSlice";
import {getPlayerFromSelect} from "../../modules/players/playerThunk";
import {menuHeaderStyle, stylesForSelect} from "../../assets/styles/styles";
import {ClearIndicatorCustom} from "../../assets/icon/clearIndicator";
import {clearIndicatorCust} from "../../modules/players/playerSlice";
import {SelectComponentsProps} from "react-select/base";
import {useMemo} from "react";

export const SearchTeam: FC<SelectComponentsProps> = ({
                                                          control,
                                                          name,
                                                          setResultSearch,
                                                      }) => {
    const dispatch = useDispatch();
    const selectData = useSelector((state: RootState) => state.interfaceData);
    const teams = useSelector((state: RootState) => state.teams.data);
    const setOptionsForSelect = () => {
        const positionsAll = [];
        for (let team of selectData.data) {
            positionsAll.push({
                value: team.id,
                label: team.name,
                src: "https://cdn-icons.flaticon.com/png/512/5818/premium/5818467.png?token=exp=1634714740~hmac=33bb6a6cb034267ab3ddc95347b10af3"
            });
        }
        return positionsAll;
    };


    const tests = useMemo(
        () =>
            teams.map((team, index) => ({
                value: team.id,
                label: team.name,
                src: `${index}.png`
            })),
        [teams],
    );
    console.log(tests)


    useEffect(() => {
        dispatch(getTeamsSelect());
    }, [selectData.page, dispatch]);

    return (
        <Controller
            control={control}
            name={name}
            rules={{required: true}}
            render={(props) => {
                return (
                    <>
                        <Select
                            styles={stylesForSelect}
                            ClearIndicator
                            isMulti
                            isClearable
                            inputRef={props.field.ref}
                            options={tests}
                            components={{MenuList, ClearIndicator, Option: CustomOption}}
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
    const [count, setCount] = useState(teamsCount);
    const selectSize = useSelector(
        (state: RootState) => state.interfaceData.size
    );
    const dispatch = useDispatch();
    const optionsHandler = () => {
        setCount(count - 10);
        dispatch(moreOptionsItSelect());
    };

    return (
        <components.MenuList {...props}>
            <div
                onClick={optionsHandler}
                className={`${at.next_ten} ${count > 10 ? "" : at.displayNone}`}
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
                <div onMouseDown={clearIndicatorHandler} className={at.clearIndicator}>
                    <ClearIndicatorCustom/>
                </div>
            </components.ClearIndicator>
        </div>
    );
};

const CustomOption = ({innerRef, innerProps, ...rest}: any) => {
    return (<div className={at.wrapperImg} ref={innerRef} {...innerProps}><img className={at.image}
                                                                               src={`${rest.data.src}`}
                                                                               alt=""/><p>{rest.data.label}</p></div>)
}
