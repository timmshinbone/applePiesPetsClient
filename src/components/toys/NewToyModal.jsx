// this modal is rendered by the PetShow component
// the state that controls this modal, whether it's open or not, will live in PetShow
// the state, AND the updaterfunction associated with that state is passed here as a prop from PetShow

import React, {useState} from 'react'
import { Modal } from 'react-bootstrap'
import ToyForm from '../shared/ToyForm'
// if we want custom messages, import those here
import messages from '../shared/AutoDismissAlert/messages'
// we'll need an api call to make this modal work, that'll be imported here
import { createToy } from '../../api/toy'

// we'll also need the same props we're passing to the ToyForm, if they come from the parent

const NewToyModal = (props) => {
    const { pet, show, handleClose, msgAlert, triggerRefresh } = props
    // new piece of state, toy, initial value is an empty object
    // we will build this object out, using our handleChange function
    const [toy, setToy] = useState({})

    const onChange = (e) => {
        e.persist()
        setToy(prevToy => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (updatedName === 'isSqueaky' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'isSqueaky' && !e.target.checked) {
                updatedValue = false
            }

            const updatedToy = { [updatedName] : updatedValue }

            return {
                ...prevToy, ...updatedToy
            }
        })
    }
    
    const onSubmit = (e) => {
        e.preventDefault()

        // make our api call
        createToy(pet, toy)
            // then close the modal
            .then(() => handleClose())
            // notify our user that it was a success
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createToySuccess,
                    variant: 'success'
                })
            })
            // refresh the parent page(component)
            .then(() => triggerRefresh())
            .then(() => setToy({}))
            // if error, tell the user
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ToyForm 
                    toy={toy}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading={`Give ${pet.name} a toy!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewToyModal