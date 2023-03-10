let table = document.querySelector('table')
let inp = document.querySelector('.modal input')
let save = document.querySelector('.modal button')
let modal = document.querySelector('.modal')
let created = document.querySelector('.buttons button')
let baseURL = 'http://localhost:3000'

function getData() {
    fetch(baseURL + "/users")
        .then((res) => res.json())
        .then((res) => reload(res))
}
getData()

let ID

function postData(data) {
    fetch(baseURL + '/users', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then((res) => {
            if (res.status === 200 || res.status === 201) {
                getData()
            }
        })
        .catch((err) => console.log(err))
}

const reload = (arr) => {
    for (let item of arr) {
        // create
        let tbody = document.createElement('tbody')
        let tr = document.createElement('tr')
        let id = document.createElement('th')
        let name = document.createElement('th')
        let year = document.createElement('th')
        let th4 = document.createElement('th')
        let img1 = document.createElement('img')
        let img2 = document.createElement('img')

        // innerHTML
        name.innerHTML = item.name
        year.innerHTML = item.year
        id.innerHTML = item.id

        // img 
        img1.setAttribute('src', './img/edit.svg')
        img2.setAttribute('src', './img/delete.svg')

        // append 
        table.append(tbody)
        tbody.append(tr)
        th4.append(img1, img2)
        tr.append(id, name, year, th4)

        // onclicks
        img1.onclick = () => {
            console.log(item.id);
            modal.style.display = 'block'
            save.onclick = () => {
                event.preventDefault()
                modal.style.display = 'none'
                name.innerHTML = inp.value
            }

            fetch('http://localhost:3000/users' + ID, {
                method: "PATCH",
                body: JSON.stringify({
                    name: inp.value
                }),
                headers: {
                    headers: { "Content-Type": "application/json;charset=utf-8" },
                },
            })
        }

        img2.onclick = () => {
            tr.remove()
        }

        ID = item.id
    }
}

function patch() {
    fetch('http://localhost:3000/users' + ID, {
        method: "PATCH",
        body: JSON.stringify({
            task: inp.value
        }),
        headers: {
            headers: { "Content-Type": "application/json;charset=utf-8" },
        },
    }).then((res) => {
        if (res.ok) {
            name.innerHTML = inp.value
            alert('Success')
        } else {
            alert('error')
        }
    })
}

let data = {
    "firstName": nameInp.value,
    "age": ageInp.value,
    "image": "https://robohash.org/hicveldicta.png"
}


// fetch(baseURL, {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: { "Content-Type": "application/json;charset=utf-8" }
// })
//     .then((res) => res.json())
//     .then((res) => {
//         let newItem = document.createElement('div');
//         newItem.classList.add('item');
//         newItem.innerHTML = `
//   <img src="${res.image}" alt="">
//   <span>${res.firstName}</span>
//   <span>${res.age}</span>
//     )}
// }
