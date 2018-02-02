"use strict";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Nota = function () {
    function Nota(titulo, texto) {
        _classCallCheck(this, Nota);

        //modificadores visibilidade getters e setters
        this._titulo = titulo;
        this._texto = texto;
        this._editando = false;
    }

    _createClass(Nota, [{
        key: "titulo",
        get: function get() {
            return this._titulo;
        },
        set: function set(novoTitulo) {
            if (novoTitulo !== null && novoTitulo.length > 5) {
                this._titulo = novoTitulo;
            } else {
                alert('O título deve ter mais que 5 caracteres');
            }
        }
    }, {
        key: "texto",
        get: function get() {
            return this._texto;
        },
        set: function set(novoTexto) {
            this._texto = novoTexto;
        }
    }, {
        key: "editando",
        get: function get() {
            return this._editando;
        },
        set: function set(estaEditando) {
            this._editando = estaEditando;
        }
    }]);

    return Nota;
}();

var Notas = function (_Array) {
    _inherits(Notas, _Array);

    function Notas() {
        _classCallCheck(this, Notas);

        var _this = _possibleConstructorReturn(this, (Notas.__proto__ || Object.getPrototypeOf(Notas)).call(this));

        _this._secao = document.getElementsByClassName("notes")[0];

        //super = new Lista(); //underscore para identificar que é privado
        return _this;
    }

    _createClass(Notas, [{
        key: "push",
        value: function push(titulo, texto) {
            var nota = new Nota(titulo, texto);
            _get(Notas.prototype.__proto__ || Object.getPrototypeOf(Notas.prototype), "push", this).call(this, nota);
            console.log(_get(Notas.prototype.__proto__ || Object.getPrototypeOf(Notas.prototype), 0, this));
            atualizarSecao(this._secao);
        }
    }, {
        key: "splice",
        value: function splice(posicao) {
            _get(Notas.prototype.__proto__ || Object.getPrototypeOf(Notas.prototype), "splice", this).call(this, posicao, 1);
            atualizarSecao(this._secao);
        }
    }, {
        key: "edita",
        value: function edita(posicao) {
            this[posicao].editando = true;
            atualizarSecao(this._secao);
        }
    }, {
        key: "atualiza",
        value: function atualiza(titulo, texto, posicao) {
            this[posicao].titulo = titulo;
            this[posicao].texto = texto;
            this[posicao].editando = false;
            atualizarSecao(this._secao);
        }
    }, {
        key: "pegaNota",
        value: function pegaNota(posicao) {
            return this[posicao];
        }
    }, {
        key: "contaItems",
        value: function contaItems() {
            return _get(Notas.prototype.__proto__ || Object.getPrototypeOf(Notas.prototype), "length", this);
        }
    }]);

    return Notas;
}(Array);

var notas = new Notas();

var atualizarSecao = function atualizarSecao(secao) {
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

    secao.innerHTML = conteudoSecao;
};

var adicionarNota = function adicionarNota(inputTitulo, textareaTexto, formulario) {
    notas.push(inputTitulo.value, textareaTexto.value);
    formulario.reset();
};

var atualizaNota = function atualizaNota(inputTitulo, textareaTexto, posicao) {
    notas.atualiza(inputTitulo.value, textareaTexto.value, posicao);
};

var removerNota = function removerNota(evento, posicao) {
    evento.stopPropagation();
    notas.splice(posicao);
};

var editaFormulario = function editaFormulario(posicao) {
    return notas.edita(posicao);
};