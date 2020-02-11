import axios from 'axios'


const Geocoding = (address) => {
    return(axios.get(`https://api.digitransit.fi/geocoding/v1/search?text=${address}&sources=oa`)
    )
}

export default Geocoding