import TodoItem from "../Item/TodoItem";
import PropTypes from 'prop-types';

export const TodoList = ({ todos, setTodos, filter, setEdit, balance, setBalance }) => {
  const deleteTodo = ({ id }) => {
    var deleteTodo = todos.find(todo => todo.id === id);

    if(deleteTodo.type === "Gastos"){
      setBalance(parseInt(balance) + parseInt(deleteTodo.amount));
    }else {
      setBalance(parseInt(balance) - parseInt(deleteTodo.amount));
    }

    setTodos(todos.filter((todo) => todo.id !== id));
  };
  
  const editTodo = (todo) => {
    setEdit(todo);
  };

  return (
    <div>
      {todos
        .filter(todo => (todo.name.toLowerCase().includes(filter.input.toLowerCase()) || filter.input === "") && (todo.type.includes(filter.checkbox) || filter.checkbox === "Todos"))
        .map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  setTodos: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  balance: PropTypes.number.isRequired,
  setBalance: PropTypes.func.isRequired
};