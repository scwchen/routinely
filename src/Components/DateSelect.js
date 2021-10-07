import showDate from '../Functions/dateFunctions.js';


const DateSelect = ({ today }) => {

    return (
        // dow stands for dayOfWeek
        showDate(today).map((dow, index) => {
            const dateIndex = `day${index}`;
            // console.log(dow.fullDateString);

            return (
                <div key={dateIndex}>
                    <p>{dow.displayDateString}</p>
                </div>
            );

        })
    )

};

export default DateSelect;