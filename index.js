let myLibrary = [];

const showForm = document.getElementById('showForm');
const form = document.getElementById('form');
const addBook = document.getElementById('addBook');
class Book {
    constructor(author, name, pages, status){
        this.author = author;
        this.name = name;
        this.pages = pages;
        this.status = status;
    }
    changeStatus() {
        if(this.status == true) {
            this.status = false;
        } else {
            this.status = true;
        }
        render();
    }
}

function changeFormVisibility (e) {
        const form = document.getElementById('form');
        const button = document.getElementById('showForm');
        if(e.target == form || e.target == button || e.type == "submit") {
            if(form.style.display == 'none' || form.style.display == '') 
            {
                form.style.display = 'flex';
            } else {
                form.style.display = 'none';
            }   
        }
}
        


showForm.addEventListener('click', changeFormVisibility);
form.addEventListener('click', changeFormVisibility);


addBook.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(addBook);
    const author = data.get('author');
    const title = data.get('name');
    const pages = data.get('pages');
    let status=null;
    if(data.get('status') == null) {
        status = false;
    } else {
        status = true;
    }

    const book = new Book(author, title, pages, status);

    myLibrary.push(book);
    save();
   
    changeFormVisibility(e);
    render();
});

function render() {
    const display = document.getElementById('display');
    display.innerHTML = '';
    for(let i = 0; i < myLibrary.length; i++) {
        const card = document.createElement('div');
        card.classList.add('bookCard');
        card.data

        const author = document.createElement('p');
        author.innerText = myLibrary[i].author;

        const title = document.createElement('p');
        title.innerText = myLibrary[i].name;

        const pages = document.createElement('p');
        pages.innerText = myLibrary[i].pages;

        const status = document.createElement('p');
        status.innerText = myLibrary[i].status;
        
        const changeStatus = document.createElement('button');
        changeStatus.innerText = 'Change Status';
        changeStatus.addEventListener('click', () => {
            changeStat(i);
        })

        const deleteBook = document.createElement('button');
        deleteBook.innerText = 'Remove';
        deleteBook.addEventListener('click', () => {
            remove(i);
        });

        card.appendChild(author);
        card.appendChild(title);
        card.appendChild(pages);
        card.appendChild(status);
        card.appendChild(changeStatus);
        card.appendChild(deleteBook);

        display.appendChild(card);
    }
}

function remove(id) {
    myLibrary.splice(id, 1);
    save();
    render();
}

function changeStat(id) {
    myLibrary[id].changeStatus();
    render();
}

function save() {
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

function load() {
    myLibrary = JSON.parse(localStorage.getItem('library'));
    render();
}

load();