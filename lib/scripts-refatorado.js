"use strict";

var _listaObservavel = require("./listaObservavel.js");

var _listaObservavel2 = _interopRequireDefault(_listaObservavel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const secaoNotas = document.getElementsByClassName("notes")[0];

// function observaListaNotas() {
//     atualizarSecao(secaoNotas);
// }


// const listaNotas = {
//     listaInterna: [],
//     // Refatoração: desacoplamento da lista com a tela
//     observador: observaListaNotas,
//     adiciona(item) {
//         this.listaInterna.push(item);
//         this.observador();
//     },
//     remove(posicao) {
//         this.listaInterna.splice(posicao, 1);
//         this.observador();
//     },
//     edita(posicao, item) {
//         // Refatoração: usar internamente nossa função pega
//         let itemAtual = this.pega(posicao);
//         itemAtual = item; 
//         this.observador();
//     },
//     temItem(posicao) {
//         return posicao in this.listaInterna;
//     },
//     pega(posicao) {
//         return this.listaInterna[posicao];
//     },
//     contaTotal() {
//         return this.listaInterna.length;
//     }
// };
// const listaNotas = new ListaObservavel(observaListaNotas);

var atualizarSecao = function atualizarSecao(secao) {
    var conteudoSecao = "";

    for (var posicao = 0; posicao < _listaObservavel2.default.contaTotal(); posicao++) {
        // Refatoração: guardar numa variável a nota pega
        var notaAtual = _listaObservavel2.default.pega(posicao);

        if (notaAtual.editando) {
            conteudoSecao += "<form class=\"note\">\n                                <input class=\"note__title\" type=\"text\" name=\"titulo\" value=\"" + notaAtual.titulo + "\" placeholder=\"T\xEDtulo\">\n                                <textarea class=\"note__body\" name=\"texto\" rows=\"5\" placeholder=\"Criar uma nota...\">" + notaAtual.texto + "</textarea>\n                                <button class=\"note__control\" type=\"button\" onclick=\"adicionarNota(this.form.titulo, this.form.texto, this.form, " + posicao + ")\">\n                                    Conclu\xEDdo\n                                </button>\n                             </form>";
        } else {
            conteudoSecao += "<form class=\"note\" onclick=\"editaFormulario(" + posicao + ")\">\n                                <button class=\"note__control\" type=\"button\" onclick=\"removerNota(event, " + posicao + ")\">\n                                    <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\n                                </button>\n                                <h1 class=\"note__title\">" + notaAtual.titulo + "</h1>\n                                <p class=\"note__body\">" + notaAtual.texto + "</p>\n                             </form>";
        }
    }

    secao.innerHTML = conteudoSecao;
}; // import ListaObservavel from './listaObservavel.js'


window.editaFormulario = function (posicao) {
    var nota = _listaObservavel2.default.pega(posicao);
    nota.editando = true;
    _listaObservavel2.default.edita(posicao, nota);
};

window.adicionarNota = function (inputTitulo, textareaTexto, formulario, posicao) {
    // Refatoração: guardar os valores em uma variavel
    var titulo = inputTitulo.value,
        texto = textareaTexto.value;

    if (_listaObservavel2.default.temItem(posicao)) {
        var notaExistente = _listaObservavel2.default.pega(posicao);
        notaExistente.titulo = titulo;
        notaExistente.texto = texto;
        notaExistente.editando = false;
        _listaObservavel2.default.edita(posicao, notaExistente);
    } else {
        // Refatoração: property shorthand
        var novaNota = { titulo: titulo, texto: texto };
        _listaObservavel2.default.adiciona(novaNota);
        formulario.reset();
    }
};

window.removerNota = function (evento, posicao) {
    evento.stopPropagation();
    _listaObservavel2.default.remove(posicao);
};