// this modal is rendered by the ToyShow component
// the state that controls the modal, whether the modal is open or not, will live in the ToyShow component(this modal's parent component)
// the state AND the updaterFunction associated with that state, will be passed here as a prop.

// we'll also use an instance of our reusable ToyForm
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ToyForm from '../shared/ToyForm'
import messages from '../shared/AutoDismissAlert/messages'
import { updateToy } from '../../api/toy'

const EditToyModal = (props) => {
    const { user, show, handleClose, msgAlert, triggerRefresh, pet } = props
    // we're bringing in the toy from props, but only for the initial state
    // by using the original toy as our initial state for a NEW piece of state, specific to this component (called toy), we'll be able to modify the toy we are updating without affecting the original state in the parent component
    const [toy, setToy] = useState(props.toy)

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
        // make the API call
        updateToy(user, pet, toy)
            // close the modal
            .then(() => handleClose())
            // message the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateToySuccess,
                    variant: 'success'
                })
            })
            // trigger a refresh
            .then(() => triggerRefresh())
            // send error message if applicable
            .catch(() => {
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
                    heading="Update Toy"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditToyModal