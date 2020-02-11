import React, {useState, useEffect} from "react";
const second = (props) => {
    var startTime = props.dataSetters.data.data.plan.itineraries[0].legs[0].startTime
    console.log(startTime)
    props.setTimer((state)=>{
        if (Math.floor(state/1000) ===-5) {
            props.dataSetters.setTimeIsUp((value)=>{
                return(value+1)
            })
        }
        return(startTime - new Date())
    })
}
var intervalId = 1
const Timer =  (props) => {
    const [timer, setTimer] = useState(props.time)


    useEffect(()=>{
        console.log('setinterval')
        intervalId=setInterval(()=>second({timer:timer, setTimer:setTimer,
            dataSetters:props.dataSetters}),1000)
        return(
            ()=>{
                clearInterval(intervalId)
            }
        )
    },[props.dataSetters.data])

    return(
        <div>
            {Math.floor(Math.abs(timer/(1000*60))) + ":" + (Math.floor(timer/(1000))%60)}
        </div>
    )
}


export default Timer