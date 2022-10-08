function findAuthorById(authors, id) {
  let findAuthor = authors.find((author)=>author.id == id);
  return findAuthor;
}

function findBookById(books, id) {
  let findBook = books.find((book)=>book.id == id);
  return findBook;
}

function partitionBooksByBorrowedStatus(books) {
  let checkedOut = [];
  let returned = [];
    for (let i = 0; i<books.length; i++) {
    if (books[i].borrows[0].returned == true) {
      returned.push(books[i]);
    }
    else if (books[i].borrows[0].returned == false) { checkedOut.push(books[i])}
  }
  //console.log(checkedOut);
  let allBooks = [checkedOut, returned];
  return allBooks;
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  
  for (let i = 0; i<book.borrows.length; i++) {
    
    let match = accounts.find((account)=>account.id == book.borrows[i].id);
    let newObj = {id: match.id,
                  returned: book.borrows[i].returned,
                  picture: match.picture,
                  age: match.age,
                  name: match.name,
                  company: match.company,
                  email: match.email,
                  registered: match.registered,
                };
    result.push(newObj);
    if (i == 9) {break;}              
  }
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
