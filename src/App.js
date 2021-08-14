import './App.scss';
import ColorBox from "./components/ColorBox";
import {useState} from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {
    const [todoList, setTodoList] = useState(
        [
            {id: 1, title: 'I love Easy Frontend! 😍 '},
            {id: 2, title: 'We love Easy Frontend! 🥰 '},
            {id: 3, title: 'They love Easy Frontend! 🚀 '},
        ]
    );

    const handleTodoClick = (todo) => {
        const index = todoList.findIndex(x => x.id === todo.id);
        if (index < 0) return;
        const newTodoList = [...todoList];
        newTodoList.splice(index, 1);
        setTodoList(newTodoList);
    }

    const handleTodoFormSubmit = (formValues) => {
        const newTodoList = [...todoList];
        const newTodo = {
            id: (newTodoList[newTodoList.length - 1]) ? newTodoList[newTodoList.length - 1].id + 1 : 1,
            title: formValues.title
        };
        newTodoList.push(newTodo);
        setTodoList(newTodoList);
    }

    return (
        <div className="app">
            <h1>Welcome to React Hooks!</h1>
            <hr/>
            <h2>Color Box</h2>
            <ColorBox/>
            <hr/>
            <h2>Todo List</h2>
            <TodoList todoList={todoList} onTodoClick={handleTodoClick}/>
            <hr/>
            <h2>Todo Form</h2>
            <TodoForm onSubmit={handleTodoFormSubmit}/>
        </div>
    );
}

export default App;
