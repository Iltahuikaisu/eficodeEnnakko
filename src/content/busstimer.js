import React, {useState, useEffect} from "react";
const second = (props) => {
    const decrease = 1000;

    props.setTimer((state)=>{
        if (Math.floor(state/1000) ===-5) {
            console.log(state)
            props.dataSetters.setTimeIsUp((value)=>{
                return(value+1)
            })
        }
        return(state - decrease)
    })
}

const Timer =  (props) => {
    const [timer, setTimer] = useState(props.time)
    var intervalId = 1

    useEffect(()=>{
        setTimer(props.time)
        intervalId=setInterval(()=>second({timer:timer, setTimer:setTimer,
            dataSetters:props.dataSetters}),1000)
        return(
            ()=>{
                clearInterval(intervalId)
            }
        )
    },[intervalId, props.dataSetters.timeIsUp])


    return(
        <div>
            {Math.floor(Math.abs(timer/(1000*60))) + ":" + (Math.floor(timer/(1000))%60)}
        </div>
    )
}


export default Timer