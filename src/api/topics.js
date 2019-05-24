import axios from 'axios'

export default {
    get: params  => {
       return axios.get(params).then( response => response.data ) ;
     }
}
