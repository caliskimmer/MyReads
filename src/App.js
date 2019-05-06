import React from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from './api/BooksAPI'
import BookLibrary from './components/BookLibrary'
import SearchLibrary from './components/SearchLibrary'

import './App.css'

class BooksApp extends React.Component {
    state = {
        books: []
    };

    updateShelf = async (bookToChange, shelf) => {
        try {
            await BooksAPI.update(bookToChange, shelf);

            bookToChange.shelf = shelf;
            this.setState(() => ({
                books: this.state.books.filter((book) =>
                    book.id !== bookToChange.id
                ).concat(bookToChange)
            }));
        } catch (err) {
            throw err;
        }
    };

    getBookTable = (books) => {
        let bookMap = {};
        books.forEach((book) => {
           bookMap[book.id] = book;
        });

        return bookMap;
    };

    async componentDidMount() {
        let books;
        try {
            books = await BooksAPI.getAll();
        } catch (err) {
            throw err;
        }

        this.setState(() => ({
           books
        }));
    }

    render() {
      return (
          <div className="app">
            <Route exact path='/' render={() => (
                <BookLibrary
                    books={this.state.books}
                    updateShelf={this.updateShelf}
                />
            )} />
            <Route path='/search' render={() => (
                <SearchLibrary
                    updateShelf={this.updateShelf}
                    shelvedBooks={this.getBookTable(this.state.books)}
                />
            )} />
          </div>
      )
  }
}

export default BooksApp
