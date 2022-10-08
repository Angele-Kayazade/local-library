function findAccountById(accounts, id) {
  let findAccount = accounts.find((account)=>id == account.id);
  return findAccount;
}

function sortAccountsByLastName(accounts) {
  let sortedAccounts = accounts.sort((acc1, acc2)=>acc1.name.last > acc2.name.last ? 1 : -1);
  return sortedAccounts;
}

function getTotalNumberOfBorrows(account, books) {
  let result = 0;
  for (let i = 0; i<books.length; i++) {
    for (let j = 0; j<books[i].borrows.length; j++) {
      if (books[i].borrows[j].id == account.id) {
        result +=1;
      }
    }
  }
  return result;
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksCheckedOut = [];
  for (let i = 0; i<books.length; i++) {
    if (account.id == books[i].borrows[0].id && books[i].borrows[0].returned == false) {
      for (let j = 0; j<authors.length; j++) {
        if (authors[j].id == books[i].authorId) {
          let bookWithAuthor = {
            id: books[i].id,
            title: books[i].title,
            genre: books[i].genre,
            authorId: books[i].authorId,
            author: {
              id: authors[j].id,
              name: authors[j].name,
            },
            borrows: books[i].borrows,
          };
          booksCheckedOut.push(bookWithAuthor);
        }
      }
    }
  }
  return booksCheckedOut
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
