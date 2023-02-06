// PROGRESS BAR
// Iniciando as variáveis
let progressBar = document.querySelector("#progressBar");
let bar = document.querySelector("#bar");
// console.log("oi")


const aumenta = () => {

    let arrayDone = tasks.filter((completed) => completed.concluido); // Deverá trazer o numero total ocupado no arrayDone
    let arrayPende = tasks.filter((pending) => pending.concluido != true) // Deverá trazer o numero total ocupado no arrayPende
    // console.log(tasks);

    // console.log(arrayDone.length, arrayPende.length);
    valuePorcent = (arrayDone.length / (arrayDone.length + arrayPende.length) * 100).toFixed(0);
    // console.log(valuePorcent);
    progressBar.setAttribute("style", "width:" + valuePorcent+"%");
    // progressBar.style.width = `${valuePorcent}%`
}
aumenta();
// progressBar.addEventListener("click",aumenta);


// TODO LIST
// Iniciando variáveis

