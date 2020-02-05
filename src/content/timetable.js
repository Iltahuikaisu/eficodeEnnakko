import React, {useState} from "react";
import ApolloClient, {gql} from 'apollo-boost'
import Geo from './geocoding'
import ListOptions from './listtimetables'

const client = new ApolloClient({
    uri:'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'});

const TimetableToEficode = () => {
    const [data, newData] = useState()
    const [startPlaceData, newStartPlaceData] = useState()
    const [destinationPlaceData, newDestinationPlaceData] = useState()
    if (!startPlaceData) {
        newStartPlaceData('loading')
        Geo('Pohjoinen Rautatiekatu, 25').then((respGeo) => {

            newStartPlaceData({lon:respGeo.data.bbox[3], lat:respGeo.data.bbox[2],name:'Eficode'})
        })
    }
    if (!destinationPlaceData) {
        newDestinationPlaceData('loading')
        Geo('Mannerheimintie, 30, Helsinki').then((respGeo) => {
            console.log('response to destination geo')
            console.log(respGeo)
            newDestinationPlaceData({lon:respGeo.data.bbox[3], lat:respGeo.data.bbox[2],name:'Eduskunta'})
        })
    }
    if (destinationPlaceData && startPlaceData) {
        if (destinationPlaceData !=='loading' && startPlaceData !=='loading' && !data) {

            newData('queryStarted')
            console.log('Started query')
            client.query({
                    query: gql`{
        plan(
            from: {lon: ${startPlaceData.lon}, lat: ${startPlaceData.lon}}
        to: {lat: ${destinationPlaceData.lat}, lon: ${destinationPlaceData.lon}}
        numItineraries: 3
    ) {
        itineraries {
            legs {
                to {
                    lat
                    lon
                    name
                    stop {
                        code
                        name
                    }
                }
                from {
                    lat
                    lon
                    name
                    stop {
                        code
                        name
                    }
                }
                startTime
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
                newData(resp)
                console.log(resp)
            })
        }

    }
        if(!data || data === 'queryStarted') {
            return(
                <div>
                    loading
                </div>
            )
        }

        console.log(data)

        console.log(data.data.plan.itineraries)
        return(
            <div>
                <ListOptions listOfItineraries={data.data.plan.itineraries} />
            </div>
        )

}

export default TimetableToEficode