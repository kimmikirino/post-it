class Nota {
    constructor(titulo, texto) {
        //modificadores visibilidade getters e setters
        this._titulo = titulo;
        this._texto = texto;
        this._editando = false;
    }

    get titulo () {
        return this._titulo;
    }

    get texto() {
        return this._texto;
    }

    get editando() {
        return this._editando;
    }

    set titulo(novoTitulo) {
        if(novoTitulo !== null && novoTitulo.length > 5) {
            this._titulo = novoTitulo;
        } else {
            alert('O título deve ter mais que 5 caracteres');
        }
    }

    set texto(novoTexto) {
        this._texto = novoTexto;
    }

    set editando(estaEditando) {
        this._editando = estaEditando;
    }
}


class Notas extends Array {
    constructor() {
        super();
        this._secao = document.getElementsByClassName("notes")[0];
        
        //super = new Lista(); //underscore para identificar que é privado
    }

    push(titulo, texto) {
        let nota = new Nota(titulo, texto);
        super.push(nota);
        console.log(super[0]);
        atualizarSecao(this._secao);
    }

    splice(posicao) {
        super.splice(posicao, 1);
        atualizarSecao(this._secao);
    }

    edita(posicao) {
        this[posicao].editando = true;
        atualizarSecao(this._secao);
    }

    atualiza(titulo, texto, posicao){
        this[posicao].titulo = titulo;
        this[posicao].texto = texto;
        this[posicao].editando = false;
        atualizarSecao(this._secao);
    }

    pegaNota(posicao) {
        return this[posicao];
    }

    contaItems() {
        return super.length;
    }
}

const notas = new Notas();

const atualizarSecao = (secao) => {
    let conteudoSecao = "";

    // forEach, mapa, reduce
    for (let posicao = 0; posicao < notas.contaItems(); posicao++) {
        let notaAtual = notas.pegaNota(posicao);
        if (notaAtual.editando) {
            conteudoSecao += `<form class="note">
                                <input class="note__title" type="text" name="titulo" value="${notaAtual.titulo}" placeholder="Título">
                                <textarea class="note__body" name="texto" rows="5" placeholder="Criar uma nota...">${notaAtual.texto}</textarea>
                                <button class="note__control" type="button" onclick="atualizaNota(this.form.titulo, this.form.texto, ${posicao})">
                                    Atualizar
                                </button>
                             </form>`;
        } else {
            conteudoSecao += `<form class="note" onclick="editaFormulario(${posicao})">
                                <button class="note__control" type="button" onclick="removerNota(event, ${posicao})">
                                    <i class="fa fa-times" aria-hidden="true"></i>
                                </button>
                                <h1 class="note__title">${notaAtual.titulo}</h1>
                                <p class="note__body">${notaAtual.texto}</p>
                             </form>`;
        }
    }

    secao.innerHTML = conteudoSecao;
}

const adicionarNota = (inputTitulo, textareaTexto, formulario) => {
    notas.push(inputTitulo.value, textareaTexto.value);
    formulario.reset();
}

const atualizaNota = (inputTitulo, textareaTexto, posicao) => {
    notas.atualiza(inputTitulo.value, textareaTexto.value, posicao);
}

const removerNota = (evento, posicao) => {
    evento.stopPropagation();
    notas.splice(posicao);
}

const editaFormulario = posicao => notas.edita(posicao);