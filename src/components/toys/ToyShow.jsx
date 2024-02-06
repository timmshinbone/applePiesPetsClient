// This card will be used to display the toys of a pet.
// the pet's toys array will be mapped, producing one of these components for every toy in the array
import { Card, Button } from 'react-bootstrap'

const ToyShow = (props) => {
    // for the first iteration of this component, we'll only need one prop - the toy
    const { toy } = props

    return (
        <>
            <Card className='m-2'>
                <Card.Header>{toy.name}</Card.Header>
                <Card.Body>
                    <small>{toy.description}</small>
                    <small>{toy.isSqueaky ? 'squeak squeak' : 'stoic silence'}</small>
                </Card.Body>
                <Card.Footer>
                    <small>Condition: {toy.condition}</small>
                </Card.Footer>
            </Card>        
        </>
    )
}

export default ToyShow