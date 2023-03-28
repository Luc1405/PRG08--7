const predictButton = document.getElementById("btn"); 
const nn = ml5.neuralNetwork({ task: 'regression', debug: true })
nn.load('./model/model.json', modelLoaded())

function modelLoaded() {
    predictButton.addEventListener("click", () => {
        let sale = parseInt(document.getElementById("sale").value)
        let weight = parseInt(document.getElementById("weight").value)
        let resolution = parseInt(document.getElementById("resolution").value)
        makePrediction(sale, weight, resolution)
    })
}

async function makePrediction(sale, weight, resolution) {
    const pred = await nn.predict({ sale: sale, weight: weight, resoloution: resolution})
    console.log(`Prijs: ${pred[0].price}`)
}