document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.getElementById("monster-container") 
    const baseUrl = "http://localhost:3000/monsters/"
    const submitButton = document.getElementById("new-monster-form") 
    const newMonsterForm = document.querySelector("form") 
    let currentPage = 0 

    function getMonsters(direction) {
        if (direction == "frwd") {
            currentPage++ 

            fetch(baseUrl + `?_limit=50&_page=${currentPage}`) 
                .then(res => res.json()) 
                .then(json => displayMonsters(json)) 
        } else if (direction == "bwrd") {
            currentPage-- 

            fetch(baseUrl + `?_limit=50&_page=${currentPage}`) 
                .then(res => res.json()) 
                .then(json => displayMonsters(json)) 
        }
    }

    function postMonster(monster) {
        fetch(baseUrl, {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(monster)
        }) 
         .then(res => res.json()) 
         .then(json => addMonsterToPage(json)) 
    } 

    function displayMonsters(monsters) {
        console.log(monsters) 
        monsterContainer.innerHTML = '' 

        monsters.forEach(monster => {
            const monsterDiv = document.createElement("div") 
            monsterDiv.innerHTML = `
                <h1>${monster.name}</h1>
                <h3>${monster.age}</h3>
                <p>Bio: ${monster.description}</p> 
            `
            monsterContainer.appendChild(monsterDiv) 
        })
    } 

    function addMonsterToPage(monster) {
        const monsterDiv = document.createElement("div") 
        monsterDiv.innerHTML = `
                <h1>${monster.name}</h1>
                <h3>${monster.age}</h3>
                <p>Bio: ${monster.description}</p> 
            `
            monsterContainer.prepend(monsterDiv) 
    }

    getMonsters("frwd") 

    document.body.addEventListener("submit", e => {
        e.preventDefault() 
        if (e.target.id == "new-monster-form") {
            let userInput = {
                name: e.target.name.value,
                age: e.target.age.value,
                description: e.target.description.value, 
            }
            newMonsterForm.reset() 
            postMonster(userInput)
        }
    }) 

    document.body.addEventListener("click", e => {
        if (e.target.id == "back" && currentPage > 1) {
            getMonsters("bwrd") 
        } else if (e.target.id == "forward") {
            getMonsters("frwd") 
        }
    })
})