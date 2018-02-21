import React from 'react';
import Section from './section';
import FormNotas from './formNotas';
import ListaNotas from '../lista';

function montaUmFormNota(listaNotas, posicao, removerNota, adicionarNota, editarFormulario) {
    const props = {
        notaAtual: listaNotas.pega(posicao),
        posicao: posicao,
        adicionarNota: adicionarNota,
        removerNota: removerNota,
        editarFormulario: editarFormulario
    };

    return React.createElement(FormNotas, props);
}

function SecaoNotas({ listaNotas, adicionarNota, removerNota, editarFormulario }) {
    const props = {
        className: 'notes'
    }

    const children = listaNotas.pegaTodos().map((notaAtual, posicao) => {
        return montaUmFormNota(listaNotas, posicao, removerNota, adicionarNota, editarFormulario);
    })

    return React.createElement(Section, props, children);
}

export default SecaoNotas;