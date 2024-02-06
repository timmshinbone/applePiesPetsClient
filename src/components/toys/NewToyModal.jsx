// this modal is rendered by the PetShow component
// the state that controls this modal, whether it's open or not, will live in PetShow
// the state, AND the updaterfunction associated with that state is passed here as a prop from PetShow

import React, {useState} from 'react'
import { Modal } from 'react-bootstrap'
import ToyForm from '../shared/ToyForm'
// if we want custom messages, import those here
// we'll need an api call to make this modal work, that'll be imported here

// we'll also need the same props we're passing to the ToyForm, if they come from the parent

const NewToyModal = (props) => {
    const { pet, show, handleClose, msgAlert, triggerRefresh } = props
    // new piece of state, toy, initial value is an empty object
    // we will build this object out, using our handleChange function
    const [toy, setToy] = useState({})

    const onChange = () => {
        console.log('on change')
    }
    
    const onSubmit = () => {
        console.log('on submit')
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