import showDate from "../Functions/dateFunctions";

const DailyChecks = (props) => {

    const { freq, completed, routineID, updateRoutine } = props;

    const weekArray = [0, 1, 2, 3, 4, 5, 6];
    const thisWeekDates = showDate().map((weekDate) => weekDate.fullDateString);

    let toBeCompleted = [];

    // Preparing the completed date to be passed back to the database
    const toComplete = (e, routineDate) => {
        e.target.classList.toggle('chosen');

        if (e.target.classList.contains('chosen')) {
            toBeCompleted = [...completed, routineDate];
        } else {
            toBeCompleted = completed.filter((day) => day !== routineDate);
        }

        updateRoutine(toBeCompleted, routineID);
    };

    return (
        weekArray.map((day, index) => {

            return (
                // this nested ternary is pretty nifty to append class names
                <button key={`day${day}${routineID}`} className=
                    {`daily-check ${freq.includes(day) ?
                        (completed.includes(thisWeekDates[index]) ? ' chosen': '') :
                        ' disabled'} 
                    `}
                    disabled={freq.includes(day) ? false : true}
                    value={thisWeekDates[index]}
                    onClick={(e) => toComplete(e, thisWeekDates[index])}
                ></button>
            )
        })
    );

};

export default DailyChecks;