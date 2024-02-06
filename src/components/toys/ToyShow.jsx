// This card will be used to display the toys of a pet.
// the pet's toys array will be mapped, producing one of these components for every toy in the array
import { Card, Button } from 'react-bootstrap'

const ToyShow = (props) => {
    // for the first iteration of this component, we'll only need one prop - the toy
    const { toy } = props

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

    return (
        <>
            <Card className='m-2' style={setBgCondition(toy.condition)}>
                <Card.Header>{toy.name}</Card.Header>
                <Card.Body>
                    <small>{toy.description}</small><br/>
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