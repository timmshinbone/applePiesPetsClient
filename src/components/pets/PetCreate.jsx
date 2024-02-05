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
import PetForm from '../shared/PetForm'
import { useNavigate } from 'react-router-dom'
import { createPet } from '../../api/pet'

const PetCreate = (props) => {
    // pull out our props
    const { user, msgAlert } = props

    const navigate = useNavigate()
    // build our state object
    const [pet, setPet] = useState({
        name: '',
        type: '',
        age: '',
        adoptable: false
    })

    const onChange = (e) => {
        // e is the placeholder for the event
        // e.persist is bc react uses the virtual dom, we want our form data to persist every time the page renders. Which will be a lot of times.
        e.persist()

        // if you pass an argument to the callback function of your state hook updater, that argument is a placeholder for the most recent state, this will maintain anything that you have typed before the next letter
        setPet(prevPet => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // the above two items work great for strings
            // however, we need to handle numbers and booleans as well
            if (e.target.type === 'number') {
                // if the target is a number, parst integers from the value
                updatedValue = parseInt(e.target.value)
            }

            // to handle our checkbox, we need to tell it when to send true and when to send false. Because the default values for a checkbox are 'checked' or 'unchecked', we need to convert those to the appropriate boolean value
            if (updatedName === 'adoptable' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'adoptable' && !e.target.checked) {
                updatedValue = false
            }

            // this will actually buiild our pet object
            // we grab an attribute name, and assign the respective value
            const updatedPet = { [updatedName] : updatedValue }

            // to keep all the old stuff, and add newly typed letter/numbers etc
            return {
                ...prevPet, ...updatedPet
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        createPet(user, pet)
            .then(res => { navigate(`/pets/${res.data.pet.id}`)})
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'Created the pet!',
                    variant: 'success'
                })
            })
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: 'Something went wrong',
                    variant: 'danger'
                })
            })
    }

    console.log('the pet inside create', pet)
    return (
        <PetForm
            pet={pet}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new pet!"
        />
    )
}

export default PetCreate