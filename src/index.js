document.addEventListener('DOMContentLoaded', () => {
  
fetchDogs()
//these two lines are for the submitForm function we got the form and we add anevent listener to it

})

function fetchDogs(){
    const url = "http://localhost:3000/dogs"
    fetch(url)
    .then(response => response.json())
    // .then(data => console.log(data)) when u first fetching try to console.log  to see if u are getting ur object data in the console
    .then(dogsArray => dogsArray.forEach(dog => renderRow(dog)))
}

function renderRow(dog){// we have to add a table row so look at the html and target the tbody tag

    let tbody = document.getElementById("table-body")
    // after getting tbody lets build the row 
    // table row
    let trow = document.createElement("tr")
    // Dog Name td
    let tdName = document.createElement("td")
    tdName.innerText = dog.name //first we had "*Dog name*" to get the dogs name rememebr we data we had is an array of dogs so line10 we 9iterate throught that data(dogsArray) and pass it to the render so we can get the attributes of the dogs  
    // Dog Breed td
    let tdBreed = document.createElement("td")
    tdBreed.innerText = dog.breed //same as dog.name
    // Dog Sex td
    let tdSex = document.createElement("td")
    tdSex.innerText = dog.sex // same as dog.name
    // td for Button
    let tdBtn = document.createElement("td")
    // Edit Button for td
    let btn  = document.createElement("Button")

    btn.addEventListener("click", (event) => fillForm(event, dog))// do not invoke the call back function u just wanna click and do something
    // Button . i innerText
    btn.innerText = "Edit"
    // append button to td
    tdBtn.append(btn)
    // append everything to trow
    trow.append(tdName, tdBreed, tdSex, tdBtn )
    // append trow to tbody
    tbody.append(trow)// after this do debugger and see if ur stuff work

}

// to edit the dog we need an click event listener and that event should happened on the button so get the edit button and add the listener on it)( we already create a btn for this )
//that s why u put the btn.eventlistener inside of where u have that btn so go to line 32 and add it under
function fillForm(event, dogObj){// we need to get the dogs info so we pass in the dogobj here and line 33
event.preventDefault()
// Pseudocode: 
// click on edit button
// target the form
let form = document.getElementById("dog-form") 
// target the name input
let inputName = document.querySelector("input[name=name]")// 
inputName.value = dogObj.name
// target the breed input
let inputBreed = document.querySelector("input[name=breed]")
inputBreed.value = dogObj.breed
// target the sex input
let inputSex = document.querySelector("input[name=sex]")
inputSex.value = dogObj.sex
// Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.
// add event listener to Form
form.addEventListener("submit",() => submitForm(event, dogObj, inputName,inputBreed, inputSex))  

}


function submitForm(event, dog, inputName,inputBreed, inputSex){
     event.preventDefault()

    const url = `http://localhost:3000/dogs/${dog.id}`//id in this scope is null does not equal anything

    const dogObj = {// remeber u pass in the the obj when u edit
        name: inputName.value, // u passing in ur attributes
        breed: inputBreed.value,
        sex: inputSex.value
    }
    
    fetch(url, {
        method: "PATCH",
        headers: {'Content-Type': "application/json"},  //what u patch is the dogn name breed and sex
        body: JSON.stringify(dogObj)// body takes in the object to be patched
    })
    
}









