// PETSHOW is our details page. The show page for a single pet
// this is where a LOT of our key functionality will exist
// we'll be building this component over time, as it will be the star component of our app.
// eventually, this is where we will give our pets toys
// this is where we will be able to update and delete them
// this will be rendered by it's own route -> pets/<id>
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOnePet } from '../../api/pet'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card } from 'react-bootstrap'

const PetShow = (props) => {
    const { petId } = useParams()
    const { user, msgAlert } = props

    const [pet, setPet] = useState(null)

    useEffect(() => {
        getOnePet(petId)
            .then(res => setPet(res.data.pet))
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'We found the pet!',
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
    }, [])
    console.log('the pet in showPet', pet)
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
                            pet.owner ? `owner: ${pet.owner.email}` : null
                        }
                    </Card.Footer>
                </Card>
            </Container>
        </>
    )
}

export default PetShow