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
    // console.log(this);
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
    ul.innerHTML = null; // SERA QUE PRECISO TIRAR ISSO
    // console.log(ul);
}

btnTaskDone.addEventListener("click", printListDone);

// AO CLICAR EM DONE, FUNÇÃO QUE MOSTRA AS TAREFAS CONCLUÍDAS
function printListDone() {
    console.log(ul);
    
    styleButton(btnTaskDone, btnTaskPending);
    
    function findDone (list, index) {
        return list.map(tasks => tasks[index]);
    }
    
    let listConcluido = [];
    listConcluido.push(findDone(tasks, "concluido"));
    console.log(listConcluido);
    
    // listConcluido.forEach((value) => {
    //     if (value )
    //     console.log(value);
    // })
    
    
    //-----
    // TALVEZ - usar FOR in -  saber que dentro desse for se usa --- list["index"]
    //-----
    
    
    // CLICANDO NO LINK DA FRASE "Clear the filter here"
    // ul.innerHTML = `
    // <span class="done-no-results">There are no items marked as done. <span class="underline-done">Clear the filter here</span> to see all items.</span>
    // `
    // console.log(btnTaskDone);
    // console.log(ul);
    
    // console.log(ul.firstElementChild.firstElementChild);
    // ul.firstElementChild.firstElementChild.addEventListener("click", () => {
        //     console.log("o Span pegou!");
        //     clearFilterDone (btnTaskDone);
        //     // console.log(clearFilterDone);
        // printList();
        // })
        
    clearList();
    // ul.innerHTML = "";
    // console.log(ul);

    tasks.forEach((taskDone) => {
        if (taskDone.concluido === true) {
            let li = document.createElement("li");
            li.innerText = taskDone.conteudo;
            li.classList.add("liTask");
            ul.appendChild(li);
            aumenta();
            console.log(ul);
            // let tooltip = document.createElement("span");
            // tooltip.innerText = "Edit task"
            // clearList();
            
            // li.appendChild(tooltip);
            // printList();
        } 
        // else {
        //     // clearList();
        //     console.log(ul + " else array concluido false");
        //     // let underlineDone = document.querySelector(".underline-done");
        //     ul.innerHTML = `
        //     <span class="done-no-results">There are no items marked as done. <span class="underline-done">Clear the filter here</span> to see all items.</span>
        //     `;
            
        // }
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
            // let tooltip = document.createElement("span");
            // tooltip.innerHTML = "Edit task"

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
        // console.log(button2.firstElementChild);
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
    i.innerHTML = `<i class="fa-solid fa-check fa-class-button">`
    button1.appendChild(i);

    // clearFilterDone (button1);
    // input.addEventListener("click", clearFilterDone);

    input.addEventListener("click", () => {
        clearFilterDone(button1);
    
    })
} 

function clearFilterDone (button1) {
    // input.addEventListener("click", () => {
        
        console.log(button1.innerText);
        if (button1.innerText === "Done") {
            // console.log(button1.firstElementChild);
            button1.innerHTML = "Done";
            // button1.firstElementChild.remove();
            button1.classList.remove("addClassButton");
            // console.log(button1.firstElementChild);
            ul.innerHTML = null;
        }
    // })
}


searchTask.addEventListener("keyup", search);
searchTask.addEventListener("focus", searchFocus);
searchTask.addEventListener("focusout", searchFocusOut);

// BUSCA DE TAREFAS
function search () {
    let expression = searchTask.value.toLowerCase();
    // console.log(expression);
    // ul.innerHTML = "";

    let tasksUl = ul.getElementsByTagName("li");
    // console.log(tasksUl);
    // divInput.style.display = "none";
    // tasksUl.style.display = "none";
    
    for (let position in tasksUl) {
        if (true === isNaN(position)) { // EI!!! Se for verdade que a posição não e numérica então passe para o próximo indice
            continue;
        }
        // console.log(position);
        
        let taskContent = tasksUl[position].innerHTML.toLowerCase();
        
        if (true === taskContent.includes(expression)) {
            tasksUl[position].style.display = "flex";
        }
         else {
        //     // console.log(divInput);
            tasksUl[position].style.display = "none";
        //     ul.innerHTML = `
        //     <span class="search-no-results"> <span class="underline-done">Clear the search here</span> to see all items.</span>
        //     `
        // // CLICANDO NO LINK DA FRASE "Clear the filter here"
        // // let underlineDone = document.querySelector(".underline-done");
    
        //     console.log(ul.firstElementChild.firstElementChild);
        //     ul.firstElementChild.firstElementChild.addEventListener("click", () => {
        //         console.log("o Span pegou!");
        //         clearList();
        //         printList();
        //         clearFilterDone (btnTaskDone);
        //         searchTask.value = ""
        //         // console.log(clearFilterDone);
        //         // searchTask.addEventListener("focusout", searchFocusOut);
        //         })

        //         // divInput.style.display = "flex";
        }
    }
}


function searchFocus() {
    divInput.style.display = "none";
    
}
function searchFocusOut() {
    divInput.style.display = "flex";

}