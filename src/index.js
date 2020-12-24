import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import 'bulma/css/bulma.css'

const Header = (props) => {
    return(
        <div className='card-header'>
            <h1 className='card-header-title header'>
                You have {props.numTodos} Todos
            </h1>
        </div>
    );
}

const TodoList = (props) => {
    const todos = props.tasks.map((todo, index) => {
        return <Todo
            content={todo}
            key={index}
            id={index}
            onDelete={props.onDelete}
        />
    })
    return(
        <div className='list-wrapper'>
            {todos}
        </div>
    );
}

const Todo = (props) => {
    return(
        <div className='list-item'>
            {props.content}
            <button
                className="delete is-pulled-right"
                onClick={() => {props.onDelete(props.id)}}
            ></button>
        </div>
    );
}

const SubmitForm = (props) => {
    const [state, setState] = useState({ term: '' })

    const handleSubmit = (e) => {
        e.preventDefault();
        if(state.term === '') return;
        props.onFormSubmit(state.term);
        setState({ term: '' });
    }

    return(
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                className='input'
                placeholder='Enter Item'
                value={state.term}
                onChange={(e) => setState({term: e.target.value})}
            />
            <button className='button'>Submit</button>
        </form>
    );
}

let Settings = ({toggleColor}) => {
    console.log('ii')
    return <div className='settings-component'>
        <span>Settings:</span>
        <button onClick={toggleColor} className='button'>change background color</button>
    </div>;
};

Settings = React.memo(Settings)

const App = () => {
    const [state, setState] = useState({
        tasks: ['task 1', 'task 2', 'task 3'],
        isColorDark: false
    })

    const handleChangeColor = useCallback(() =>{
        setState(state => ({...state, isColorDark : !state.isColorDark}))
    }, [setState])

    const handleSubmit = task => {
        setState({tasks: [...state.tasks, task]});
    }

    const handleDelete = (index) => {
        const newArr = [...state.tasks];
        newArr.splice(index, 1);
        setState({tasks: newArr});
    }


    return(
        <div className={`wrapper ${state.isColorDark ? 'dark' : 'white'}`}>
            <Settings toggleColor={handleChangeColor}/>
            <div className='card frame'>
                <Header
                    numTodos={state.tasks.length}
                />
                <TodoList
                    tasks = {state.tasks}
                    onDelete = {handleDelete}
                />
                <SubmitForm onFormSubmit={handleSubmit} />
            </div>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
