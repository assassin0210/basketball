import at from "../addTeam/addTeams.module.scss";
import React from "react";

export const UpdatePlayer=()=>{
    return(
        <div className={at.container}>
            <div className={at.addTeam_block}>
                <div className={at.headerContainer}>
                    <p>Player <span>/ </span>Add new player</p>
                </div>
               <div>
                   <h2>форма</h2>
               </div>
            </div>
        </div>
    )
}
