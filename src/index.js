var coolId = 0
document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()
    var form =  document.querySelector("form")
    form.addEventListener("submit", editDog )
})

function fetchDogs(){
    fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(data => renderDogs(data))
}

function renderDogs(data){

    // // // <tr>
    // // <td>Dog *Name*</td> 
    // // <td>*Dog Breed*</td> 
    // // <td>*Dog Sex*</td> <td>
    // <td><button>Edit</button></td>
    // </tr> 
    

    data.forEach((dog) => {

        let tbody = document.querySelector("tbody")
        let tr = document.createElement("tr")
        let tdName = document.createElement("td")
        let tdBreed = document.createElement("td")
        let tdSex = document.createElement("td")
        let btn = document.createElement("button")
        let tdBtn = document.createElement("td")
        tdName.innerText = dog.name
        tdBreed.innerText = dog.breed
        tdSex.innerText = dog.sex
        btn.innerText = "Edit Dog"
        btn.addEventListener("click", changeText)
        tdBtn.append(btn)
        tr.id = dog.id
        tr.append(tdName, tdBreed, tdSex, tdBtn)
        tbody.append(tr)
    })


    function changeText(event){
        var name = event.target.parentElement.parentNode.children[0].innerText
        var breed = event.target.parentElement.parentNode.children[1].innerText
        var sex = event.target.parentElement.parentNode.children[2].innerText
        var form = document.querySelector("form")
        form.name.value = name
        form.breed.value = breed
        form.sex.value = sex
        coolId = event.target.parentElement.parentElement.id
        
    }
}

function editDog(event){
    event.preventDefault();
    fetch(`http://localhost:3000/dogs/${coolId}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "name": event.target.name.value,
            "breed": event.target.breed.value,
            "sex": event.target.sex.value
        })
    })

    let tbody = document.querySelector("tbody")
    tbody.innerHTMl = '';
    fetchDogs()

    
}