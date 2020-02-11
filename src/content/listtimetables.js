import React from 'react'

const SingleRoute = (props) => {
    var route = props.route
    const destination = props.destination

    const routeInReadableForm = route.reduce((acc, current)=> {
        var startTime = new Date(current.startTime).toLocaleTimeString(undefined,{
            hourCycle:"h24", timeStyle:"short", hour:"2-digit", minute:"2-digit"
               })
        var endTime = new Date(current.endTime).toLocaleTimeString(undefined,{
            hourCycle:"h24", timeStyle:"short", hour:"2-digit", minute:"2-digit"
        })
        var endPoint
        var startPoint
        var modeOfTransit
        if (current.route) {
            modeOfTransit = current.mode.toLowerCase() + " " + current.route.shortName
        } else {
            modeOfTransit = "walk"
        }
        if (current.from.name ==="Origin") {
            startPoint = "Eficode"
        } else {
            startPoint = current.from.name
        }
        if (current.to.name ==="Destination") {
            endPoint = "Destination"
        } else {
            endPoint = current.to.name
        }
        if (startPoint ==="Eficode" && endPoint==="Destination") {
            return(
                "Leave by " + startTime + " and walk to " + destination.name + ". Arrival at " + endTime
            )
        }
        if (startPoint === "Eficode") {
            return("Leave by " + startTime
                + " and walk to " + endPoint + " then ")
        }
        if (endPoint === "Destination") {
            return(acc + " walk to destination. Arrival at " + endTime )
        }
        return(acc  + ' to ' + endPoint + ' by ' + modeOfTransit + ', then ')
    },'')
    return(
        <>{routeInReadableForm}</>
    )
}

const ListTimetables = ({listOfItineraries,start,destination}) => {

    if (!listOfItineraries) {
        return(
            <>

            </>
        )
    }
    const listOfTimetables = listOfItineraries.map((route)=> {
        return(<li key = {route.legs[0].startTime}>
            <SingleRoute route = {route.legs} destination = {destination} start = {start}/>
        </li>)

    })
    return(
        <>
        {listOfTimetables}
        </>
    )

}

export default ListTimetables