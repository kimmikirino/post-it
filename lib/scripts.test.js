'use strict';

var _scriptNew = require('./scriptNew');

var _scriptNew2 = _interopRequireDefault(_scriptNew);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('testa se está adicionado item', function () {
    _scriptNew2.default.adiciona("Titulo teste", "Texto");
    expect(_scriptNew2.default.contaItems()).toBe(1);
});