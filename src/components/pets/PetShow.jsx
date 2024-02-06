// PETSHOW is our details page. The show page for a single pet
// this is where a LOT of our key functionality will exist
// we'll be building this component over time, as it will be the star component of our app.
// eventually, this is where we will give our pets toys
// this is where we will be able to update and delete them
// this will be rendered by it's own route -> pets/<id>
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOnePet, removePet, updatePet } from '../../api/pet'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import EditPetModal from './EditPetModal'

const PetShow = (props) => {
    const { petId } = useParams()
    const { user, msgAlert } = props

    const [pet, setPet] = useState(null)
    // this determines if the editPetModal is open or not
    const [editModalShow, setEditModalShow] = useState(false)

    // this is a boolean, that we can switch between to trigger a page re-render
    const [updated, setUpdated] = useState(false)

    // this gives us a function we can use to navigate via react-router
    const navigate = useNavigate()

    useEffect(() => {
        getOnePet(petId)
            .then(res => setPet(res.data.pet))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }, [updated])
    
    // this is an api call function, which means we'll need to handle the promise chain.
    // this means sending appropriate messages, as well as navigating upon success
    const setPetFree = () => {
        // we want to remove the pet
        removePet(user, pet._id)
            // display a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.deletePetSuccess,
                    variant: 'success'
                })
            })
            // navigate the user back to the index page(Home)(/)
            .then(() => navigate('/'))
            // if an error occurs, tell the user
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    // if we don't have a pet, show the loading screen
    if (!pet) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className='m-2'>
                <Card>
                    <Card.Header>
                        { pet.fullTitle }
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Age: {pet.age}</small><br/>
                            <small>Type: {pet.type}</small><br/>
                            <small>
                                Adoptable? {pet.adoptable ? 'yes' : 'no'}
                            </small>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {
                            pet.owner && user && pet.owner._id === user._id
                            ?
                            <>
                                <Button
                                    className='m-2'
                                    variant='warning'
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit Pet
                                </Button>
                                <Button
                                    className='m-2'
                                    variant='danger'
                                    onClick={() => setPetFree()}
                                >
                                    Set Pet Free
                                </Button>
                            </>
                            :
                            null
                        }
                        <br/>
                        {
                            pet.owner ? `owner: ${pet.owner.email}` : null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <EditPetModal 
                user={user}
                show={editModalShow}
                updatePet={updatePet}
                msgAlert={msgAlert}
                handleClose={() => setEditModalShow(false)}
                pet={pet}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}

export default PetShow