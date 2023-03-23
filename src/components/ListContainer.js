import React from "react";
import styles from "./list.module.css";
import TaskItem from "./TaskItem";

class ListContainer extends React.Component{
    render() {
        const { type, tasks } = this.props;
        return (
            <div className={styles.list_container}>
                <h3 className={styles.list_title}>{type} Tasks</h3>
                {tasks.map((item, index) => (
                                <TaskItem content = {item.content} 
                                          id = {item.id} 
                                          key = {index} 
                                          deleteTask = {this.props.deleteTask}
                                          type = {type}/>
                            ))}
            </div>
        );
    }
}

export default ListContainer;