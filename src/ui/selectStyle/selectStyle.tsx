import {XSelect} from "../../assets/icon/xSelect";
import {ArrowSelect} from "../../assets/icon/arrowSelect";
import ss from './selectStyle.module.scss'


export const SelectStyle = () => {
    return (
        <div className={ss.container}>
            <XSelect/>
            <div></div>
            <ArrowSelect/>
        </div>
    )
}
