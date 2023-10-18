import { useState } from "react";
import { Form } from "./components/Form/Form";
import { TodoList } from "./components/List/TodoList";
import { Balance } from "./components/Balance/Balance";
import { Filter } from "./components/Filter/Filter";
import { CardTitle } from "./components/CardTitle/CardTitle";
import style from "./App.module.css";


const App = () => {
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(null);
  const [filter, setFilter] = useState({ input: "", checkbox: "Todos"});
  const [balance, setBalance] = useState(Number);
  return (
    <div className={style.container}>
      <div className={style.appwrapper}>
        <Balance 
          balance={balance}
          setBalance={setBalance}
        />
        <div className={style.container_cards}>
          <div className={style.Card}>
            <CardTitle title="Nuevo movimiento" count={0} />
            <Form
              todos={todos}
              setTodos={setTodos}
              edit={edit}
              setEdit={setEdit}
              balance={balance}
              setBalance={setBalance}
            />
          </div>

          <div className={style.Card}>
            <CardTitle title="Registro de movimientos" count={todos.length} />
            <Filter
              filter={filter}
              setFilter={setFilter} 
            />
            <TodoList
              todos={todos}
              setTodos={setTodos}
              setEdit={setEdit}
              filter={filter}
              balance={balance}
              setBalance={setBalance}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;