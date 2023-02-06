// HEADER - DATA
// Iniciando variaveis
let day = document.querySelector("#day");
let month = document.querySelector("#month");
let year = document.querySelector("#year");
let dayWeek = document.querySelector("#dayWeek");
let dayToday = new Date();
// console.log(dayToday);
// console.log(dayToday.getDate());

monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Sep", "Nov", "Dec"];
dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

day.innerHTML = `0${dayToday.getDate()}`.slice(-2);
month.innerHTML = `${monthArray[dayToday.getMonth()]}`;
year.innerHTML = `${dayToday.getFullYear()}`;
dayWeek.innerHTML = `${dayOfWeek[dayToday.getDay()]}`