'use strict';

var notes = [];
var counter = 0;

function createElement(note, section) {
    var edit = 1;
    // criar uma variavel qu vai guardar o html de tds as notas que devem aparecer na tela
    var formEdit = '<form class="note" onclick="formEdit(this, ' + note.id + ', 1)">';
    formEdit += '<button class="note__control" type="button" onclick="removeNote(this.form, ' + note.id + ')">' + '<i class="fa fa-times" aria-hidden="true"></i>' + '</button>';
    formEdit += '<h1 type="text" name="title"  class="note__title">' + note.title + '</h1>';
    formEdit += '<p name="body" rows="5" class="note__body">' + note.body + '</p>';
    formEdit += '</form>';

    // colocar o html de tudo dentro da secao
    section.innerHTML = section.innerHTML + formEdit;

    setTimeout(function () {
        section.lastElementChild.className = section.lastElementChild.className + " show";
    }, 10);
}

function createNote(form, title, noteBody, section) {
    counter++;
    //criar uma variavel nota
    var note = {};

    note['title'] = title.value;
    note['body'] = noteBody.value;
    note['id'] = counter;
    // adicionar nota dentro da lista
    notes.push(note);

    //atualizar a seção de notas
    createElement(note, section);
    console.log(note);
    //limpar o formulario
    form.reset();
}

function removeNote(el, id) {
    el.className = 'removed';
    setTimeout(function () {
        el.remove();
    }, 800);
    notes = notes.filter(function (note) {
        return note.id !== id;
    });
}

var formEdit = function formEdit(form, id, type) {
    var note = {
        id: id
    };
    var formEdit = '<button class="note__control" type="button" onclick="removeNote(this.form, ' + note.id + ')">' + '<i class="fa fa-times" aria-hidden="true"></i>' + '</button>';

    if (type) {
        form.removeAttribute('onclick');
        form.onclick = null;
        note.title = form.getElementsByTagName('h1')[0].innerText;
        note.body = form.getElementsByTagName('p')[0].innerText;

        formEdit += '<input type="text" name="title"  class="note__title" value="' + note.title + '" />' + '<textarea name="body" rows="5" class="note__body" >' + note.body + '</textarea>' + '<button class="note__control" type="button" onclick="updateNote(this.form, this.form.title, this.form.body, this.form.nextElementSibling, ' + note.id + ')">' + 'Atualizar' + '</button>';
    } else {
        note.title = form.title.value;
        note.body = form.body.value;

        formEdit += '<h1 type="text" name="title"  class="note__title">' + note.title + '</h1>' + '<p name="body" rows="5" class="note__body">' + note.body + '</p>';
    }

    form.innerHTML = formEdit;
};

function updateNote(form, title, noteBody, section, id) {
    formEdit(form, id);
    event.stopImmediatePropagation();
    form.onclick = function (e) {
        e.stopImmediatePropagation();
        formEdit(form, id, 1);
    };

    notes = notes.map(function (note) {
        if (note.id === id) {
            note.title = title.value;
            note.body = noteBody.value;
        }

        return note;
    });
}