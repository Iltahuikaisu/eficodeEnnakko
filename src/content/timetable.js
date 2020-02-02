import React, {useState} from "react";
import ApolloClient, {gql} from 'apollo-boost'
import Geo from './geocoding'

const client = new ApolloClient({
    uri:'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'});

const TimetableToEficode = () => {
    Geo(' Pohjoinen Rautatiekatu, 25').then((respGeo) => {
        client.query({
                query: gql`{
        plan(
            from: {lon: ${respGeo.data.bbox[2]}, lat: ${respGeo.data.bbox[3]}}
        to: {lat: 60.175294, lon: 24.684855}
        numItineraries: 3
    ) {
        itineraries {
            legs {
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
            console.log(resp)
        })
    })



    return(
        <div>

        </div>
    )
}

export default TimetableToEficode