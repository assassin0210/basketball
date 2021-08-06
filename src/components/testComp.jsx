import {useDispatch, useSelector} from "react-redux";
import {decrement, increment} from "../Redux/reducers/testReducer";


export const TestComp=()=>{

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const count= useSelector(state=>state.test.count)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch =useDispatch()
    return(
            <div>
                <p>Счетсик:{count}</p>
                <button onClick={()=>dispatch(increment())}>добавить</button>
                <button onClick={()=>dispatch(decrement())}>отнять</button>
            </div>
    )
}
