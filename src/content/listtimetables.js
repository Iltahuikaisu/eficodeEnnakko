import React from 'react'

const SingleRoute = ({route}) => {
    console.log("route from singleroute")
    console.log(route)
    return(
        <>route</>
    )
}

const ListTimetables = ({listOfItineraries}) => {

    if (!listOfItineraries) {
        return(
            <>

            </>
        )
    }
    const listOfTimetables = listOfItineraries.map((route)=> {
        return(<li key = {route.legs[0].startTime}>
            <SingleRoute route = {route.legs}/>
        </li>)

    })
    return(
        <>
        {listOfTimetables}
        </>
    )

}

export default ListTimetables