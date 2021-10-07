const DailyChecks = ({ freq, completed }) => {

    const weekArray = [0, 1, 2, 3, 4, 5, 6];


    const completeRoutine = (e) => {
        e.target.classList.toggle('chosen');
    };

    return (
        weekArray.map((day) => {

            // ${completed.includes()}
            return (
                <button key={`day${day}`} className=
                    {`dailyCheck ${freq.includes(day) ? '' : 'disabled'} `}
                    disabled={freq.includes(day) ? false : true}
                    value={day}
                    onClick={(e) => completeRoutine(e)}
                ></button>

// add in so that it adds the date to the state and then to the completed 

// setCompleted ([...routine.completed, dateString])

            )
        })
    );

};

export default DailyChecks;