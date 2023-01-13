
const addNoteBtn = document.getElementById('new-btn');
const templateNote = document.getElementsByClassName('note')[0];
const newNote = document.getElementById('new-note');
const noteContainer = document.getElementsByClassName('notes')[0];
const deleteBtn = document.getElementsByClassName('delete')[0];

templateNote.remove();

noteContainer.onclick = function(e) {
    if (e.target.classList.contains('edit')) {
        const note = e.target.closest('.note');

        toggleEdit(note, true);
    } 
    
    if (e.target.classList.contains('delete')) {
        const note = e.target.closest('.note');
        
        note.remove();
    }
}

addNoteBtn.onclick = function() {
    toggleEdit(false);

    const note = templateNote.cloneNode(true);

    newNote.insertAdjacentElement('afterEnd', note);
    toggleEdit(note, true);
}

function toggleEdit(note, on) {
    if (!note) {
        note = noteContainer.querySelector('.note:has([contenteditable])');
        if (!note) return ;
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

        document.addEventListener('focus', function save(e) {
            if (!note.contains(e.target)) {
                toggleEdit(note, false);
                this.removeEventListener('focus', save);
            }
        }, true)
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




