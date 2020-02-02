import React, {useState} from "react";
import ApolloClient, {gql} from 'apollo-boost'

const client = new ApolloClient({
    uri:'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'});

const TimetableToEficode = () => {
    client.query({
        query:gql`{
        plan(
            from: {lat: 60.168992, lon: 24.932366}
        to: {lat: 60.175294, lon: 24.684855}
        numItineraries: 3
    ) {
        itineraries {
            legs {
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
    }).then((resp)=> {
        console.log(resp)
    } )

    return(
        <div>

        </div>
    )
}

export default TimetableToEficode