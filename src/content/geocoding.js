import axios from 'axios'


const Geocoding = (address) => {
    return(axios.get(`http://api.digitransit.fi/geocoding/v1/search?text=${address}`)
    )
}

export default Geocoding