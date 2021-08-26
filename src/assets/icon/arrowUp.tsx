import React, { FC } from "react";
import s from "./styleForIcons.module.scss";

type PropType = {
  select: boolean;
};

export const ArrowUp: FC<PropType> = React.memo(({ select }) => {
  return (
    <svg
      className={select ? s.rotateIcon : ""}
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.87485 1.00001L5.99485 4.88001L2.11485 1.00001C1.92802 0.812752 1.67437 0.70752 1.40985 0.70752C1.14534 0.70752 0.891685 0.812752 0.704854 1.00001C0.314854 1.39001 0.314854 2.02001 0.704854 2.41001L5.29485 7.00001C5.68485 7.39001 6.31485 7.39001 6.70485 7.00001L11.2949 2.41001C11.6849 2.02001 11.6849 1.39001 11.2949 1.00001C10.9049 0.620005 10.2649 0.610005 9.87485 1.00001Z"
        fill="#9C9C9C"
      />
    </svg>
  );
});
