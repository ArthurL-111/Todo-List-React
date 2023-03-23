import React from 'react'
import { addTodo } from '../api/apiClient';

class SubmitFrom extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const content = e.target.previousElementSibling.value;
        if(content.trim() === "") {
            alert("please input content!");
            return;
        }
        const newTodo = { content: content, done: false };
        addTodo(newTodo)
            .then(res => {
                e.target.previousElementSibling.value = '';
                this.props.addNewTask(res);
            })
            .catch((err) => console.log(`Add task failed: ${err}`));
    };

    render () {
        return (
            <div className='form_container'>
                <form className='form'>
                    <input type="text" />
                    <button onClick={this.handleSubmit}>submit</button>
                </form>
            </div>
        );
    }
}

export default SubmitFrom;