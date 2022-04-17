let myLibrary = [
    {
        title: "Harry Porter",
        author: "JK Rowling",
        pages: 435,
        read: true,
        image: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
        title: "Harry Porter",
        author: "JK Rowling",
        pages: 435,
        read: true,
        image: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
        title: "Harry Porter",
        author: "JK Rowling",
        pages: 435,
        read: false,
        image: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    }
]
const books = document.querySelector('.books')
const btnAddBook = document.querySelector('.btn-addBook')
const form = document.querySelector('.formAddBook');
function Book(title, author, pages, read, image = 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80') {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.image = image;
}
function addBookToLibrary(book) {
    myLibrary.push(book)
}

function createEl(type) {
    return document.createElement(type)
}
function setAttributeToEl(el, attributeName, ...values) {
    el.setAttribute(attributeName, values.join(' '))
}
function addAppendChildren(parent, ...children) {
    children.forEach(child => {
        parent.appendChild(child)
    })
}
function createCard(i, book) {

    const card = createEl('div');
    setAttributeToEl(card, 'class', "book-card")

    const cardHeader = createEl('header');
    setAttributeToEl(cardHeader, 'class', "book-header")
    cardHeader.style.backgroundImage = `url(${book.image})`;
    const cardInformation = createEl('main');
    setAttributeToEl(cardInformation, 'class', "book-infomation")

    const informationDescription = createEl('section');
    setAttributeToEl(informationDescription, 'class', "book-description")

    const descriptionTitle = createEl('h4');
    setAttributeToEl(descriptionTitle, 'class', "book-title", "f400")
    descriptionTitle.textContent = book.title

    const descriptionAuthor = createEl('p');
    setAttributeToEl(descriptionAuthor, 'class', "book-author f300")
    descriptionAuthor.textContent = `by ${book.author}`

    const descriptionPages = createEl('p');
    setAttributeToEl(descriptionPages, 'class', "book-pages f300")
    descriptionPages.textContent = `${book.pages} pages`

    addAppendChildren(informationDescription, descriptionTitle, descriptionAuthor, descriptionPages)
    addAppendChildren(cardInformation, informationDescription)

    //action button
    const informationAction = createEl('section');
    setAttributeToEl(informationAction, 'class', "book-action")

    const actionRead = createEl('button');
    setAttributeToEl(actionRead, 'class', "btn-read")
    setAttributeToEl(actionRead, 'type', "button")
    actionRead.textContent = "Read"
    if (book.read) {
        actionRead.classList.add('isRead')
    } else {
        actionRead.addEventListener('click',
            function () {
                this.classList.add('isRead')
                book.read = !book.read;
            })
    }
    const actionRemove = createEl('button');
    setAttributeToEl(actionRemove, 'class', "btn-remove")
    setAttributeToEl(actionRemove, 'type', "button")
    actionRemove.textContent = "Remove"
    actionRemove.addEventListener('click', () => {
        myLibrary.splice(i, 1)
        reloadLibrary()
    })
    addAppendChildren(informationAction, actionRead, actionRemove)
    addAppendChildren(cardInformation, informationAction)
    addAppendChildren(card, cardHeader, cardInformation)
    addAppendChildren(books, card)
}
function displayCardBooks(arr) {
    arr.forEach((item, index) => {
        createCard(index, item)
    })
}
function toggleFormAddBook() {
    form.classList.toggle('hidden')
    btnAddBook.classList.toggle('unVisible')
}
function reloadLibrary() {
    books.textContent = '';
    displayCardBooks(myLibrary)
}
function getValueFromInput(el) {
    if (!el.value) return undefined
    if (el.type !== 'checkbox') {
        return el.value
    } else {
        console.log(el.checked)
        return el.checked === true ? true : false
    }
}
function getNewBookInfo() {
    const info = []
    form.querySelectorAll('input').forEach(input => {
        info.push(getValueFromInput(input))
    })
    return info
}
function clearForm() {
    form.querySelectorAll('input').forEach(input => {
        input.type !== "checkbox" ? input.value = "" : input.checked = false
    })
}
displayCardBooks(myLibrary)

document.querySelector('.btn-submit').addEventListener('click', function (e) {
    e.preventDefault()
    const newBook = new Book(...getNewBookInfo())
    addBookToLibrary(newBook)
    reloadLibrary()
    clearForm()
    toggleFormAddBook()
})
btnAddBook.onclick = function () {
    toggleFormAddBook()
}
document.querySelector('.exit').addEventListener('click', () => {
    clearForm()
    toggleFormAddBook()
})
