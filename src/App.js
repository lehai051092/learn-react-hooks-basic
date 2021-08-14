import './App.scss';
import ColorBox from "./components/ColorBox";
import {useEffect, useState} from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";

function App() {
    const [todoList, setTodoList] = useState(
        [
            {id: 1, title: 'I love Easy Frontend! 😍 '},
            {id: 2, title: 'We love Easy Frontend! 🥰 '},
            {id: 3, title: 'They love Easy Frontend! 🚀 '},
        ]
    );

    const [postList, setPostList] = useState([]);

    useEffect(() => {
        async function fetchPostList() {
            try {
                const requestUrl = 'https://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1';
                const response = await fetch(requestUrl);
                const responseJSON = await response.json();
                const {data} = responseJSON;
                setPostList(data);
            } catch (e) {
                console.log(e.message);
            }
        }

        fetchPostList();
    }, []);

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
            <hr/>
            <h2>Post List</h2>
            <PostList postList={postList}/>
        </div>
    );
}

export default App;
