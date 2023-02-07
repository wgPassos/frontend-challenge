// TODO LIST

// Iniciando as variáveis
let input = document.querySelector("#newTask");
let ul = document.querySelector("#tasksGroup");
let btnTaskDone = document.querySelector("#done");
let btnTaskPending = document.querySelector("#pending");
let btnPlus = document.querySelector("#btnPlus");
let divInput = document.querySelector("#addTask");
let searchTask = document.querySelector("#searchTask");
let statusButtons = document.querySelector("#status");
let tasks = [];
let tasksDone = []; // excluir
// console.log(searchTask);
// console.log(tasks);

// INSERINDO TAREFAS NA LISTA
input.addEventListener("click", opacityFull);
input.addEventListener("focusout", focusOut);
input.addEventListener("keypress", createListEnter);
btnPlus.addEventListener("click", buttonCreateList);

// OPACIDADE NO INPUT DE CRIAR TAREFAS
function opacityFull () {
    // console.log(divInput);
    divInput.setAttribute("style", "opacity:" +1);
    console.log(this);
    // styleButton(btnTaskDone, btnTaskPending, this);
}
function focusOut () {
    // console.log(divInput);
    divInput.setAttribute("style", "opacity:" +.5);
}

// ADICIONAR TAREFA AO CLICAR ENTER DENTRO DO INPUT
function createListEnter() {
    if (event.which == 13) {
        buttonCreateList();
    }
}

// FUNCAO DE CRIAR OBJETO DENTRO DO ARRAY COM CONTEUDO E FASE DE CONCLUSÃO
function buttonCreateList() {
    if (input.value === "") {
        alert("Enter a note")
    } else {
        tasks.push({
            conteudo: input.value,
            concluido: false,
        })

        // criarLi(tasks)
        printList(tasks);
        aumenta();

        input.value = ""
        // console.log(tasks)
    }
}

// LIMPA INPUT APÓS INSERIR NOVA TAREFA
function clearList() {
    input.value = "";
    ul.innerHTML = null;
}

btnTaskDone.addEventListener("click", printListDone);

// AO CLICAR EM DONE, FUNÇÃO QUE MOSTRA AS TAREFAS CONCLUÍDAS
function printListDone() {
    clearList();
    // console.log(btnTaskDone);

    styleButton(btnTaskDone, btnTaskPending);
    // ativaBtn(btnTaskDone);
    
    tasks.forEach((taskDone) => {
        if (taskDone.concluido == true) {
            
            let li = document.createElement("li");
            li.innerText = taskDone.conteudo;
            // let tooltip = document.createElement("span");
            // tooltip.innerText = "Edit task"
            li.classList.add("liTask");

            // li.appendChild(tooltip);
            ul.appendChild(li);
            aumenta();

        } 
    })
}

// FILTRANDO AS TAREFAS PENDENTES
btnTaskPending.addEventListener("click", printListPending);

function printListPending() {
    styleButton(btnTaskPending, btnTaskDone);
    printList();
}

function printList(){
    clearList();
    
    tasks.forEach((taskPending) => {

        if (taskPending.concluido != true) {
            let tooltip = document.createElement("span");
            tooltip.innerHTML = "Edit task"

            let li = document.createElement("li");
            li.innerText = taskPending.conteudo;
            li.classList.add("liTask");
            // li.classList.add("tooltip");
            ul.appendChild(li);
            // li.appendChild(tooltip);
            li.innerHTML += 
            `<div class="buttonLI">
                <button class="btnTaskDelete btnIcons"><i class="fa-solid fa-minus"></i></button>
                <button class="btnTaskDone btnIcons"><i class="fa-solid fa-check"></i></button>
            </div>`;
            // console.log(li);
            let taskOkTaskNok = li.firstElementChild;
            // console.log(taskOkTaskNok)
            li.addEventListener("mouseover", () => {
                // console.log("mouse over")

                taskOkTaskNok.style.display= "flex";
                taskOkTaskNok.children[1].addEventListener("click", () => {
                    // console.log(taskOkTaskNok.children[1]);
                    // console.log(taskOkTaskNok.parentElement.innerText);
                    tasks.forEach((taskOK) => {
                        if (taskOK.conteudo == taskOkTaskNok.parentNode.innerText) {
                            // console.log("sim");
                            taskOK.concluido = true;
                            printList();
                            aumenta();
                        }
                    })
                })

                taskOkTaskNok.style.display= "flex";
                taskOkTaskNok.children[0].addEventListener("click", () => {
                    // console.log(taskOkTaskNok.children[0]);
                    // console.log(taskOkTaskNok.parentElement.innerText);
                    tasks.forEach((taskRemove) => {
                        if (taskRemove.conteudo == taskOkTaskNok.parentNode.innerText) {
                            // console.log("Não");
                            tasks.splice(tasks.indexOf(taskRemove), 1)
                            printList();
                            aumenta();
                        }
                    })
                })
            })

        li.addEventListener("mouseout", () => {
            // console.log("mouse out")
            taskOkTaskNok.style.display ="none";
            })
        } 
        
        // console.log(searchTask);
    })
}


function styleButton (button1, button2) {

    if (button2.classList.contains("addClassButton")) {
        button2.classList.remove("addClassButton");
        // button2.children.remove()
        console.log(button2.firstElementChild);
        button2.firstElementChild.remove();
        // É SOH FALTA TIRAR A TAG "I" DO BUTTON
    }
    if (button1.classList.contains("addClassButton")) {
        return;
    }
    button1.classList.add("addClassButton");
    // console.log(button);
    let i = document.createElement("i");
    // console.log(statusButtons);
    i.innerHTML = `<i class="fa-solid fa-check fa-class-button"></i>`
    button1.appendChild(i);

    input.addEventListener("click", () => {
        button1.classList.remove("addClassButton");
        // console.log(button1.firstElementChild);
        button1.firstElementChild.remove();
    })
    // console.log(statusButtons);
} 


searchTask.addEventListener("keyup", search);

// BUSCA DE TAREFAS
function search () {
    let expression = searchTask.value.toLowerCase();
    // console.log(expression);

    let tasksUl = ul.getElementsByTagName("li");
    // console.log(tasksUl);

    for (let position in tasksUl) {
        if (true === isNaN(position)) { // EI!!! Se for verdade que a posição não e numérica então passe para o próximo indice
            continue;
        }
        // console.log(position);

        let taskContent = tasksUl[position].innerHTML.toLowerCase();

        if (true === taskContent.includes(expression)) {
            tasksUl[position].style.display = "flex";
        } else {
            tasksUl[position].style.display = "none";
        }
    }
}



