import React from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

const BookShelf = (props) => {
    let { books, updateShelf, title } = props;

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <ol className="books-grid">
                {books.map((book) => (
                    <li key={book.id}>
                        <Book
                            title={book.title}
                            cover={(book.imageLinks && book.imageLinks.thumbnail) || ''}
                            authors={book.authors || []}
                            shelf={book.shelf}
                            id={book.id}
                            updateShelf={updateShelf.bind(null, book)}
                        />
                    </li>
                ))}
            </ol>
        </div>
    );
};

BookShelf.propTypes = {
    title: PropTypes.string.isRequired,
    updateShelf: PropTypes.func.isRequired
};

export default BookShelf
