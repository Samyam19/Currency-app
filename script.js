import { countryList } from "./code.js";



const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdown) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if (select.name === "to" && currCode ==="AUD"){
            newOption.selected ="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};



//button
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value;
    var fromValue = fromCurr.value;
    var toValue = toCurr.value;

    const BASE_URL =
    `https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api/${fromValue}_${toValue}.json`;


    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(BASE_URL);
    let data = await response.json();
    // let rate = data[toCurr.value.toLowerCase()]
    console.log(data);


    let finalAmount = amtVal * data.rate;
    msg.innerText = `${amtVal} ${toCurr.value} = ${finalAmount} ${fromCurr.value}`;
    
});


