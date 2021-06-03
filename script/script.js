var chaveHoras = {}
var inputTxt = document.getElementById('tarefa')
inputTxt.addEventListener('keyup', function (event) {
    if (dispatchForCode(event) === 13) {
        event.preventDefault()
        console.log('teste')
        let btn = document.getElementById('btnAdd')
        btn.click()
    }
})

var dispatchForCode = function(event) {
    var code;
  
    if (event.key !== undefined) {
      code = event.key;
    } else if (event.keyIdentifier !== undefined) {
      code = event.keyIdentifier;
    } else if (event.keyCode !== undefined) {
      code = event.keyCode;
    }
  
    return code
  };

onload = function () {
    let lista = document.querySelector('ul.toDo')
    chaveString = localStorage.getItem('chaveHoras')
    chaveHoras = JSON.parse(chaveString)
    for (let item in chaveHoras) {
        construirItem(item)
    }
    if (lista.childElementCount > 0) {
        contador()
    } else {
        cleanAll()
    }
}

var contador = function () {
    let lista = document.querySelector('ul.toDo')
    if (lista.childElementCount >= 0) {
        let qtLi = document.getElementById('qtLi')
        qtLi.innerText = `Você tem(êm) ${lista.childElementCount} tarefa(s) pendente(s)!`
        if (lista.childElementCount == 0) {
            qtLi.innerText = 'Parabéns! Você cumpriu todas as suas tarefas!'
        }
    }
}

function add() {
    let txtTarefa = document.getElementById('tarefa')
    let txtHora = document.getElementById('hora')
    let tarefa = txtTarefa.value
    let hora = txtHora.value
    if (tarefa.length < 3 || tarefa.length > 120) {
        alert('Erro! Digite uma tarefa válida, entre 3 e 120 caracteres!')
    } else {
        let testeLocalStorage = localStorage.getItem(`${hora}`)
        if (testeLocalStorage == null) {
            let novaTarefa = new construirTarefa(tarefa, hora)
            localStorage.setItem(`${hora}`, JSON.stringify(novaTarefa))
            construirItem(hora)
            construirChaveHora(hora)
            contador()
        } else {
            alert('Já existe uma tarefa cadastrada neste horário, Apague antes de adicionar de novo!')
        }
    }
}

function construirChaveHora (hora) {
    chaveHoras[`${hora}`] = hora
    localStorage.setItem('chaveHoras', JSON.stringify(chaveHoras))
}

var hoverText = function () {
    this.innerText = 'FINALIZAR TAREFA'
}

var normalText = function () {
    let hora = this.id
    let conteudoString = localStorage.getItem(`${hora}`)
    let conteudo = JSON.parse(conteudoString)
    this.innerText = `${conteudo.hora} - ${conteudo.tarefa}`
}

var clear = function () {
    let chaveString = localStorage.getItem('chaveHoras')
    let chave = JSON.parse(chaveString)
    let id = this.id
    let lista = document.querySelector('ul.toDo')
    delete chave[`${id}`]
    localStorage.setItem('chaveHoras', JSON.stringify(chave))
    localStorage.removeItem(`${id}`)
    lista.innerHTML = ''
    for (let item in chave) {
        construirItem(item)
    }
    contador()
}

function construirItem(hora) {
    let lista = document.querySelector('ul.toDo')
    let novoLi = document.createElement('li')
    let conteudoString = localStorage.getItem(`${hora}`)
    let conteudo = JSON.parse(conteudoString)
    novoLi.innerText = `${conteudo.hora} - ${conteudo.tarefa}`
    novoLi.setAttribute('id', `${hora}`)
    novoLi.addEventListener('click', clear)
    novoLi.addEventListener('mouseover', hoverText)
    novoLi.addEventListener('mouseleave', normalText)
    lista.appendChild(novoLi)
}

function construirTarefa(tarefa, hora) {
    this.tarefa = tarefa,
    this.hora = hora
}

function cleanAll() {
    let txtTarefa = document.getElementById('tarefa')
    let qtLi = document.getElementById('qtLi')
    let lista = document.querySelector('ul.toDo')
    localStorage.clear()
    chaveHoras = {}
    txtTarefa.value = ''
    lista.innerHTML = ''
    qtLi.innerText = ''
    txtTarefa.focus()
}