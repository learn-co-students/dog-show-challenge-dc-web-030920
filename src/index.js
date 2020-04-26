document.addEventListener('DOMContentLoaded', () => {
fetchDogs()
})

function fetchDogs(){
    fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(dogs => {
        const table = document.getElementById('table-body')
        table.innerHTML = ""
        dogs.forEach(dog => renderDogs(dog, table))
        })
    
}

function renderDogs(dog, table){
    const row = document.createElement('tr'),
        name = document.createElement('td'),
        breed = document.createElement('td'),
        sex = document.createElement('td'),
        edit = document.createElement('td'),
        editButton = document.createElement('button')
        
    
    table.appendChild(row)
    row.append(name, breed, sex, edit)
    edit.appendChild(editButton)

    name.innerText = dog.name
    breed.innerText = dog.breed
    sex.innerText = dog.sex
    editButton.innerText = "Edit Dog"
    editButton.onclick = () => editDog(dog.name, dog.breed, dog.sex, dog.id)
}

function editDog(dogName, dogBreed, dogSex, dogId){
    const form = document.getElementById("dog-form")
    let name = form.querySelector('input[name="name"]'),
        breed = form.querySelector('input[name="breed"]'),
        sex = form.querySelector('input[name="sex"]')

        name.value = dogName
        breed.value = dogBreed
        sex.value = dogSex

    form.onsubmit = () => submitForm(event, name.value, breed.value, sex.value, dogId, form)
}

function submitForm(event, name, breed, sex, id, form){
    event.preventDefault()
    let dog = {
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
    }).then(fetchDogs())

}
