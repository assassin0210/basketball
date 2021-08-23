import React from "react";
import { NotFoundIcon } from "../../assets/icon/notFoundIcon";
import notF from "./notFound.module.scss";

export const NotFound = React.memo(() => {
  return (
    <div className={notF.container}>
      <div className={notF.wrapper}>
        <NotFoundIcon />
        <h3>Page not found</h3>
        <p>Sorry, we can’t find what you’re looking for</p>
      </div>
    </div>
  );
});
