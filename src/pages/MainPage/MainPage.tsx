

export const MainPage=(props:any)=>{
    return(
        <div>
            <h1>Header</h1>
            <div>menu left</div>
            <div>{props.children}</div>
        </div>
    )
}
