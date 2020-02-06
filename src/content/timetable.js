import React, {useState} from "react";
import ApolloClient, {gql} from 'apollo-boost'
import Geo from './geocoding'
import ListOptions from './listtimetables'
import BusTimer from './busstimer'

const client = new ApolloClient({
    uri:'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'});

const TimetableToEficode = () => {
    const [data, newData] = useState()
    const [startPlaceData, newStartPlaceData] = useState()
    const [destinationPlaceData, newDestinationPlaceData] = useState()
    const [waitTime, newWaitTime] = useState()
    const dataSetters = {newData, newStartPlaceData, newDestinationPlaceData,newWaitTime}
    if (!startPlaceData) {
        newStartPlaceData('loading')
        Geo('Pohjoinen Rautatiekatu 25, Helsinki').then((respGeo) => {
            console.log(respGeo.data.features[0].geometry.coordinates[0])
            newStartPlaceData({
                lon: respGeo.data.features[0].geometry.coordinates[0],
                lat: respGeo.data.features[0].geometry.coordinates[1], name: 'Eficode'
            })

        })
    }
    if (!destinationPlaceData) {
        newDestinationPlaceData('loading')
        Geo('Männikkötie 6, Helsinki').then((respGeo) => {
            console.log('response to destination geo')
            console.log(respGeo.data.features[0].geometry.coordinates[0])
            newDestinationPlaceData({
                lon: respGeo.data.features[0].geometry.coordinates[0]
                , lat: respGeo.data.features[0].geometry.coordinates[1], name: 'Eduskunta'
            })
        })
    }
    if (destinationPlaceData && startPlaceData) {
        if (destinationPlaceData !== 'loading' && startPlaceData !== 'loading' && !data) {
            newData('queryStarted')
            console.log('Started query')
            client.query({
                    query: gql`{
  plan(
    from: {lat: ${startPlaceData.lat}, lon: ${startPlaceData.lon}}
    to: {lat: ${destinationPlaceData.lat}, lon: ${destinationPlaceData.lon}}
    numItineraries: 3
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
                console.log('response to graphQL')
                console.log(resp)
                newWaitTime(resp.data.plan.itineraries[0].legs[0].startTime
                - new Date().getTime())
                newData(resp)
            })

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
                <div>
                    <BusTimer time={waitTime}
                              dataSetters={dataSetters}/>
                </div>
                <div>
                    <ListOptions listOfItineraries={data.data.plan.itineraries}
                                 setWaitTime={newWaitTime}
                                 waitTime={waitTime}
                                 start={startPlaceData}
                                 destination={destinationPlaceData}/>
                </div>
            </>
        )

    }
}

export default TimetableToEficode