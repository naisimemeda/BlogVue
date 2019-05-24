import axios from 'axios'

export default {
    UserCreate: data => {
        return axios.post(('http://blogapi.test/api/users'), {
          name:data.name,
          password:data.password
        }).then( response =>
            response.data.data
        )
    }
}
