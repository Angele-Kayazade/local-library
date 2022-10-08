function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let checkedOut = books.filter((book)=>book.borrows[0].returned == false);
  return checkedOut.length;
}

function getMostCommonGenres(books) {
  const bookGenres = books.map((book) => book.genre);
  const temp = [];
  bookGenres.map((genre) => {
    const genreLocation = temp.findIndex((element) => element.name === genre);
    if (genreLocation >= 0) {
      temp[genreLocation].count = temp[genreLocation].count + 1;
    } else {
      temp.push({ name: genre, count: 1 });
    }
  });
  temp.sort((a, b) => b.count - a.count);
  if (temp.length > 5) {
    return firstFive(temp);
  }
  return temp;
}

function getMostPopularBooks(books) {
  const borrows = books.map(book=>({name:book.title, count:book.borrows.length}));
  borrows.sort((a,b) => b.count - a.count);
  return firstFive(borrows);
}


function getMostPopularAuthors(books, authors) {
  const authorList = books.reduce((acc, book) => { 
    const { authorId, borrows } = book;
    const authorObj = authors.find(author => author.id === authorId);
    const name = `${authorObj.name.first} ${authorObj.name.last}`;
    const count = borrows.length;
    const authExists = acc.find(auth => auth.name === name);
    if(authExists) {
      authExists.count += count;
    } else {
      const newAuthEntry = {
        name,
        count
      };
      acc.push(newAuthEntry);
    }
    return acc;
  }, []);
  
  const sortedAuthorList = authorList.sort((a, b) => b.count - a.count);
  const topFive = firstFive(sortedAuthorList);
  return topFive;
}

const firstFive = (toBeSliced) => toBeSliced.slice(0,5);

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
