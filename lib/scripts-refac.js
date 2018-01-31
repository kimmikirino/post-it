'use strict';

var counter = 0;
var notes = {
    section: document.getElementsByClassName('notes')[0],
    notesList: [],
    counter: 0,
    create: function create(title, text) {
        this.counter++;
        var note = {
            id: this.counter,
            title: title,
            text: text
        };

        this.notesList.push(note);
        createElement(note);
    },
    remove: function remove(id) {
        this.notesList = this.notesList.filter(function (note) {
            return note.id !== id;
        });
    },
    save: function save(id, newTitle, newText) {
        this.notesList = this.notesList.map(function (note) {
            if (note.id === id) {
                note.title = newTitle, note.text = newText;
            }

            return note;
        });
    }
};

function createElement(note) {
    var formEdit = '<form class="note" onclick="formEdit(this, ' + note.id + ', 1)">';
    formEdit += '<button class="note__control" type="button" onclick="removeNote(this.form, ' + note.id + ')">' + '<i class="fa fa-times" aria-hidden="true"></i>' + '</button>';
    formEdit += '<h1 type="text" name="title"  class="note__title">' + note.title + '</h1>';
    formEdit += '<p name="body" rows="5" class="note__body">' + note.text + '</p>';
    formEdit += '</form>';

    notes.section.innerHTML = notes.section.innerHTML + formEdit;

    setTimeout(function () {
        notes.section.lastElementChild.className = notes.section.lastElementChild.className + " show";
    }, 10);
}

function createNote(form, title, text) {
    notes.create(title.value, text.value);
    form.reset();
}

function removeNote(el, id) {
    el.className = 'removed';
    setTimeout(function () {
        el.remove();
    }, 800);
    notes.remove(id);
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
        note.text = form.getElementsByTagName('p')[0].innerText;

        formEdit += '<input type="text" name="title"  class="note__title" value="' + note.title + '" />' + '<textarea name="body" rows="5" class="note__body" >' + note.text + '</textarea>' + '<button class="note__control" type="button" onclick="updateNote(this.form, this.form.title, this.form.body, ' + note.id + ')">' + 'Atualizar' + '</button>';
    } else {
        note.title = form.title.value;
        note.text = form.body.value;

        formEdit += '<h1 type="text" name="title"  class="note__title">' + note.title + '</h1>' + '<p name="body" rows="5" class="note__body">' + note.text + '</p>';
    }

    form.innerHTML = formEdit;
};

function updateNote(form, title, noteBody, id) {
    formEdit(form, id);
    event.stopImmediatePropagation();
    form.onclick = function (e) {
        e.stopImmediatePropagation();
        formEdit(form, id, 1);
    };

    notes.save(id, title, noteBody);
}