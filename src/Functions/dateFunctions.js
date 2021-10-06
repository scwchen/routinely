const showDate = (todayDate) => {

    let dayCounter = new Date();

    dayCounter.setDate(todayDate.getDate() - todayDate.getDay());

    const weekdays = [];

    for (let i = 0; i < 7; i++) {
        // formatting to string and removing the year portion of the date
        const dateString = dayCounter.toDateString().slice(0, -5);
        let chosenDate = '';

        if (dayCounter.getDate() === todayDate.getDate()) {
            chosenDate = ' chosenDate';
        }

        weekdays.push({ dateString, chosenDate });

        dayCounter.setDate(dayCounter.getDate() + 1);
    }

    return weekdays;
};

export default showDate;