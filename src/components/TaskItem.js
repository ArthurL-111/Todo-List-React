import React from 'react'
import { deleteTodo } from '../api/apiClient';

class TaskItem extends React.Component {
    handleDelete = (e) => {
        e.preventDefault();
        deleteTodo(this.props.id)
            .then((res) => {
                this.props.deleteTask(this.props.id);
            })
            .catch((err) => {
                console.log(`Delete task error: ${err}`);
            });
    }
    render() {
        if (this.props.type === 'Pending') {
            return (
                <li>
                    <span>{this.props.content}</span>
                    <button className="btn--edit"> edit </button>
                    <button className="btn--delete" onClick={this.handleDelete}> del </button>
                    <button className="move-right"> right </button>
                </li>
            );
        } else {
            return (
                <li>
                    <button className="move-left"> left </button>
                    <span>{this.props.content}</span>
                    <button className="btn--edit"> edit </button>
                    <button className="btn--delete" onClick={this.handleDelete}> del </button>
                </li>
            );
        }
        
    }
}

export default TaskItem;