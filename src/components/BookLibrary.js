import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import BookShelf from './BookShelf'

class BookLibrary extends React.Component {
    render() {
        let { books, updateShelf } = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf
                            title="Currently Reading"
                            books={books.filter((book) => (
                                book.shelf === 'currentlyReading'
                            ))}
                            updateShelf={updateShelf}
                        />
                        <BookShelf
                            title="Want to Read"
                            books={books.filter((book) => (
                                book.shelf === 'wantToRead'
                            ))}
                            updateShelf={updateShelf}
                        />
                        <BookShelf
                            title="Read"
                            books={books.filter((book) => (
                                book.shelf === 'read'
                            ))}
                            updateShelf={updateShelf}
                        />
                    </div>
                </div>
                <Link
                    className="open-search"
                    to="/search">
                    Add a book
                </Link>
            </div>
        )
    }
}

BookLibrary.propTypes = {
    books: PropTypes.array,
    updateShelf: PropTypes.func.isRequired
};

export default BookLibrary
