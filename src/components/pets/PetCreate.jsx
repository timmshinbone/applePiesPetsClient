// PetCreate is going to render a form
// this form will build a pet object in state
// once the form has been used to build that object, we can submit it as part of an api request
// that will be a POST request, and an API call function that we import
// we'll want to send success/failure messages
// on success, we want to redirect to the new pet's show page
// upon failure, copmonent should send a message, clear the form, and remain on the same page.
// we'll build a form in another file, that we can use in multiple places
// because our pet create and pet update will use the same form inputs

import { useState } from 'react'

const PetCreate = (props) => {
    // pull out our props
    const { user, msgAlert } = props

    // build our state object
    const [pet, setPet] = useState({
        name: '',
        type: '',
        age: '',
        adoptable: false
    })

    return (
        <h1>Create Pet Component</h1>
    )
}

export default PetCreate