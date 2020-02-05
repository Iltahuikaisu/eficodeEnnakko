import React, {useState} from "react";

var intervalSet = false;
const Timer =  (props) => {
    debugger
    const [timer, setTimer] = useState(props.time)
    const [isTimeGoing, setIsTimeGoing] = useState(false)
    const second = () => {
        console.log('second')
        setTimer(timer - 1000)
    }
    if (!isTimeGoing)  {
        setInterval(second,1000)
        setIsTimeGoing(true)
    }

    return(
        <div>
            {timer}
        </div>
    )
}


export default Timer