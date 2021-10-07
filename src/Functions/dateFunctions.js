const showDate = (todayDate) => {

    let dayCounter = new Date();

    dayCounter.setDate(todayDate.getDate() - todayDate.getDay());

    const weekdays = [];

    for (let i = 0; i < 7; i++) {
        // formatting to string and removing the year portion of the date
        const dateYear = dayCounter.getFullYear();
        const dateMonth = (dayCounter.getMonth()+1).toString().padStart(2, '0');
        const dateDay = dayCounter.getDate().toString().padStart(2, '0');
        const fullDateString = `${dateYear}-${dateMonth}-${dateDay}`;

        let newDate = new Date (fullDateString);
        newDate.setDate(newDate.getDate() + 1);
        const displayDateStrings = newDate.toDateString().split(' ');
        const displayDateString = displayDateStrings[0] + ' ' + displayDateStrings[2];

        weekdays.push({fullDateString, displayDateString});

        dayCounter.setDate(dayCounter.getDate() + 1);
    }

    return weekdays;
};

export default showDate;