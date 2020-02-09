import React, {useState, useEffect} from "react";
const second = (props) => {
    const decrease = 1000;

    props.setTimer((state)=>{
        if (state <=-5000) {
            alert('you should run now')
             window.location.reload()
        }
        return(state - decrease)
    })
}

const Timer =  (props) => {
    const [timer, setTimer] = useState(props.time)
    var intervalId = 1
    useEffect(()=>{
        intervalId=setInterval(()=>second({timer:timer, setTimer:setTimer}),1000)
        return(
            ()=>{
                clearInterval(intervalId)
            }
        )
    },[intervalId])


    return(
        <div>
            {Math.floor(Math.abs(timer/(1000*60))) + ":" + (Math.floor(timer/(1000))%60)}
        </div>
    )
}


export default Timer