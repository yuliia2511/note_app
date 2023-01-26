const noteContainer = document.getElementsByClassName('notes')[0];
const closeOpt = document.getElementsByClassName('close-opt')[0];
const addNoteBtn = document.getElementById('new-btn');
const templateNote = document.getElementsByClassName('note')[0];
const newNote = document.getElementById('new-note');
const deleteBtn = document.getElementsByClassName('delete')[0];

templateNote.remove();

restore();

noteContainer.onclick = function (e) {
    if (e.target.classList.contains('edit')) {
        const note = e.target.closest('.note');

        toggleEdit(note, true);
    }

    if (e.target.classList.contains('delete')) {
        const note = e.target.closest('.note');
        
        note.remove();
        
        store(getAllNotes());
    }
}

addNoteBtn.onclick = function () {
    toggleEdit(false);

    const note = templateNote.cloneNode(true);

    newNote.insertAdjacentElement('afterEnd', note);
    toggleEdit(note, true);
}

function toggleEdit(note, on) {
    if (!note) {
        note = noteContainer.querySelector('.note:has([contenteditable])');
        if (!note) return;
    }

    const title = note.getElementsByClassName('title')[0];
    const text = note.getElementsByClassName('text')[0];
    const date = note.getElementsByClassName('date')[0];

    if (on) {
        const el = title.textContent == 'Title' ? title
            : text.textContent == 'Text' ? text : null;
        title.setAttribute('contenteditable', '');
        text.setAttribute('contenteditable', '');
        date.innerHTML = new Date().toLocaleDateString();

        setTimeout(() => el ? focusEdit(el) : text.focus());

        document.addEventListener('focus', save, true)

        closeOpt.onchange = save;

        function save(e) {
            if (!note.contains(e.target)) {
                toggleEdit(note, false);
                this.removeEventListener('focus', save);

                store(getAllNotes());
            }
        }
    } else {
        title.removeAttribute('contenteditable');
        text.removeAttribute('contenteditable');
    }
}

function focusEdit(el) {
    el.onfocus = () => {
        const selection = getSelection();
        selection.selectAllChildren(el);
        el.onfocus = null;
        el.onblur = () => selection.removeAllRanges();
    }
    el.focus();
}

/*
купить книги⌘учебники, досуг⌘13.01.23␣уборка⌘посуда, полы⌘14.01.23␣
*/


function getAllNotes() {
    const noteElements = noteContainer.getElementsByClassName('note');

    const notes = [];

    for (const element of noteElements) {
        const note = {
            title: element.querySelector('.title').innerText,
            text:  element.querySelector('.text').innerText,
            date: element.querySelector('.date').innerText
        }

        notes.push(note);
    }

    return notes;
}

function store(notes) {
    localStorage.setItem('notes', notes.map((note) => {
        return note.title + '⌘' + note.text + '⌘' + note.date
    }).join('␣'))
}

function restore() {
    const notesData = localStorage.getItem('notes').split('␣').map(str => str.split('⌘'));

    for (const [title, text, date] of notesData) {
        addNote(title, text, date)
    }
}

function addNote(title, text, date) {
    const note = templateNote.cloneNode(true);

    const titleEl = note.getElementsByClassName('title')[0];
    const textEl = note.getElementsByClassName('text')[0];
    const dateEl = note.getElementsByClassName('date')[0];

    titleEl.textContent = title;
    textEl.textContent = text;
    dateEl.textContent = date;

    newNote.insertAdjacentElement('afterEnd', note);
}











