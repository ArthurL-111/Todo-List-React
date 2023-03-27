import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import styles from '../list.module.css'
import { withTodos } from '../../hoc/withTodos';

class ListsWrapper extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const content = e.target.previousElementSibling.value;
        this.props.handleSubmit(content);
        e.target.previousElementSibling.value = '';
    };

    render() {
        return (
            <React.Fragment>
                <div className='form_container'>
                    <form className='form'>
                        <input type="text" />
                        <button onClick={this.handleSubmit}>submit</button>
                    </form>
                </div>

                <div className={styles.lists_wrapper} key='pending-tasks'>
                    <div className={styles.list_container}>
                        <h3 className={styles.list_title}>Pending Tasks</h3>
                        {this.props.pendingTasks.map((item, index) => (
                                        <TaskItem todo = {item}
                                                id = {item.id} 
                                                key = {index} 
                                                handleDelete = {this.props.handleDelete}
                                                handleUpdate = {this.props.handleUpdate}
                                                handleComplete = {this.props.handleComplete}
                                                />
                                    ))
                        }
                    </div>

                    <div className={styles.list_container} key='completed-tasks'>
                        <h3 className={styles.list_title}>Completed Tasks</h3>
                        {this.props.completedTasks.map((item, index) => (
                                        <TaskItem todo = {item}
                                                id = {item.id} 
                                                key = {index} 
                                                handleDelete = {this.props.handleDelete}
                                                handleUpdate = {this.props.handleUpdate}
                                                handleComplete = {this.props.handleComplete}
                                                />
                                    ))
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withTodos(ListsWrapper);