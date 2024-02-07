import apiUrl from '../apiConfig'
import axios from 'axios'

// Create toy
// POST	/toys/:petId	
export const createToy = (pet, newToy) => {
    return axios({
        url: `${apiUrl}/toys/${pet._id}`,
        method: 'POST',
        data: { toy: newToy }
    })
}

// Update toy
// PATCH	/toys/:petId/:toyId	
export const updateToy = (user, pet, updatedToy) => {
    return axios({
        url: `${apiUrl}/toys/${pet._id}/${updatedToy._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { toy: updatedToy }
    })
}

// Delete toy
// DELETE	/toys/:petId/:toyId	
export const removeToy = (user, petId, toyId) => {
    return axios({
        url: `${apiUrl}/toys/${petId}/${toyId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}