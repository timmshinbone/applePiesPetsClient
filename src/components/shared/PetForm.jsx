// this form will take several props, and will be used by PetCreate as well as PetUpdate
// the action will be dependent upon the parent component(update or create)
// but the form itself, will look the same on both pages
import { Form, Button, Container } from 'react-bootstrap'

const PetForm = (props) => {
    // we need several specific props to make this pet form reusable
    // we need the object itself (a pet), a handleChange, and a handleSubmit
    // those functions will be determined by the parent component and passed to the form as a prop.
    // we'll also add a custom heading to the form, that will change depending on the parent
    const { pet, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control 
                        placeholder="What is your pet's name?"
                        id="name"
                        name="name"
                        value={ pet.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Type: </Form.Label>
                    <Form.Control 
                        placeholder="What is your pet's type?"
                        id="type"
                        name="type"
                        value={ pet.type }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Age: </Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="How old is your pet?"
                        id="age"
                        name="age"
                        value={ pet.age }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Check 
                        label="Is this pet adoptable?"
                        name="adoptable"
                        defaultChecked={ pet.adoptable }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default PetForm 