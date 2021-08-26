import React from "react";
import { useHistory } from "react-router";
import s from "./buttonCancel.module.scss";

export const ButtonCancel = React.memo(() => {
  const history = useHistory();
  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <button onClick={handleGoBack} className={s.gray_button}>
      Cancel
    </button>
  );
});
