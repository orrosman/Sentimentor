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
    const answer = await response.json()

    console.log(answer.result)
}

//Get input from textarea
function getInput(){
    const text = document.getElementById("text-input").value
    getSentiment(text)
}

//Adds event listener to the button
document.getElementById("analyze-button").addEventListener("click", getInput)