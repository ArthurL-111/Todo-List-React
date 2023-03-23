import React from 'react';
import ListContainer from './ListContainer';
import styles from './list.module.css'

class ListsWrapper extends React.Component {
    render() {
        return (
            <div className={styles.lists_wrapper}>
                <ListContainer type = 'Pending' tasks = {this.props.pendingTasks} deleteTask = {this.props.deleteTask}/>
                <ListContainer type = 'Completed' tasks = {this.props.completedTasks} deleteTask = {this.props.deleteTask}/>
            </div>
        );
    }
}

export default ListsWrapper;