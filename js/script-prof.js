// a tela se atualizar sozinhanpm install babel-preset-env --save-dev
var notas = {
    secao: document.getElementsByClassName('notes')[0],
    lista: [],
    adiciona: function(titulo, texto) {
        var nota = {
            titulo: titulo,
            texto: texto,
            editando: false
        };

        this.lista.push(nota);
        atualizarSecao();
    },
    remove: function(posicao) {
        this.lista.splice(posicao, 1);
        atualizarSecao();
    },
    edita: function(posicao) {
        this.lista[posicao].editando = true;
        atualizarSecao();
    },
    atualiza: function(titulo, texto, posicao) {
        this.lista[posicao].titulo = titulo;
        this.lista[posicao].texto = texto;
        this.lista[posicao].editando = false;
        atualizarSecao();
    }, 
    pegaNota: function(posicao) {
        return this.lista[posicao];
    },
    contaItems: function() {
        return this.lista.length;
    }
};


function atualizarSecao() {
    var conteudoSecao = "";

    // forEach, mapa, reduce
    for (var posicao = 0; posicao < notas.contaItems(); posicao++) {
        var notaAtual = notas.pegaNota(posicao);
        if (notaAtual.editando) {
            conteudoSecao += `<form class="note">
                                <input class="note__title" type="text" name="titulo" value="${notaAtual.titulo}" placeholder="Título">
                                <textarea class="note__body" name="texto" rows="5" placeholder="Criar uma nota...">${notaAtual.texto}</textarea>
                                <button class="note__control" type="button" onclick="atualizaNota(this.form.titulo, this.form.texto, ${posicao})">
                                    Atualizar
                                </button>
                             </form>`;
        } else {
            conteudoSecao += `<form class="note" onclick="editaFormulario(${posicao}, this.parentElement)">
                                <button class="note__control" type="button" onclick="removerNota(event, ${posicao}, this.form.parentElement)">
                                    <i class="fa fa-times" aria-hidden="true"></i>
                                </button>
                                <h1 class="note__title">${notaAtual.titulo}</h1>
                                <p class="note__body">${notaAtual.texto}</p>
                             </form>`;
        }
    }

    notas.secao.innerHTML = conteudoSecao;
}

function adicionarNota(inputTitulo, textareaTexto, formulario) {
    notas.adiciona(inputTitulo.value, textareaTexto.value);

    formulario.reset();
}

function atualizaNota(inputTitulo, textareaTexto, posicao) {
    notas.atualiza(inputTitulo.value, textareaTexto.value, posicao);
}

function removerNota(evento, posicao) {
    evento.stopPropagation();
    notas.remove(posicao);
}

function editaFormulario(posicao) {
    notas.edita(posicao);
    return false;
}