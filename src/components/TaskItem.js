import React from 'react'
import { deleteTodo, updateTodo } from '../api/apiClient';
import styles from "./list.module.css";

class TaskItem extends React.Component {
    state = {
        editing: false,
        content: this.props.content,
        id: this.props.id
    }

    handleDelete = (e) => {
        e.preventDefault();
        deleteTodo(this.state.id)
            .then((res) => {
                this.props.deleteTask(this.state.id);
            })
            .catch((err) => {
                console.log(`Delete task error: ${err}`);
            });
    }

    handleUpdate = (e) => {
        e.preventDefault();
        if (!this.state.editing) {
            this.setState({ editing: true });
        }
    }

    handleBlur = (e) => {
        e.preventDefault();
        if (this.state.editing){
            const update_content = e.target.value;
            if (update_content.trim() === ''){
                alert('Please input content!')
            } else {
                updateTodo(this.state.id, {content: update_content, done: this.props.done})
                    .then((res) => {
                        this.props.updateTask(this.state.id, {content: update_content, done: this.props.done})
                    })
                    .catch((err) => {
                        console.log(`Update error: ${err}`)
                    })
            }
            this.setState({content: update_content, editing: false})
        }
    }
    render() {
        const { editing, content } = this.state;
        const editIcon_template =  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"  aria-label="fontSize small">
                                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                                    </svg>
        const deleteIcon_template =    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" aria-label="fontSize small">
                                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                                        </svg>
        const leftIcon_template =  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" aria-label="fontSize small">
                                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                                    </svg>
        const rightIcon_template =  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIcon" aria-label="fontSize small">
                                        <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                                    </svg>
        const doneIcon_template =   <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CheckIcon" aria-label="fontSize small">
                                    <path d="M9 20L4 15l1.41-1.41L9 17.17l7.59-7.59L18 11l-9 9z"></path>
                                </svg>
      
        if (this.props.type === 'Pending') {
            return (
                <li>
                    {editing ? 
                        (<input placeholder={content} onBlur={this.handleBlur} autoFocus/>) : 
                        (<span>{this.state.content}</span>)
                    }
                    <button className={styles.edit_btn} onClick={this.handleUpdate}> {editing ? doneIcon_template : editIcon_template} </button>
                    <button className={styles.del_btn} onClick={this.handleDelete}> {deleteIcon_template} </button>
                    <button className={styles.arrow_btn}> {rightIcon_template} </button>
                </li>
            );
        } else {
            return (
                <li>
                    <button className={styles.arrow_btn}> {leftIcon_template} </button>
                    {editing ? 
                        (<input placeholder={content} onBlur={this.handleBlur} autoFocus/>) : 
                        (<span>{this.state.content}</span>)
                    }
                    <button className={styles.edit_btn} onClick={this.handleUpdate}> {editIcon_template} </button>
                    <button className={styles.del_btn} onClick={this.handleDelete}> {deleteIcon_template} </button>
                </li>
            );
        }
        
    }
}

export default TaskItem;