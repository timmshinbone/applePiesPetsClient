// This card will be used to display the toys of a pet.
// the pet's toys array will be mapped, producing one of these components for every toy in the array
import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { removeToy } from '../../api/toy'
import messages from '../shared/AutoDismissAlert/messages'
import EditToyModal from '../toys/EditToyModal'

const ToyShow = (props) => {
    // for the first iteration of this component, we'll only need one prop - the toy
    const { toy, user, pet, triggerRefresh, msgAlert } = props

    // hook used to display/hide our modal
    const [editModalShow, setEditModalShow] = useState(false)

    const setBgCondition = (cond) => {
        // a toy can either be new, used, or disgusting
        if (cond === 'new') {
            return ({width: '18rem', backgroundColor: '#b5ead7'})
        } else if (cond === 'used') {
            return ({width: '18rem', backgroundColor: '#ffdac1'})
        } else {
            return ({width: '18rem', backgroundColor: '#ff9aa2'})
        }
    }

    // the api calling function that destroys a toy
    const destroyToy = () => {
        // we want to remove the toy
        removeToy(user, pet._id, toy._id)
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.deleteToySuccess,
                    variant: 'success'
                })
            })
            // refresh the page
            .then(() => triggerRefresh())
            // if err, send err msg
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className='m-2' style={setBgCondition(toy.condition)}>
                <Card.Header>{toy.name}</Card.Header>
                <Card.Body>
                    <small>{toy.description}</small><br/>
                    <small>{toy.isSqueaky ? 'squeak squeak' : 'stoic silence'}</small>
                </Card.Body>
                <Card.Footer>
                    <small>Condition: {toy.condition}</small><br/>
                    {
                        user && pet.owner && user._id === pet.owner._id
                        ?
                        <>
                            <Button
                                className='m-2'
                                variant='warning'
                                onClick={() => setEditModalShow(true)}
                            >
                                Update Toy
                            </Button>
                            <Button
                                className='m-2'
                                variant='danger'
                                onClick={() => destroyToy()}
                            >
                                Delete Toy
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditToyModal 
                user={user}
                pet={pet}
                toy={toy}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ToyShow