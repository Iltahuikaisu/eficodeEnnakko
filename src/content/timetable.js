import React, {useEffect, useState} from "react";
import ApolloClient, {gql} from 'apollo-boost'
import Geo from './geocoding'
import ListOptions from './listtimetables'
import BusTimer from './busstimer'

const client = new ApolloClient({
    uri:'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'});

const reverseRoute = (props) => {
    props.dataSetters.setRouteAddresses((value)=> {
        return (
            {
                start: {address: value.end.address, name: value.end.name},
                end: {address: value.start.address, name: value.start.name}
            }
        )
    })
    props.dataSetters.newStartPlaceData( undefined)
    props.dataSetters.newEndPlaceData(undefined)
    props.dataSetters.newData(undefined)
}
const setNewRoute = (props) => {
    props.dataSetters.setRouteAddresses((value)=> {
        if ( props.dataSetters.routeAddresses.start.name ==='Eficode') {
            return (
                {
                    end: {address:  props.dataSetters.newDestination, name:  props.dataSetters.newDestination},
                    start: {address: value.start.address, name: value.start.name}
                }
            )
        } else {
            return(
                {
                    start:{address:  props.dataSetters.newDestination, name:  props.dataSetters.newDestination},
                    end:{address: value.start.address, name: value.start.name}
                }
            )
        }

    })
    props.dataSetters.newStartPlaceData( undefined)
    props.dataSetters.newEndPlaceData(undefined)
    props.dataSetters.newData(undefined)

}

const TimetableToEficode = () => {
    const [data, newData] = useState()
    const [startPlaceData, newStartPlaceData] = useState()
    const [endPlaceData, newEndPlaceData] = useState()
    const [waitTime, newWaitTime] = useState()
    const [newDestination, setNewDestination] = useState()
    const [isErrorInInput, setErrorInInput] = useState(false)
    const [routeAddresses, setRouteAddresses] = useState(
        {start:{address:'Pohjoinen Rautatiekatu 25, Helsinki',name:'Eficode'},
                    end:{address:'Männikkötie 6, Helsinki',name:'Maunulan kotipizza'}})
    const dataSetters = {newData, newStartPlaceData, newDestinationPlaceData: newEndPlaceData,
        newWaitTime,setRouteAddresses,newDestination,routeAddresses,newEndPlaceData}


    useEffect(()=>{
        if(startPlaceData && endPlaceData) {
            if (startPlaceData !== 'loading' && endPlaceData !== 'loading') {
                client.query({
                        query: gql`{
  plan(
    from: {lat: ${startPlaceData.lat}, lon: ${startPlaceData.lon}}
    to: {lat: ${endPlaceData.lat}, lon: ${endPlaceData.lon}}
    numItineraries: 5
  ) {
    itineraries {
      legs {
        startTime
        from {
            name
        }
        to {
            name
        }
        agency {
            name
        }
        route {
            shortName
            longName
        }
        endTime
        mode
        duration
        realTime
        distance
        transitLeg
      }
    }
  }
}`

                    }
                ).then((resp) => {
                    if (resp.data.plan.itineraries[0]) {

                        newWaitTime(resp.data.plan.itineraries[0].legs[0].startTime
                            - new Date().getTime())
                        setErrorInInput(false)
                    } else {
                        setErrorInInput(true)
                    }

                    newData(resp)
                })
            }
        }


    },[startPlaceData,endPlaceData])

    useEffect(() => {
        newStartPlaceData('loading')
        newEndPlaceData('loading')
        Geo(routeAddresses.start.address).then((respGeo) => {
            var name
            if (routeAddresses.start.address === 'Pohjoinen Rautatiekatu 25, Helsinki') {
                name = 'Eficode'
            } else {
                name = respGeo.data.features[0].properties.name
            }

            newStartPlaceData({
                lon: respGeo.data.features[0].geometry.coordinates[0],
                lat: respGeo.data.features[0].geometry.coordinates[1], name: name
                    })

                })

            newEndPlaceData('loading')
        Geo(routeAddresses.end.address).then((respGeo) => {
            var name
            if (routeAddresses.end.address === 'Pohjoinen Rautatiekatu 25, Helsinki') {
                name = 'Eficode'
            } else {
                name = respGeo.data.features[0].properties.name
            }
            newEndPlaceData({
                lon: respGeo.data.features[0].geometry.coordinates[0]
                , lat: respGeo.data.features[0].geometry.coordinates[1], name: name
                    })
        })
        },[routeAddresses]
    )
    if(isErrorInInput) {
        return(
            <div>
                <h3>Change the non-Eficode destination</h3>
                <form>
                    <input onChange={(event)=> {
                        setNewDestination(event.target.value)}}/>
                    <button onClick={(event)=>{
                        event.preventDefault()
                        setNewRoute({dataSetters:dataSetters})}}>Submit</button>
                    <div>{newDestination}</div>
                    <h3>Error in input, try again</h3>
                    <p>
                        Working formula is
                        'Nameoftheroad 42, Helsinki'
                        Please don't ask route to places
                        HSL will not take you.

                    </p>
                </form>
            </div>
        )
    }
    if (!data || data === 'queryStarted') {
        return (
            <div>
                loading
            </div>
        )
    }
        return (
            <>
                <h3>Change the non-Eficode destination</h3>
                <form>
                    <input onChange={(event)=> {

                        setNewDestination(event.target.value)}}/>
                    <button onClick={()=>setNewRoute({dataSetters:dataSetters})}>Submit</button>

                </form>
                <div>
                    <h3>Reverse the route</h3>
                    <button onClick={()=>reverseRoute({dataSetters:dataSetters})}>Change</button>
                    <h3>{`Timetables from ${startPlaceData.name} to ${endPlaceData.name}`}</h3>
                    <BusTimer time={waitTime}
                              dataSetters={dataSetters}/>
                </div>
                <div>
                    <ListOptions listOfItineraries={data.data.plan.itineraries}
                                 setWaitTime={newWaitTime}
                                 waitTime={waitTime}
                                 start={startPlaceData}
                                 destination={endPlaceData}/>
                </div>
            </>
        )

    }




export default TimetableToEficode