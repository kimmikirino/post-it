import React from 'react';
import Form from './form.js';
import FormInput from './formInput.js';
import FormTextarea from './formTextarea.js';
import FormButton from './formButton.js';
import Nota from '../nota';

const criaInputTitulo = (notaAtual, posicao) => {
    // immutable
    const props = {
        key: 'note-title',
        className: 'note__title',
        type: 'text',
        name: 'titulo',
        placeholder: 'Título',
        value: notaAtual.titulo
    };

    if(posicao !== undefined && !notaAtual.editando ) {
        props.readonly = true;
    }

    return React.createElement(FormInput, props);
};

const criaTextareaTexto = (notaAtual, posicao) => {
    // immutable
    const props = {
        key: 'note-body',
        className: 'note__body',
        name: 'texto',
        placeholder: 'Criar uma nota...',
        rows: 5,
        defaultValue: notaAtual.texto,
        onChange: event => {
            notaCopiada.texto = event.target.value
        }
    };

    if(posicao !== undefined && !notaAtual.editando ) {
        props.readonly = true;
    }

    return React.createElement(FormTextarea, props);
};

const criaButtonConcluir = (adicionarNota, posicao, notaCopiada) => {
    // immutable
    const props = {
        key: 'note-control',
        className: 'note__control',
        type: 'button',
        children: 'Concluído',
        click: (event) => adicionarNota(notaCopiada.titulo, notaCopiada.texto, event.target.value, posicao)
    };

    const children = 'Concluído'
    return React.createElement(FormButton, props, children);
};

const criaButtonRemover = ( posicao, removerNota ) => {
    // immutable
    const props = {
        key: 'note-remove',
        className: 'note__control',
        type: 'button',
        click: event => removerNota(event, posicao)
    };

    const children = React.createElement('i', {
        className: 'fa fa-times',
        'aria-hidden': true
    })

    return React.createElement(FormButton, props, children);
};


function FormNotas({notaAtual, posicao, adicionarNota, removerNota, editarFormulario}) {

    let notaCopiada = new Nota(notaAtual.titulo, notaAtual.texto, notaAtual.editando);
    let formNotas;

    let inputTitulo = criaInputTitulo(notaCopiada, posicao),
        textareaTexto = criaTextareaTexto(notaCopiada, posicao),
        buttonConcluido = criaButtonConcluir(adicionarNota, posicao, notaCopiada);
    let buttonRemover = criaButtonRemover(posicao, removerNota);

    let props = {
        className: 'note'
    };

    let children; 
    if (posicao === undefined) {
        // template de nova nota
        children = [inputTitulo, textareaTexto, buttonConcluido];
    } else {
        if (notaAtual.editando) {
             children = [buttonRemover, inputTitulo, textareaTexto, buttonConcluido];
        } else {
            children = [inputTitulo, textareaTexto];
            props.onclick = () => editarFormulario(posicao)
        }
    }

    return (<Form {...props}>
                {posicao !== undefined && notaCopiada.editando && buttonRemover}
                {inputTitulo}
                {textareaTexto}
                {(posicao !== undefined || notaCopiada.editando) && buttonConcluido}
            </Form>
        )
}

export default FormNotas;
