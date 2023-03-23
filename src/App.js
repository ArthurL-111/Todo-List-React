import './App.css';
import React from 'react'
import ListsWrapper from './components/ListsWrapper';
import SubmitFrom from './components/SubmitForm';
import { getTodos } from './api/apiClient';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pending: [],
            completed: []
        };
    }

    componentDidMount() {
        console.log('App mounting...')
        getTodos()
            .then((data) => {
                const pending = [];
                const completed = [];
                data.forEach(element => {
                    if (!element.done){
                        pending.push(element);
                    } else {
                        completed.push(element);
                    }
                });
                this.setState({pending, completed})
            })
            .catch((err) =>{
                console.log(`Init failed: ${err}`);
            });
    }

    componentDidUpdate() {
        console.log('updating...')
    }

    addNewTask = (newTask) => {
        if (!newTask.done) {
            this.setState((prev) => ({
                pending: [...this.state.pending, newTask],
                completed: prev.completed,
            }));
        } else {
            this.setState((prev) => ({
                pending: prev.pending,
                completed: [...this.state.completed, newTask],
            }));
        }
    }

    deleteTask = (id) => {
        this.setState((prev) => ({
            pending: prev.pending.filter(item => item.id !== +id),
            completed: prev.completed.filter(item => item.id !== +id)
        }));
    }

    updateTask = (id, newTask) => {
        this.setState((prev) => ({
            pending: prev.pending.map(item => {
                if (item.id === +id) {
                    return newTask
                } else {
                    return item
                }
            }),
            completed: prev.completed.map(item => {
                if (item.id === +id) {
                    return newTask
                } else {
                    return item
                }
            }),
        }))
    }

    render() {
        return (
            <div className="App">
                <header>
                <h1> Todo-List App Created by Tian</h1>
                </header>
                <SubmitFrom addNewTask = {this.addNewTask}/>
                <ListsWrapper 
                    pendingTasks = {this.state.pending}
                    completedTasks = {this.state.completed}
                    deleteTask = {this.deleteTask}
                    updateTask = {this.updateTask}
                />
            </div>
        );
        }
    }

export default App;
