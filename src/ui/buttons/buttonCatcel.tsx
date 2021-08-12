import React from "react";
import {useHistory} from "react-router";




export const ButtonCancel = React.memo( (props) => {
    const history = useHistory()
    const handleGoBack =()=>{
        history.goBack()
    }

    return (
        <button onClick={handleGoBack} className='gray-button'>Cancel</button>



    )
})
