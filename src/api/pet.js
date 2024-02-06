import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
// axios default functionality is to send a GET request
export const getAllPets = () => {
    return axios(`${apiUrl}/pets`)
}

// READ -> Show
export const getOnePet = (id) => {
    return axios(`${apiUrl}/pets/${id}`)
}

// CREATE -> Add a pet
// API calls with axios that are not a simple GET, require a config object
// that config object needs a url, method, and any auth headers if necessary
export const createPet = (user, newPet) => {
    return axios({
        url: `${apiUrl}/pets`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { pet: newPet }
    })
}

// UPDATE -> Adjust a pet
export const updatePet = (user, updatedPet) => {
    return axios({
        url: `${apiUrl}/pets/${updatedPet._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { pet: updatedPet }
    })
}

// DELETE -> Set a pet free
export const removePet = (user, id) => {
    return axios({
        url: `${apiUrl}/pets/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}