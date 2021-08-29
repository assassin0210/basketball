export const stylesForSelect = {
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: "0.5px solid #D1D1D1",
    color: [
      state.isSelected ? "var(--red)" : "var(--lightGrey)",
      state.isFocused ? "var(--white)" : "var(--lightGrey)",
    ],
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 500,
    padding: 12,
    backgroundColor: [state.isFocused ? "var(--red)" : "var(--white)"],
    ":active": {
      ...state[":active"],
      backgroundColor: "var(--darkRed)",
    },
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    borderBottom: "0.5px solid #D1D1D1",
    color: state.isSelected ? "red" : "var(--lightGrey)",
    backgroundColor: "none",
  }),
  menuList: (provided: any, state: any) => ({
    ...provided,
    borderRadius: "5px",
    padding: 0,
    backgroundColor: "var(--white)",
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    border: state.isSelected
      ? "0.5px solid var(--lightestGrey1)"
      : "0.5px solid var(--lightestGrey)",
    boxShadow: state.isFocused
      ? "0,0,1px var(--lightestGrey1)"
      : "0,0,1px var(--lightestGrey)",
    "&:hover": {
      border: state.isFocused
        ? "0.5px solid var(--lightestGrey)"
        : "0.5px solid var(--lightestGrey)",
    },
    backgroundColor: state.isFocused ? "var(--lightestGrey1)" : "var(--white)",
    minHeight: 30,
    minWidth: 351,
  }),
  container: (provided: any, state: any) => ({
    ...provided,
    width: 351,
    height: 40,
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: "0px 6px",
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    padding: 4,
  }),
  clearIndicator: (base: any) => ({
    ...base,
    padding: 4,
  }),
  input: (base: any) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),
  multiValue: (base: any) => ({
    ...base,
    color: "var(--white)",
    backgroundColor: "var(--red)",
    padding: 3,
    borderRadius: 4,
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    backgroundColor: "var(--red)",
    color: "var(--white)",
  }),
  multiValueRemove: (base: any, state: any) => ({
    ...base,
    backgroundColor: "var(--red)",
    color: "var(--white)",
    padding: 4,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "var(--red)",
      color: "var(--white)",
    },
    "&:active": {
      color: "var(--lightRed)",
    },
  }),
};
export const menuHeaderStyle = {
  padding: "8px 12px",
  color: "black",
  margin: "0",
};
