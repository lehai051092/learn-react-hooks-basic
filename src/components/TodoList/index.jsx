import React from 'react';
import PropTypes from 'prop-types';

TodoList.propTypes = {
    todoList: PropTypes.array,
    onTodoClick: PropTypes.func,
};

TodoList.defaultProps = {
    todoList: [],
    onTodoClick: null
}

function TodoList(props) {
    const {todoList, onTodoClick} = props;
    const handleClick = (todo) => {
        if (onTodoClick) {
            onTodoClick(todo);
        }
    }
    return (
        <ul className='todo-list'>
            {todoList.map(todo => (
                <li key={todo.id} onClick={() => handleClick(todo)}>
                    {todo.title}
                </li>
            ))}
        </ul>
    );
}

export default TodoList;