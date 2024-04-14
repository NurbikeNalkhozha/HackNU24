let notes = JSON.parse(localStorage.getItem('notes')) || [];
let currentIndex = null;

document.getElementById('addNote').addEventListener('click', () => {
    // Проверка на существование формы добавления
    if (!document.querySelector('.note-form')) {
        addNoteForm();
    }
});


function addNoteForm() {
    const notesDiv = document.getElementById('note-details1');
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note-form');

    noteDiv.innerHTML = `
        <div class="notes1">
            <input type="text" class="note-title" placeholder="Название заметки...">
            <p class="question">1. Какие положительные события произошли в процессе учебы?</p>
            <textarea class="note-content" placeholder=""></textarea>
            <p class="question">2. Что стало причиной наибольшей разочарованности или негативных эмоций?</p>
            <textarea class="note-content" placeholder=""></textarea>
            <p class="question">3. Поделитесь информацией о вашей успеваемости в учебе.</p>
            <textarea class="note-content" placeholder=""></textarea>
            <p class="question">4. Каков был ваш подход к подготовке к экзаменам (ЕНТ) сегодня?</p>
            <textarea class="note-content" placeholder=""></textarea>
            <p class="question">5. Что привлекло ваше внимание или заинтересовало в процессе обучения?</p>
            <textarea class="note-content" placeholder=""></textarea>
        </div>
        <button class="save-note">Сохранить</button>
    `;

    notesDiv.appendChild(noteDiv);

    // Назначаем обработчик события нажатия на кнопку "Сохранить"
    noteDiv.querySelector('.save-note').addEventListener('click', function() {
        saveNoteFromForm(noteDiv);
    });
}


document.getElementById('notes').addEventListener('click', (event) => {
    if (event.target.classList.contains('show-details')) {
        const index = event.target.dataset.index;
        const note = notes[index];
        showDetails(index, note);
    }
});

function saveNoteFromForm(formElement) {
    const title = formElement.querySelector('.note-title').value;
    const content1 = formElement.querySelectorAll('.note-content')[0].value;
    const content2 = formElement.querySelectorAll('.note-content')[1].value;
    const content3 = formElement.querySelectorAll('.note-content')[2].value;
    const content4 = formElement.querySelectorAll('.note-content')[3].value;
    const content5 = formElement.querySelectorAll('.note-content')[4].value;

    const content = {
        '1. Какие положительные события произошли в процессе учебы?': content1,
        '2. Что стало причиной наибольшей разочарованности или негативных эмоций?': content2,
        '3. Поделитесь информацией о вашей успеваемости в учебе.': content3,
        '4. Каков был ваш подход к подготовке к экзаменам (ЕНТ) сегодня?': content4,
        '5. Что привлекло ваше внимание или заинтересовало в процессе обучения?': content5,
    };

    notes.push({ title, content });
    localStorage.setItem('notes', JSON.stringify(notes));

    formElement.remove();
    displayNotes();
}

function displayNotes() {
    const notesDiv = document.getElementById('notes');
    notesDiv.innerHTML = '';

    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');

        const date = new Date().toLocaleDateString();
        const content1 = note.content['1. Какие положительные события произошли в процессе учебы?'];

        noteDiv.innerHTML = `
            <div class="time">${date}</div>
            <div class="noteTitle1">${note.title}</div>
            <p class="content1">${content1}</p>
            <button class="show-details" data-index="${index}">Подробнее...</button>
        `;
        notesDiv.appendChild(noteDiv);
    });
}

function showDetails(index, note) {
    const detailsDiv = document.getElementById('note-details');
    detailsDiv.innerHTML = '';

    let contentHtml = '';
    for (let key in note.content) {
        contentHtml += `
            <div class="question">
                <label class="detailsQuestion">${key}</label>
                <p>${note.content[key]}</p>
            </div>
        `;
    }

    detailsDiv.innerHTML = `
        <h3>${note.title}</h3>
        ${contentHtml}
        <button class="close-note" data-index="${index}">Сохранить</button>
        <button class="edit-note" data-index="${index}">Изменить</button>
        <button class="delete-note" data-index="${index}">Удалить</button>
    `;

    detailsDiv.querySelector('.save-note').addEventListener('click', closeNote);
}


document.getElementById('notes').addEventListener('click', (event) => {
    if (event.target.classList.contains('show-details')) {
        const index = event.target.dataset.index;
        const note = notes[index];
        showDetails(index, note);
    }
});

function closeNoteDetails() {
    const detailsDiv = document.getElementById('note-details');
    detailsDiv.innerHTML = ''; // Это очистит раздел с деталями
}


document.getElementById('note-details').addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-note')) {
        editNoteForm(event.target.dataset.index);
    } else if (event.target.classList.contains('delete-note')) {
        deleteNote(event.target.dataset.index);
    } else if (event.target.classList.contains('close-note')) {
        closeNoteDetails(); 
    }
});

function editNoteForm(index) {
    const note = notes[index];
    const notesDiv = document.getElementById('note-details');

    notesDiv.innerHTML = '';

    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note-form');

    noteDiv.innerHTML = `
        <input type="text" class="note-title" value="${note.title}">
        <p>1. Какие положительные события произошли в процессе учебы?</p>
        <textarea class="note-content">${note.content['1. Какие положительные события произошли в процессе учебы?'] || ''}</textarea>
        <p>2. Что стало причиной наибольшей разочарованности или негативных эмоций?</p>
        <textarea class="note-content">${note.content['2. Что стало причиной наибольшей разочарованности или негативных эмоций?'] || ''}</textarea>
        <p>3. Поделитесь информацией о вашей успеваемости в учебе.</p>
        <textarea class="note-content">${note.content['3. Поделитесь информацией о вашей успеваемости в учебе.'] || ''}</textarea>
        <p>4. Каков был ваш подход к подготовке к экзаменам (ЕНТ) сегодня?</p>
        <textarea class="note-content">${note.content['4. Каков был ваш подход к подготовке к экзаменам (ЕНТ) сегодня?'] || ''}</textarea>
        <p>5. Что привлекло ваше внимание или заинтересовало в процессе обучения?</p>
        <textarea class="note-content">${note.content['5. Что привлекло ваше внимание или заинтересовало в процессе обучения?'] || ''}</textarea>
        <button class="fff" onclick="saveEditedNote(${index}, this.parentElement)">Сохранить изменения</button>
    `;

    notesDiv.appendChild(noteDiv);
}

function saveEditedNote(index, formElement) {
    const title = formElement.querySelector('.note-title').value;
    const contents = formElement.querySelectorAll('.note-content');
    const content = {
        '1. Какие положительные события произошли в процессе учебы?': contents[0].value,
        '2. Что стало причиной наибольшей разочарованности или негативных эмоций?': contents[1].value,
        '3. Поделитесь информацией о вашей успеваемости в учебе.': contents[2].value,
        '4. Каков был ваш подход к подготовке к экзаменам (ЕНТ) сегодня?': contents[3].value,
        '5. Что привлекло ваше внимание или заинтересовало в процессе обучения?': contents[4].value,
    };

    notes[index] = { title, content };
    localStorage.setItem('notes', JSON.stringify(notes));

    displayNotes();

    const initialContent = notes[index];
    showDetails(index, initialContent);
}

function deleteNote(index) {
    notes.splice(index, 1); // Удаление заметки из массива
    localStorage.setItem('notes', JSON.stringify(notes)); // Обновление localStorage
    displayNotes(); // Перерисовка списка заметок

    // Очистка раздела деталей заметки
    const detailsDiv = document.getElementById('note-details');
    if (detailsDiv) {
        detailsDiv.innerHTML = ''; // Это очистит раздел с деталями
    }
}


// Добавление примерных заметок для демонстрации
const notesContainer = document.getElementById('notes');
for (let i = 1; i <= 5; i++) {
    const note = document.createElement('div');
    note.classList.add('note');
    note.textContent = `Заметка ${i}`;
    notesContainer.appendChild(note);
}

document.getElementById('prevBtn').addEventListener('click', () => {
    notesContainer.scrollLeft -= 200; // Прокрутка на ширину одной заметки влево
});

document.getElementById('nextBtn').addEventListener('click', () => {
    notesContainer.scrollLeft += 200; // Прокрутка на ширину одной заметки вправо
});


displayNotes();

