import pre from "./preloader.module.scss";

export const Preloader = () => {
  return (
    <div className={pre.preloader_container}>
      <div className={pre.preloader}></div>
    </div>
  );
};
