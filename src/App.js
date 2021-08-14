import './App.scss';
import ColorBox from "./components/ColorBox";
import {useEffect, useState} from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import queryString from 'query-string';
import PostFiltersForm from "./components/PostFiltersForm";
import Clock from "./components/Clock";
import BetterClock from "./components/BetterClock";
import MagicBox from "./components/MagicBox";

function App() {
    const [todoList, setTodoList] = useState(
        [
            {id: 1, title: 'I love Easy Frontend! 😍 '},
            {id: 2, title: 'We love Easy Frontend! 🥰 '},
            {id: 3, title: 'They love Easy Frontend! 🚀 '},
        ]
    );

    const [postList, setPostList] = useState([]);
    const [pagination, setPagination] = useState(
        {
            _page: 1,
            _limit: 10,
            _totalRows: 1
        }
    );
    const [filters, setFilters] = useState({
        _limit: 10,
        _page: 1,
        title_like: ''
    });

    useEffect(() => {
        async function fetchPostList() {
            try {
                const paramsString = queryString.stringify(filters);
                const requestUrl = `https://js-post-api.herokuapp.com/api/posts?${paramsString}`;
                const response = await fetch(requestUrl);
                const responseJSON = await response.json();
                const {data, pagination} = responseJSON;
                setPostList(data);
                setPagination(pagination);
            } catch (e) {
                console.log(e.message);
            }
        }

        fetchPostList();
    }, [filters]);

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

    const handlePageChane = (newPage) => {
        setFilters({
            ...filters,
            _page: newPage
        });
    }

    const handleFiltersChange = (newFilters) => {
        setFilters(
            {
                ...filters,
                _page: 1,
                title_like: newFilters.searchTerm
            }
        )
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
            <PostFiltersForm onSubmit={handleFiltersChange}/>
            <PostList postList={postList}/>
            <Pagination pagination={pagination} onPageChange={handlePageChane}/>
            <hr/>
            <h2>Clock</h2>
            <Clock/>
            <BetterClock/>
            <hr/>
            <h2>Magic Box</h2>
            <MagicBox/>
        </div>
    );
}

export default App;
