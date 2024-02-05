import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
// axios default functionality is to send a GET request
export const getAllPets = () => {
    return axios(`${apiUrl}/pets`)
}

// READ -> Show
// CREATE -> Add a pet
// UPDATE -> Adjust a pet
// DELETE -> Set a pet free