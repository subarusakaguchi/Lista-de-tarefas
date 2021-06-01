var chaveHoras = {}

onload = function () {
    chaveString = localStorage.getItem('chaveHoras')
    chaveHoras = JSON.parse(chaveString)
    for (let item in chaveHoras) {
        construirItem(item)
    }
}

function add() {
    let txtTarefa = document.getElementById('tarefa')
    let txtHora = document.getElementById('hora')
    let tarefa = txtTarefa.value
    let hora = txtHora.value
    if (tarefa.length < 3) {
        alert('Erro! Digite uma tareva válida, de no mínimo 3 caracteres!')
    } else {
        let testeLocalStorage = localStorage.getItem(`${hora}`)
        if (testeLocalStorage == null) {
            let novaTarefa = new construirTarefa(tarefa, hora)
            localStorage.setItem(`${hora}`, JSON.stringify(novaTarefa))
            construirItem(hora)
            construirChaveHora(hora)
            console.log(chaveHoras)
            console.log(localStorage.getItem('chaveHoras'))
        } else {
            alert('Já existe uma tarefa cadastrada neste horário, Apague antes de adicionar de novo!')
        }
    }
}

function construirChaveHora (hora) {
    chaveHoras[`${hora}`] = hora
    localStorage.setItem('chaveHoras', JSON.stringify(chaveHoras))
}

function construirItem(hora) {
    let lista = document.querySelector('ul.toDo')
    let novoLi = document.createElement('li')
    let conteudoString = localStorage.getItem(`${hora}`)
    let conteudo = JSON.parse(conteudoString)
    novoLi.innerText = `${conteudo.hora} - ${conteudo.tarefa}`
    novoLi.setAttribute('id', `${hora}`)
    novoLi.addEventListener('click', clear)
    lista.appendChild(novoLi)
}

function construirTarefa(tarefa, hora) {
    this.tarefa = tarefa,
    this.hora = hora
}

var clear = function () {
    let chaveString = localStorage.getItem('chaveHoras')
    let chave = JSON.parse(chaveString)
    let id = this.id
    // let lista = document.querySelector('ul.toDo')
    // let li = document.getElementById(`${id}`)
    delete chave[`${id}`]
    localStorage.setItem('chaveHoras', JSON.stringify(chave))
    // console.log(lista)
    // console.log(li)
    console.log(chave)
}

function cleanAll() {
    let lista = document.querySelector('ul.toDo')
    localStorage.clear()
    chaveHoras = {}
    console.log(chaveHoras)
    lista.innerHTML = ''
}