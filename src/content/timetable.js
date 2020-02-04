import React, {useState} from "react";
import ApolloClient, {gql} from 'apollo-boost'
import Geo from './geocoding'
import ListOptions from './listtimetables'

const client = new ApolloClient({
    uri:'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'});

const TimetableToEficode = () => {
    const [data, newData] = useState();
    if (!data) {
        console.log('before data fetch')

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
                newData(resp)
                console.log(resp)
            })

        })
        if(!data) {
            return(
                <div>
                    loading
                </div>
            )
        } else {
            console.log(data)
            return(
                <div>
                    Next bus leaves at
                </div>
            )
        }
    } else {
        console.log(data.data.plan.itineraries)
        return(
            <div>
                <ListOptions listOfItineraries={data.data.plan.itineraries} />
            </div>
        )
    }
}

export default TimetableToEficode