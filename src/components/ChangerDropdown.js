import React from 'react'
import PropTypes from 'prop-types'
import '../App.css'

class ChangerDropdown extends React.Component {
    state = {
        value: this.props.defaultValue
    };

    handleSelection = (event) => {
        this.props.updateShelf(event.target.value);
        this.setState({value: event.target.value});
    };

    render() {
        return (
            <div className="book-shelf-changer">
                <select value={this.state.value} onChange={this.handleSelection}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}

ChangerDropdown.propTypes = {
    defaultValue: PropTypes.string.isRequired
};

export default ChangerDropdown
