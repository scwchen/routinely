const showDate = () => {

    let today = new Date ();
    let dayCounter = new Date();

    dayCounter.setDate(today.getDate() - today.getDay());

    const weekdays = [];

    // since the days in a week never change a simple for loop is fine
    for (let i = 0; i <= 6; i++) {
        
        // Getting a full date string in the format to add to Firebase
        const dateYear = dayCounter.getFullYear();
        const dateMonth = (dayCounter.getMonth()+1).toString().padStart(2, '0');
        const dateDay = dayCounter.getDate().toString().padStart(2, '0');
        const fullDateString = `${dateYear}-${dateMonth}-${dateDay}`;

        // formatting to string and removing the year and month portion of the date
        let newDate = new Date (fullDateString);
        newDate.setDate(newDate.getDate() + 1);
        const displayDateStrings = newDate.toDateString().split(' ');
        const displayDateString = displayDateStrings[0] + ' ' + displayDateStrings[2];

        // sending perhaps extraneous data but it can be used in more than one instance in this case
        weekdays.push({fullDateString, displayDateString});

        dayCounter.setDate(dayCounter.getDate() + 1);
    }

    return weekdays;
};

export default showDate;