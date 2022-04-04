const KEY = 'Books';
const PAGE_SIZE = 5;
var gBooks = [];
var gId = _getIndexForNewBook();
var gCurrBook;
var gPageIdx = 0;
var gSort = {id:false,name:false,price:false}

_createBooks();

function getBooksForDisplay() {
  // var books = gBooks.sort((bookOne, bookTwo) => {
  //   if (bookOne.id > bookTwo.id) {
  //     return 1;
  //   } else if (bookOne.id < bookTwo.id) return -1;
  //   else return 0;
  // });
  var books = gBooks
  saveToStorage(KEY, books);
  const idxStart = gPageIdx * PAGE_SIZE;
  books = books.slice(idxStart, idxStart + PAGE_SIZE);
  //   const idxStart = gPageIdx * PAGE_SIZE
  //     cars = cars.slice(idxStart, idxStart + PAGE_SIZE)
  return books;
}
function deleteBook(bookId) {
  var idx = _findBookIdx(bookId);
  gBooks.splice(idx, 1);
  saveToStorage(KEY, gBooks);
}


function sortByValue(sortBy){
  var desendOrder = gSort[sortBy]? 1:-1
  if (sortBy==='id'||sortBy==='price'){
    gBooks.sort((bookOne,bookTwo)=>{
      if(+bookOne[sortBy]>+bookTwo[sortBy]) return -1*desendOrder // first run -1*1
  
      if(+bookOne[sortBy]<+bookTwo[sortBy]) return  1*desendOrder // first run -1*1
  
  })
  gSort[sortBy] = !gSort[sortBy]
  return
}
  else if(sortBy==='name'){
    gBooks.sort((bookOne,bookTwo)=>{
      if(bookOne[sortBy].toLowerCase()>(bookTwo[sortBy].toLowerCase())) return -1*desendOrder // first run -1*1
  
      if(bookTwo[sortBy].toLowerCase()>(bookOne[sortBy].toLowerCase())) return  1*desendOrder // first run -1*1 
      else return 0
    })
    gSort[sortBy] = !gSort[sortBy]
  return
  }
 

  
}

function addBook(name, price) {
  var newBook = _createBook(name, price);
  gBooks.push(newBook);
  saveToStorage(KEY, gBooks);
}
///////////////////////////////////////////////////////////////////// beforeeee change
// function updatePrice(bookId, bookPrice,elBtn) {
//   closeReadModal();

//   var newPrice = prompt(`'What's the new Price?`, bookPrice);
//   var idx = _findBookIdx(bookId);
//   gBooks[idx].price = newPrice;
//   showUpdateModal(gBooks[idx]);
// }
/////////////////////////////////////////////////////////////////////
function updatePrice(bookId, bookPrice, elBtn) {
  var inputStr = `<form onsubmit = "inputPriceUpdate(event,${bookId})">
    <button  class="submit-price-btn">Submit</button>
    <input class = "${bookId}" placeholder="Price?" type="number" name="newPrice" /></form>`;
  var elPriceTd = document.querySelector(`[data-id="${bookId}"]`);
  elPriceTd.innerHTML = inputStr;
}

function inputPriceUpdate(ev, bookId) {
  ev.preventDefault();
  var idx = _findBookIdx(bookId);
  var currInput = document.querySelector(`input[class="${bookId}"]`);
  if (!currInput.value) {
    gBooks[idx].price = gBooks[idx].price;
    renderBooks();
  } else gBooks[idx].price = currInput.value;
  currInput.value = '';
  renderBooks();
}
function showUpdateModal(updateBook) {
  var elUpdateMsg = document.querySelector('.msg-modal');
  elUpdateMsg.querySelector(
    '.modal-book-name'
  ).innerText = `name: ${updateBook.name}`;
  elUpdateMsg.querySelector(
    '.modal-book-price'
  ).innerText = `price: ${updateBook.price}`;
  elUpdateMsg.querySelector(
    '.modal-book-id'
  ).innerText = `id: ${updateBook.id}`;
  elUpdateMsg.style.bottom = '0';
  setTimeout(() => {
    elUpdateMsg.style.bottom = '-1em';
    elUpdateMsg.querySelector('.modal-book-name').innerText = '';
    elUpdateMsg.querySelector('.modal-book-price').innerText = '';
    elUpdateMsg.querySelector('.modal-book-id').innerText = '';
  }, 1500);
}
function readBookDescription(bookId, Img) {
  var idx = _findBookIdx(bookId);
  var currBook = gBooks[idx];
  gCurrBook = gBooks[idx];
  var elReadModal = document.querySelector('.read-modal');
  elReadModal.style.display = 'block';
  elReadModal.querySelector(
    '.read-book-name'
  ).textContent = `Name: ${currBook.name}`;
  elReadModal.querySelector(
    '.read-book-price'
  ).textContent = `Price: ${currBook.price}$`;
  elReadModal.querySelector('.read-book-img').src = currBook.img;
  elReadModal.querySelector(
    '.rate'
  ).innerText = `Current rating is ${currBook.rate}`;
}
function closeReadModal() {
  var elReadModal = document.querySelector('.read-modal');
  elReadModal.style.display = 'none';
}
function pageUp(elBtn) {
  if (gBooks.length - 1 - PAGE_SIZE < PAGE_SIZE * gPageIdx) {
    elBtn.disable = true;
    return;
  }
  elBtn.disable = false;
  gPageIdx++;
  currPage();
  renderBooks();
}
function pageDown(elBtn) {
  if (PAGE_SIZE * gPageIdx === 0) {
    elBtn.disable = false;
    return;
  }
  elBtn.disable = true;
  gPageIdx--;
  currPage();
  renderBooks();
}
function currPage() {
  document.querySelector('.curr-page').innerText = gPageIdx;
}
function _createBook(name, price, img = '/imgs/default.png', rate = 0) {
  gId++;
  return {
    id: gId,
    name,
    price,
    img,
    rate,
  };
}
function _createBooks() {
  var books = loadFromStorage(KEY);

  if (!books || !books.length) {
    books = [
      _createBook('DaniDin', 21, 'imgs/danidin.jpg'),
      _createBook('Who Moved My Cheese?', 31, 'imgs/cheese.jpg'),
    ];
  }
  gBooks = books;
  
  saveToStorage(KEY, gBooks);
}

function _findBookIdx(bookId) {
  var Idx = gBooks.findIndex((book) => book.id === bookId);
  return Idx;
}

function _getIndexForNewBook() {
  var lastId;
  var books = loadFromStorage(KEY);
  if (!books || !books.length) return (lastId = 0);
  else {
    var sortedBooks = books.sort((a, b) => b.id - a.id);
    lastId = sortedBooks[0].id;
    return lastId;
  }
}

function increaseRate(elBtn) {
  if (gCurrBook.rate === 10) {
    elBtn.disable = true;
    return;
  }
  elBtn.disable = false;
  
  gCurrBook.rate++;
  document.querySelector(
    '.rate'
    ).innerText = `Current rating is ${gCurrBook.rate}`;
    renderBooks();
  }
  function decreaseRate(elBtn) {
    if (gCurrBook.rate === 0) {
      elBtn.disable = true;
      return;
    }
    elBtn.disable = false;
    gCurrBook.rate--;
    document.querySelector(
    '.rate'
    ).innerText = `Current rating is ${gCurrBook.rate}`;
    renderBooks();
  }
  