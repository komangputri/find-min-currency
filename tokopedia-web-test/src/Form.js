import React, { Component } from 'react'

class Form extends Component {
    constructor(props) {
        super(props)

        this.initialState = {
            name: '',
            jobs: ''
        }

        this.state = this.initialState
    }

    handleChange = event => {
        const { name, value } = event.target

        this.setState({
            [name]: value
        })
    }
    
    submitForm = event => {
        event.preventDefault();
        
        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    }

    render () {
        const { name, job } = this.state;
        return (
            <form onSumit={this.onSubmitForm}>
                <label>Name </label>
                <input className="form-control" type="text" name="name" value={name} onChange={this.handleChange} />

                <label>Job </label>
                <input className="form-control" type="text" name="job" value={job} onChange={this.handleChange} />

                <button className="btn btn-primary mt-2" type="submit"> Submit </button>
            </form>
        )
    }
}

export default Form;