document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
})

function fetchDogs() {
    fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(dogsArray => dogsArray.forEach(dog => renderDog(dog)))
}

function renderDog(dog) {
    const table = document.querySelector('#table-body')
    const row = document.createElement('tr')
    const name = document.createElement('td')
    name.innerText = dog.name
    const breed = document.createElement('td')
    breed.innerText = dog.breed
    const sex = document.createElement('td')
    sex.innerText = dog.sex 
    const buttonTd = document.createElement('td')
    const buttonEdit = document.createElement('button')
    buttonEdit.innerText = "Edit"
    buttonEdit.addEventListener('click', () => editForm(dog))
    buttonTd.append(buttonEdit)
    table.append(row)
    row.append(name, breed, sex, buttonTd)
}

function editForm(dog) {
    const formNode = document.querySelector('#dog-form')
    const formfields = formNode.children
    formfields[0].value = dog.name
    formfields[1].value = dog.breed
    formfields[2].value = dog.sex   
    formNode.addEventListener('submit', () => editDog(event, dog))
}

function editDog(event, dog){ 
    event.preventDefault()
    const formNode = document.querySelector('#dog-form')
    const name = formNode.children[0].value
    const breed = formNode.children[1].value
    const sex = formNode.children[2].value
    body = {
        name: name,
        breed: breed,
        sex: sex
    }
    fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(body)
    }).then(response => response.json())
    .then(reRenderDogs())
}

function reRenderDogs(){
    const table = document.querySelector('#table-body')
    table.innerHTML = ""
    fetchDogs()
}