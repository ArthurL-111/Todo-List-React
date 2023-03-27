import React from 'react'
import { getTodos, addTodo, updateTodo, deleteTodo } from '../api/apiClient'

export const withTodos = (WrappedComponent) => {
    return class NewComponent extends React.Component {
        state = {
            todos: []
        };

        componentDidMount() {
            console.log('App mounting...')
            getTodos()
                .then((data) => {
                    const todos = [];
                    data.forEach(element => {
                        todos.push(element);
                    });
                    this.setState({todos})
                })
                .catch((err) =>{
                    console.log(`Init failed: ${err}`);
                });
        }

        componentDidUpdate() {
            console.log('updating...');
        }

        addNewTask = (newTask) => {
            this.setState((prev) => ({
                todos: [...prev.todos, newTask]
            }));
        }

        deleteTask = (id) => {
            this.setState((prev) => ({
                todos: prev.todos.filter(item => item.id !== +id)
            }));
        }

        updateTask = (id, newTask) => {
            this.setState((prev) => ({
                todos: prev.todos.map(item => {
                    if (item.id === +id) {
                        return newTask
                    } else {
                        return item
                    }
                }),
            }))
        }

        handleSubmit = (content) => {
            console.log('Submitting...')
            if(content.trim() === "") {
                alert("please input content!");
                return;
            }
            const newTodo = { content: content, done: false };
            addTodo(newTodo)
                .then(res => {
                    this.addNewTask(res);
                })
                .catch((err) => console.log(`Add task failed: ${err}`));
        };

        handleDelete = (id) => {
            console.log('Deleting...')
            deleteTodo(id)
                .then((res) => {
                    this.deleteTask(id);
                })
                .catch((err) => {
                    console.log(`Delete task error: ${err}`);
                });
        }

        handleUpdate = (todo, update_content) => {
            console.log('Updating...');
            const updatedTodo = {...todo, content: update_content};
            if (update_content.trim() === ''){
                alert('Please input content!')
            } else {
                updateTodo(todo.id, updatedTodo)
                    .then((res) => {
                        this.updateTask(todo.id, updatedTodo)
                    })
                    .catch((err) => {
                        console.log(`Update error: ${err}`)
                    })
            }
        }

        handleComplete = (todo) => {
            console.log('Completing...')
            const updatedTodo = {...todo, done: !todo.done};
            console.log('updated todo: ', updatedTodo)
            updateTodo(todo.id, updatedTodo)
                .then((res) => {
                    this.updateTask(todo.id, updatedTodo)
                })
                .catch((err) => {
                    console.log(`Update error: ${err}`)
                })
        }

        render() {
            return (
                <WrappedComponent 
                        pendingTasks = {this.state.todos.filter(todo => todo.done === false).reverse()}
                        completedTasks = {this.state.todos.filter(todo => todo.done === true).reverse()}
                        handleSubmit = {this.handleSubmit}
                        handleDelete = {this.handleDelete}
                        handleUpdate = {this.handleUpdate}
                        handleComplete = {this.handleComplete}
                    />
            );
        }


    }
};