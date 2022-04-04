'use strict'







function runInit(){
    renderBooks()
    currPage()
}
function renderBooks() {
    var books = getBooksForDisplay()
    var elTable = document.querySelector('.books-view')
    var tableHeadStr = `<tr class="table-head">
    <td onclick = "onSortBy('id')">Id</td>
    <td onclick = "onSortBy('name')">Title</td>
    <td onclick = "onSortBy('price')">Price</td>
    <td colspan="3">Actions</td>
  </tr>`
    var strHtml = books.map(book =>`
    <tr>
          <td>${book.id}</td>
          <td>${book.name}</td>
          <td data-id="${book.id}">${book.price} $</td>
          <td><button onclick="onReadBtn(${book.id},'${book.img}')">Read</button></td>
          <td><button onclick="onUpdateBtn(${book.id},${book.price},this)">Update</button></td>
          <td><button onclick="onDeleteBtn(${book.id})">Delete</button></td>
        </tr>
    `)
    elTable.innerHTML =tableHeadStr+ strHtml.join('')
    closeReadModal()

}



function onReadBtn(bookId,Img) {
readBookDescription(bookId,Img)
}
function onUpdateBtn(bookId,bookPrice,elBtn) {
    updatePrice(bookId,bookPrice,elBtn)
    // renderBooks()

}
function onDeleteBtn(bookId) {
    deleteBook(bookId)
    renderBooks()

}
function onCreateBtn(ev) {
    ev.preventDefault()
    var bookNameInput = document.querySelector('input[name=book-name]')
    var bookPriceInput = document.querySelector('input[name=book-price]')
    if(!bookNameInput.value||!bookPriceInput.value) {
    bookNameInput.value = ''
    bookPriceInput.value = ''
    alert('invalid input!')
    return 
    }else 
    addBook(bookNameInput.value,bookPriceInput.value)
    renderBooks()
    bookNameInput.value = ''
    bookPriceInput.value = ''
}
function onSortBy(sortBy){
    sortByValue(sortBy)
    renderBooks()

}
// pages with x books
// modal close works with esq and everywhere click
// on update focus to where the price is