// import { useEffect, useState } from 'react';


const DateSelect = ({selectDate, showDate}) => {

    return (
        // dow stands for dayOfWeek
        showDate().map((dow, index) => {
            const dateIndex = `day${index}`;

            return (
                <li key={dateIndex} onClick={(e) => selectDate(e.target)}>
                    <p>{dow.dateString.slice(0, 3)} {dow.dateString.slice(3)}</p>
                </li>
            );
        })
    )

};

export default DateSelect;