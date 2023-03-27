import './App.css';
import React from 'react'
import ListsWrapper from './components/TodoList/ListsWrapper';

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <header>
                <h1> Todo-List App Created by Tian</h1>
                </header>
                <ListsWrapper />
            </div>
        );
        }
    }

export default App;
