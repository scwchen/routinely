import showDate from '../Functions/dateFunctions.js';

const DateSelect = () => {

    return (
        // dow stands for dayOfWeek
        showDate().map((dow, index) => {
            const dateIndex = `day${index}`;

            return (
                <div className="date-item" key={dateIndex}>
                    <p>{dow.displayDateString.slice(0, 3)} <span>{dow.displayDateString.slice(-2)}</span></p>
                </div>
            );

        })
    )

};

export default DateSelect;