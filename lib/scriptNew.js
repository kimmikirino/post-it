"use strict";

// a tela se atualizar sozinhanpm install babel-preset-env --save-dev
var notas = {
    secao: document.getElementsByClassName('notes')[0],
    lista: [],
    adiciona: function adiciona(titulo, texto) {
        var nota = {
            titulo: titulo,
            texto: texto,
            editando: false
        };

        this.lista.push(nota);
        atualizarSecao();
    },
    remove: function remove(posicao) {
        this.lista.splice(posicao, 1);
        atualizarSecao();
    },
    edita: function edita(posicao) {
        this.lista[posicao].editando = true;
        atualizarSecao();
    },
    atualiza: function atualiza(titulo, texto, posicao) {
        this.lista[posicao].titulo = titulo;
        this.lista[posicao].texto = texto;
        this.lista[posicao].editando = false;
        atualizarSecao();
    },
    pegaNota: function pegaNota(posicao) {
        return this.lista[posicao];
    },
    contaItems: function contaItems() {
        return this.lista.length;
    }
};

var atualizarSecao = function atualizarSecao() {
    var conteudoSecao = "";

    // forEach, mapa, reduce
    for (var posicao = 0; posicao < notas.contaItems(); posicao++) {
        var notaAtual = notas.pegaNota(posicao);
        if (notaAtual.editando) {
            conteudoSecao += "<form class=\"note\">\n                                <input class=\"note__title\" type=\"text\" name=\"titulo\" value=\"" + notaAtual.titulo + "\" placeholder=\"T\xEDtulo\">\n                                <textarea class=\"note__body\" name=\"texto\" rows=\"5\" placeholder=\"Criar uma nota...\">" + notaAtual.texto + "</textarea>\n                                <button class=\"note__control\" type=\"button\" onclick=\"atualizaNota(this.form.titulo, this.form.texto, " + posicao + ")\">\n                                    Atualizar\n                                </button>\n                             </form>";
        } else {
            conteudoSecao += "<form class=\"note\" onclick=\"editaFormulario(" + posicao + ")\">\n                                <button class=\"note__control\" type=\"button\" onclick=\"removerNota(event, " + posicao + ")\">\n                                    <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\n                                </button>\n                                <h1 class=\"note__title\">" + notaAtual.titulo + "</h1>\n                                <p class=\"note__body\">" + notaAtual.texto + "</p>\n                             </form>";
        }
    }

    notas.secao.innerHTML = conteudoSecao;
};

var adicionarNota = function adicionarNota(inputTitulo, textareaTexto, formulario) {
    notas.adiciona(inputTitulo.value, textareaTexto.value);

    formulario.reset();
};

var atualizaNota = function atualizaNota(inputTitulo, textareaTexto, posicao) {
    notas.atualiza(inputTitulo.value, textareaTexto.value, posicao);
};

var removerNota = function removerNota(evento, posicao) {
    evento.stopPropagation();
    notas.remove(posicao);
};

var editaFormulario = function editaFormulario(posicao) {
    notas.edita(posicao);
    return false;
};