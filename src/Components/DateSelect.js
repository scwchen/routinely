
const today = new Date;

const showDate = () => {

    let dayCounter = new Date;

    dayCounter.setDate(today.getDate() - today.getDay());

    const weekdays = [];

    for (let i = 0; i < 7; i++) {
        // formatting to string and removing the year portion of the date
        const dateString = dayCounter.toDateString().slice(0, -5);
        let chosenDate = '';

        if (dayCounter.getDate() === today.getDate()) {
            chosenDate = ' chosenDate';
        }

        weekdays.push({ dateString, chosenDate });

        dayCounter.setDate(dayCounter.getDate() + 1);
    }

    return weekdays;
};

const selectDate = (selectedDate) => {
    console.log(selectedDate.target.classList.contains('chosenDate'));
    console.log(selectedDate.target.classList);
};

const DateSelect = () => {
    return (
        showDate().map((dayOfWeek, index) => {

            return (
                <li key={`day` + index} >
                    <button className={`dateContainer` + dayOfWeek.chosenDate}
                        onClick={(e) => selectDate(e)}>
                        {dayOfWeek.dateString.slice(0, 3)}
                        <span>{dayOfWeek.dateString.slice(3)}</span>
                    </button>
                </li>
            );
        })
    )

};


export default DateSelect;