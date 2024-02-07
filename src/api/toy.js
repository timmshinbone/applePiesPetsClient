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

// Delete toy
// DELETE	/toys/:petId/:toyId	