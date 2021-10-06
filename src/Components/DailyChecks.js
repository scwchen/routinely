const DailyChecks = ({ freq }) => {

    const weekArray = [0, 1, 2, 3, 4, 5, 6];


    const changeColor = (e) => {
        e.target.classList.toggle('chosen');
    };

    return (
        weekArray.map((day) => {

            return (
                <button key={`day${day}`} className=
                    {`dailyCheck ${freq.includes(day) ? '' : 'disabled'}`}
                    disabled={freq.includes(day) ? false : true}
                    value={day}
                    onClick={(e) => changeColor(e)}
                ></button>

                // console.log('test');

            )
        })
    );

};

export default DailyChecks;