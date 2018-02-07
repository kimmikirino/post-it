/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lista = __webpack_require__(6);

var _lista2 = _interopRequireDefault(_lista);

var _formNotas = __webpack_require__(1);

var _formNotas2 = _interopRequireDefault(_formNotas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secao = document.getElementsByClassName('notes')[0];
var observaMudancasNaLista = function observaMudancasNaLista() {
    atualizarSecao(secao);
};

var listaNotas = new _lista2.default(observaMudancasNaLista);

var atualizarSecao = function atualizarSecao(secao) {
    // let conteudoSecao = "";

    while (secao.firstChild) {
        secao.removeChild(secao.firstChild);
    }

    for (var posicao = 0; posicao < listaNotas.contaTotal(); posicao++) {
        var notaAtual = listaNotas.pega(posicao);

        // property shorthand
        var props = { posicao: posicao, notaAtual: notaAtual, editarFormulario: editarFormulario, adicionarNota: adicionarNota, removerNota: removerNota };
        secao.appendChild(new _formNotas2.default(props));
    }

    // secao.innerHTML = conteudoSecao;
};

window.editarFormulario = function (posicao) {
    return listaNotas.edita(posicao);
};

window.adicionarNota = function (inputTitulo, textareaTexto, formulario, posicao) {
    if (listaNotas.pega(posicao)) {
        listaNotas.salva(posicao, inputTitulo.value, textareaTexto.value);
    } else {
        listaNotas.adiciona(inputTitulo.value, textareaTexto.value);
        formulario.reset();
    }
};

window.removerNota = function (evento, posicao) {
    evento.stopPropagation();
    listaNotas.remove(posicao);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _form = __webpack_require__(2);

var _form2 = _interopRequireDefault(_form);

var _formInput = __webpack_require__(3);

var _formInput2 = _interopRequireDefault(_formInput);

var _formTextarea = __webpack_require__(4);

var _formTextarea2 = _interopRequireDefault(_formTextarea);

var _formButton = __webpack_require__(5);

var _formButton2 = _interopRequireDefault(_formButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var criaInputTitulo = function criaInputTitulo(_ref) {
    var notaAtual = _ref.notaAtual;

    // immutable
    var props = {
        className: 'note__title',
        type: 'text',
        name: 'titulo',
        placeholder: 'Título',
        readonly: notaAtual.editando ? false : true,
        value: notaAtual.titulo
    };

    return new _formInput2.default(props);
};

var criaTextareaTexto = function criaTextareaTexto(_ref2) {
    var notaAtual = _ref2.notaAtual;

    // immutable
    var props = {
        className: 'note__body',
        name: 'texto',
        placeholder: 'Criar uma nota...',
        rows: 5,
        readonly: notaAtual.editando ? false : true,
        children: notaAtual.texto
    };

    return new _formTextarea2.default(props);
};

var criaButtonConcluir = function criaButtonConcluir(_ref3, inputTitulo, textareaTexto, formNotas) {
    var posicao = _ref3.posicao,
        nota = _ref3.nota,
        adicionarNota = _ref3.adicionarNota,
        salvarNota = _ref3.salvarNota;

    // immutable
    var props = {
        className: 'note__control',
        type: 'button',
        children: 'Concluído',
        click: function click() {
            return adicionarNota(inputTitulo, textareaTexto, formNotas, posicao);
        }
    };

    return new _formButton2.default(props);
};

var criaButtonRemover = function criaButtonRemover(_ref4) {
    var posicao = _ref4.posicao,
        removerNota = _ref4.removerNota;

    // immutable
    var props = {
        className: 'note__control',
        type: 'button',
        children: '<i class="fa fa-times" aria-hidden="true"></i>',
        click: function click(event) {
            return removerNota(event, posicao);
        }
    };

    return new _formButton2.default(props);
};

function FormNotas(propriedades) {
    // destructuring
    var posicao = propriedades.posicao,
        notaAtual = propriedades.notaAtual,
        editarFormulario = propriedades.editarFormulario;


    var inputTitulo = criaInputTitulo(propriedades),
        textareaTexto = criaTextareaTexto(propriedades),
        buttonConcluido = criaButtonConcluir(propriedades, inputTitulo, textareaTexto, formNotas);

    var props = {
        className: 'note',
        click: notaAtual.editando ? function () {} : function () {
            return editarFormulario(posicao);
        },
        children: [inputTitulo, textareaTexto]
    };

    if (notaAtual.editando) {
        var buttonRemover = criaButtonRemover(propriedades);
        props.children.unshift(buttonRemover);
        props.children.push(buttonConcluido);
    }

    var formNotas = new _form2.default(props);

    return formNotas;
}

exports.default = FormNotas;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// props param
function Form(props) {
    var form = document.createElement('form');

    // destructuring
    form.setAttribute('class', props.className);

    // forEach
    for (var i = 0; i < props.children.length; i++) {
        form.appendChild(props.children[i]);
    }

    form.addEventListener("click", props.click);

    return form;
}

exports.default = Form;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function FormInput(props) {
    var formInput = document.createElement('input');

    formInput.setAttribute('class', props.className);
    formInput.setAttribute('placeholder', props.placeholder);
    formInput.setAttribute('name', props.name);
    formInput.setAttribute('type', props.type);
    formInput.setAttribute('value', props.value);

    if (props.readonly) {
        formInput.setAttribute('readonly', true);
    }

    return formInput;
}

exports.default = FormInput;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function FormTextarea(props) {
    var formTextarea = document.createElement('textarea');

    formTextarea.setAttribute('class', props.className);
    formTextarea.setAttribute('placeholder', props.placeholder);
    formTextarea.setAttribute('name', props.name);
    formTextarea.setAttribute('rows', props.rows);

    if (props.readonly) {
        formTextarea.setAttribute('readonly', true);
    }

    formTextarea.innerHTML = props.children;

    return formTextarea;
}

exports.default = FormTextarea;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function FormButton(props) {
    var formButton = document.createElement('button');

    formButton.setAttribute('class', props.className);
    formButton.setAttribute('placeholder', props.placeholder);
    formButton.setAttribute('name', props.name);
    formButton.setAttribute('type', props.type);
    formButton.setAttribute('value', props.value);
    formButton.addEventListener('click', props.click);

    formButton.innerHTML = props.children;

    return formButton;
}

exports.default = FormButton;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nota = __webpack_require__(7);

var _nota2 = _interopRequireDefault(_nota);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ListaNotas = function () {
    function ListaNotas(observador) {
        _classCallCheck(this, ListaNotas);

        this.listaNotas = [];
        this._observador = observador;
    }

    _createClass(ListaNotas, [{
        key: 'adiciona',
        value: function adiciona(novoTitulo, novoTexto) {
            var nota = new _nota2.default(novoTitulo, novoTexto);
            this.listaNotas.push(nota);
            this._observador();
        }
    }, {
        key: 'remove',
        value: function remove(posicao, quantidade) {
            this.listaNotas.splice(posicao, 1);
            this._observador();
        }
    }, {
        key: 'edita',
        value: function edita(posicao) {
            this.listaNotas[posicao].editando = true;
            this._observador();
        }
    }, {
        key: 'salva',
        value: function salva(posicao, novoTitulo, novoTexto) {
            this.listaNotas[posicao].titulo = novoTitulo;
            this.listaNotas[posicao].texto = novoTexto;
            this.listaNotas[posicao].editando = false;
            this._observador();
        }
    }, {
        key: 'pega',
        value: function pega(posicao) {
            return this.listaNotas[posicao];
        }
    }, {
        key: 'contaTotal',
        value: function contaTotal() {
            return this.listaNotas.length;
        }
    }]);

    return ListaNotas;
}();

;

exports.default = ListaNotas;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Nota = function () {
    function Nota(novoTitulo, novoTexto) {
        _classCallCheck(this, Nota);

        // modificadores visibilidade
        this._titulo = novoTitulo;
        this._texto = novoTexto;
        this._editando = false;
    }

    // getters/setters


    _createClass(Nota, [{
        key: "titulo",
        get: function get() {
            return this._titulo;
        },
        set: function set(tituloAlterado) {
            this._titulo = tituloAlterado;
        }
    }, {
        key: "texto",
        get: function get() {
            return this._texto;
        },
        set: function set(textoAlterado) {
            this._texto = textoAlterado;
        }
    }, {
        key: "editando",
        get: function get() {
            return this._editando;
        },
        set: function set(editandoAlterado) {
            this._editando = editandoAlterado;
        }
    }]);

    return Nota;
}();

exports.default = Nota;

/***/ })
/******/ ]);