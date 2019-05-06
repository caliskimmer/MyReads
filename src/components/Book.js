import React from 'react'
import PropTypes from 'prop-types';
import ChangerDropdown from './ChangerDropdown';
import '../App.css'

class Book extends React.Component {
    state = {
        shelf: this.props.shelf
    };

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{width: 128, height: 193,
                        backgroundImage: `url(${this.props.cover})`}}>
                    </div>
                    <ChangerDropdown
                        defaultValue={this.props.shelf}
                        updateShelf={this.props.updateShelf}
                    />
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">
                    {this.props.authors.map((author) => (
                        <div key={`${author}-${this.props.id}`}>{author}</div>
                    ))}
                </div>
            </div>
        );
    }
}

Book.propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    cover: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    updateShelf: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};

export default Book
