import {useState, useEffect} from 'react'
import { getAllPets } from "../api/pet"
import PetsIndex from './pets/PetsIndex'

const Home = (props) => {
	const { msgAlert, user } = props
	// console.log('props in home', props)

	// const [pets, setPets] = useState(null)

	return (
		<>
			<h2>Home Page</h2>
			{/* { user !== null ? <h5>Hello {user.email}</h5> : null }
			{pets == null ? <LoadingScreen /> : <p>{pets[0].name}</p>} */}
			<PetsIndex msgAlert={msgAlert} />
		</>
	)
}

export default Home
