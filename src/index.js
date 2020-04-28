document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
})

// when the page loads, render a list of registered dogs
function fetchDogs(){
    const tBody = document.querySelector("tbody")
    tBody.innerHTML = ""            
    //do this to reset the table everytime new fetch call is made, don't duplicate the exisiting table

    fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(dogsArray => {
        dogsArray.forEach(dog => renderDogs(dog, tBody))
    })
}

function renderDogs(dog, tBody){
    console.log("render dogs here!")

    const tRow = document.createElement("tr")
    tRow.id = dog.id
    const nameCell = document.createElement('td')
    const breedCell = document.createElement('td')
    const sexCell = document.createElement('td')
    const buttonCell = document.createElement('td')
    const editButton = document.createElement("button")
    
    nameCell.innerText = dog.name
    breedCell.innerText = dog.breed
    sexCell.innerText = dog.sex
    editButton.innerText = "Edit Dog"

    tBody.append(tRow)
    tRow.append(nameCell,breedCell,sexCell,buttonCell)
    buttonCell.append(editButton)

    editButton.onclick = () => editDog(dog.id, dog.name, dog.breed, dog.sex)
}

function editDog(id, name, breed, sex){
    console.log(id, name, breed, sex )

    const form = document.querySelector("form")
    let nameInput = form.name
    let breedInput = form.breed
    let sexInput = form.sex

    nameInput.value = name
    breedInput.value = breed
    sexInput.value = sex

    form.onsubmit = () => handleSubmit(id, nameInput.value, breedInput.value, sexInput.value, event, form)
}

function handleSubmit(id, name, breed, sex, event, form){
    event.preventDefault()
    console.log(`handle submit here for ${id} ${name} ${breed} ${sex}`)

    const dog = {
        name: name,
        breed: breed,
        sex: sex
    }

    form.reset()

    fetch(`http://localhost:3000/dogs/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accepts: "application/json"
        },
        body: JSON.stringify(dog)
    })
    .then(fetchDogs())

}