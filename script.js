
const addNoteBtn = document.getElementById('new-btn');
const templateNote = document.getElementsByClassName('note')[0];
const newNote = document.getElementById('new-note');
const noteContainer = document.getElementsByClassName('notes')[0];

templateNote.remove();

noteContainer.onclick = function(e) {
    if (e.target.classList.contains('edit')) {
        const note = e.target.closest('.note');

        toggleEdit(note, true);
    }  
}

addNoteBtn.onclick = function() {
    newNote.insertAdjacentElement('afterEnd', templateNote.cloneNode(true));
}



function toggleEdit(note, on) {
    let title = note.getElementsByClassName('title')[0];
    let text = note.getElementsByClassName('text')[0];

    if (on) {
        title.setAttribute('contenteditable', '');
        text.setAttribute('contenteditable', '');
    } else {
        title.removeAttribute('contenteditable');
        text.removeAttribute('contenteditable');
    }
}

