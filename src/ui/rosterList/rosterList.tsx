import photo from './../../assets/images/bol-bol 1.png'


export const RosterList = () => {
    return (
        <li className='roster_container'>
            <div>
                <span className='one_number'>
                    10
                </span>
                <span className='two_photo'>
                    <img src={photo} alt=""/>
                </span>
                <span className='three_name'>
                    Bol Bol <br/><p>Centerforward</p>
                </span>
            </div>
            <div className='charisma'>
                <span className='four_height'>
                    218 cm
                </span>
                <span className='five_weight'>
                    100 kg
                </span>
                <span className='six_age'>
                    21
                </span>
            </div>
        </li>
    )
}
