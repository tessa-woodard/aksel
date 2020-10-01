import React from 'react'
import { connect } from 'react-redux'

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditing: false,
            isDeleting: false,
            userInput: '',
        }
    }

    handleCancel = () => {
        this.setState({
            isEditing: !this.state.isEditing,
        })
    }

    handleChange = (e) => {
        this.setState({
            userInput: e.target.value,
        })
    }

    handleSave = () => {
        this.props.handleEdit(this.props.post.id, this.state.userInput)
        this.toggleEdit()
    }

    toggleEdit = () => {
        this.setState({
            isEditing: !this.state.isEditing,
        })
    }

    render() {

        return (

            <>
                <div>
                    <p className="post-text"> {this.props.post.content}</p>
                </div>
                {this.props.user.id === this.props.post.author_id ? (<ul className="post-container" key={this.props.post.id}>

                    {this.state.isEditing === true ?
                        <div>

                            <div>
                                <input
                                    value={this.state.userInput}
                                    onChange={(e) => {
                                        this.handleChange(e)
                                    }}
                                ></input>
                            </div>

                            <div className="dark_button">
                                <button
                                    className="input-container-button-small"
                                    onClick={() => {
                                        this.handleCancel()
                                    }}
                                >
                                    Cancel
                    </button>
                                <button
                                    className="input-container-button-small"
                                    onClick={() => {
                                        this.handleSave()
                                    }}
                                >
                                    Save
                    </button>
                            </div>
                        </div>

                        :

                        <div className="post-buttons">
                            {this.props.user.id === this.props.post.author_id && (
                                <button
                                    className="dark_button"
                                    onClick={() => {
                                        this.toggleEdit()
                                    }}
                                >
                                    Edit
                                </button>
                            )}

                            {this.props.user.id === this.props.post.author_id && (
                                <button
                                    className="dark_button"
                                    onClick={() => {
                                        this.props.handleDelete(this.props.post.id)
                                    }}
                                >
                                    Delete
                                </button>
                            )}
                        </div>}

                </ul>) : null}
            </>

        )

    }
}

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(Post)