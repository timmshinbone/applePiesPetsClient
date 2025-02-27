# Apple Pies Pets Client
>Consumes the [Apple Pies Pets API found here](https://github.com/timmshinbone/applePiePetsAPI)

A React-based frontend application for managing virtual pets, built with JavaScript and consuming the [Apple Pie Pets API](https://github.com/timmshinbone/applePiePetsAPI). This client leverages Object-Oriented Programming (OOP) and Model-View-Controller (MVC) principles to deliver an interactive, user-friendly experience.

## Project Overview
This app allows users to:
- View, create, and update pet profiles.
- Create, Read, Update and Delete pets and their respective toys.
- Interact with pet data fetched from the backend API.
- Enjoy a responsive UI deployed live at [https://applepiespets.netlify.app/](https://applepiespets.netlify.app/).

Built with React, it integrates API consumption to bring pet management to life in the browser.

## OOP Highlights in JavaScript
JavaScript’s flexibility shines in this project through OOP principles:

#### Encapsulation
- **Components as Objects**: React components like `PetList` and `PetForm` encapsulate their state and behavior. For example:
```js
class PetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', species: '' };
    }
    handleSubmit() {
        // Encapsulated logic for form submission
    }
}
```
Logic for form handling and API calls is bundled within each component, keeping data and methods together.

#### Inheritance
- **React Component Hierarchy:** Components inherit from `React.Component`, gaining lifecycle methods and state management:
```javascript
class PetList extends React.Component {
    render() {
        return <div>{this.props.pets.map(pet => <Pet key={pet.id} {...pet} />)}</div>;
    }
}
```
This reduces code duplication by reusing React’s base functionality.

#### Polymorphism
- **Dynamic Rendering:** The Pet component adapts its display based on passed props, using the same interface for different pet types:
```javascript
const Pet = ({ name, species }) => <li>{name} ({species})</li>;
```
A single component handles multiple pet representations, showcasing polymorphic behavior.

#### Abstraction
- **API Service Layer**: The `src/api/pets.js` file defines a set of utility functions that abstract all interactions with the [Apple Pie Pets API](https://github.com/timmshinbone/applePiePetsAPI). This module encapsulates HTTP requests using Axios, providing a clean interface for the React components.
Here’s an example of its built-in functions:
```javascript
// src/api/pets.js
import axios from 'axios';
const apiUrl = 'https://avocadospetsapi.fly.dev';

// READ -> Index: Fetch all pets
export const getAllPets = () => {
    return axios(`${apiUrl}/pets`); // Axios defaults to GET
};

// CREATE: Add a new pet
export const createPet = (petData) => {
    return axios.post(`${apiUrl}/pets`, petData);
};

// READ -> Show: Fetch a single pet by ID
export const getPetById = (id) => {
    return axios(`${apiUrl}/pets/${id}`);
};
```

**How It Works:** These functions (`getAllPets`, `createPet`, `getPetById`, etc.) hide the complexity of HTTP requests, headers, and URL construction. Components call `getAllPets()` or `createPet(petData)` without needing to manage Axios directly, abstracting away the underlying fetch logic. This separation simplifies the codebase and enhances reusability across the app.

---

### MVC Principles
This client follows a loose MVC structure adapted for React:

**Model:** Managed via API data and local state. The ApiService fetches pet data from the Apple Pie Pets API, serving as the data layer.
**View:** React components (PetList, PetForm) render the UI, displaying pets and forms dynamically.
**Controller:** Event handlers in components (e.g., handleSubmit) act as controllers, updating state and triggering API calls.

---

### Deployment
The app is live at <a href="https://applepiespets.netlify.app/" target="_blank">https://applepiespets.netlify.app/</a>, hosted on Netlify. It uses Netlify’s static hosting to serve the React build, with API requests proxied to the backend.

#### Running Locally:
>API functionality will not work without running a local instance of the API at ` http://localhost:8000/ `

**Clone the repo:** `git clone https://github.com/timmshinbone/applePiesPetsClient.git`
**Install dependencies:** `npm install`
**Start the app:** `npm start`

---

Explore the live version <a href="https://applepiespets.netlify.app/" target="_blank">here</a>!