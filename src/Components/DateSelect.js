import showDate from '../Functions/dateFunctions.js';


const DateSelect = ({ selectDate, today }) => {

    return (
        // dow stands for dayOfWeek
        showDate(today).map((dow, index) => {
            const dateIndex = `day${index}`;

            return (
                // <li >
                <p key={dateIndex} onClick={(e) => selectDate(e.target)}>{dow.dateString.slice(0, 3)} {dow.dateString.slice(3)}</p>
                // </li>
            );
        })
    )

};

export default DateSelect;