import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const  CalendarUi =()=> {
    const [value, setValue] = useState(new Date());

    const  onChange=(value:any)=> {
        setValue(value.toLocaleDateString());
    }

    console.log(value.toLocaleDateString())
    return (
        <Calendar
            allowPartialRange
            onChange={onChange}
            value={value}

        />
    );
}
