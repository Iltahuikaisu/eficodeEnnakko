import React, {useState} from "react";
const second = (props) => {
    console.log('second')
    const decrease = 1000;
    props.setTimer((state)=>{
        if (state <=0) {
             window.location.reload()
        }
        return(state - decrease)
    })
}

const Timer =  (props) => {
    const [timer, setTimer] = useState(props.time)
    const [isTimeGoing, setIsTimeGoing] = useState(false)
    if (!isTimeGoing)  {
        props.dataSetters.newWaitTime(props.time)
        setInterval(()=>second({timer:timer, setTimer:setTimer}),1000)
        setIsTimeGoing(true)
    }

    return(
        <div>
            {Math.floor(timer/(1000*60)) + ":" + (Math.floor(timer/(1000))%60)}
        </div>
    )
}


export default Timer