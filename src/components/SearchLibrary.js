import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from '../api/BooksAPI'
import { Link } from 'react-router-dom'

import Book from './Book'

class SearchLibrary extends React.Component {
    state = {
        books: [],
        timeout: null
    };

    updateSearchList = async (query) => {
        if (query === '') {
            this.setState(() => ({
                books: []
            }));

            return;
        }

        let books;
        try {
            books = await BooksAPI.search(query.trim());
        } catch (err) {
            throw err;
        }
        if (books.error) {
            this.setState(() => ({
                books: []
            }));

            return;
        }

        this.setState(() => ({
            books: books
        }))
    };

    debouncedUpdateSearchList = (query) => {
        return () => {
            if (this.state.timeout) {
                clearTimeout(this.state.timeout);
            }

            this.setState(() => ({
                timeout: setTimeout(this.updateSearchList.bind(null, query), 250)
            }));
        };


    };

    render() {
        const { shelvedBooks, updateShelf } = this.props;
        const { books } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/'
                        className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            onChange={(event) => this.debouncedUpdateSearchList(event.target.value)()}
                            type="text"
                            placeholder="Search by title or author"
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <Book
                                    title={book.title}
                                    authors={book.authors || []}
                                    cover={(book.imageLinks && book.imageLinks.thumbnail) || ''}
                                    shelf={book.id in shelvedBooks ? shelvedBooks[book.id].shelf : 'none'}
                                    id={book.id}
                                    updateShelf={updateShelf.bind(null, book)}
                                />
                            </li>
                            )
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

SearchLibrary.propTypes = {
    shelvedBooks: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired
};

export default SearchLibrary
