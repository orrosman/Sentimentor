//Sends the user's text to API
async function getSentiment(text){
    const data ={
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json" },
            body: JSON.stringify({ "text": text })
    }
    const response = await fetch(`https://sentim-api.herokuapp.com/api/v1/`,data)
    catStatus(response.status)
    if(!response.ok){
        return response.statusText
    }
    else{
    const answer = await response.json()
    return answer.result
}
}

//Get input from textarea
async function getInput(){
    const text = document.getElementById("text-input").value
    return await getSentiment(text)
}

//Creates an element
function createElement(tagName, children = []){
    const element = document.createElement(tagName)

    for (const child of children) {
        element.append(child)
    }
    return element
}

//Creates and update a result element and append it to the DOM
async function createResultElement(){
    const input = await getInput();
    const resultDiv = document.getElementById("result")

    if(typeof input == "object"){
        const { polarity, type } = input
        
        const polarityElement = createElement("div", ["Polarity: ", polarity])
        const typeElement = createElement("div", ["Type: ", type])
        const result = createElement("div",[ polarityElement, typeElement ])
        
        switch (type) {
            case "positive":
                result.classList.add("positive")
                break;
                case "negative":
                    result.classList.add("negative")
                    break;
                    case "neutral":
                        result.classList.add("neutral")
                        break;
                    }
        updateElement(resultDiv, result)
    }
    else{
        const error = createElement("div", [input])
        updateElement(resultDiv, error)      
      }   
}

function updateElement(element, data){
    if (!element.firstChild) {
        element.append(data)
    }
    else {
        element.removeChild(element.firstChild)
        element.append(data)
    }}

//Get cats HTTP status image and display it
function catStatus(status){
    const photo = document.createElement("img")
    photo.id = "cat-photo"
    photo.src = `https://http.cat/${status}`

    if(document.getElementById("cat-photo")){
        document.getElementById("cat-photo").remove()
    }

    document.getElementById("result").insertAdjacentElement('afterend' ,photo)
}

function handleClick(){
    createResultElement()
}

//Adds event listener to the button
document.getElementById("analyze-button").addEventListener("click", handleClick)