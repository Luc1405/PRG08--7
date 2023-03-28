import { createChart, updateChart } from "./scatterplot.js"
const nn = ml5.neuralNetwork({ task: 'regression', debug: true })
let predictbutton = document.getElementById("btn");

function loadData(){
        Papa.parse("./data/mobilephones.csv", {
            download:true,
            header:true, 
            dynamicTyping:true,
            complete: results => plotData(results.data)
        })
    }

function plotData(data) {
        data.sort(() => (Math.random() - 0.5))
        let trainData = data.slice(0, Math.floor(data.length * 0.8))
        let testData = data.slice(Math.floor(data.length * 0.8) + 1)

        for (let phone of trainData) {
                nn.addData({ sale: phone.sale, weight: phone.weight, resoloution: phone.resoloution }, { price: phone.price })
        }

        nn.normalizeData()
        
        const chartdata = data.map(car => ({
                x: car.horsepower,
                y: car.mpg,
            }))
        startTraining();

    }


function startTraining() {
        nn.train({ epochs: 10 }, () => finishedTraining()) 
}
    
async function finishedTraining(){
    // nn.save()
    console.log("finished")
}

loadData();