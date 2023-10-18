import { useEffect, useState } from "react";
import style from "./Form.module.css";
import uuid4 from "uuid4";
import PropTypes from 'prop-types';

const initialStates = {
  type: "Gastos",
  name: "",
  amount: 0
};

export const Form = ({ todos, setTodos, edit, setEdit, balance, setBalance }) => {
  const [values, setValues] = useState(initialStates);

  const handlerSubmit = (e) => {
    e.preventDefault();
    
    if (values.name.trim() === "") {
      return alert("El nombre no puede estar vacío");
    }

    if (parseInt(values.amount) <= 0) {
      return alert("La cantidad debe ser mayor que 0");
    }

    var actualBalance = parseInt(balance);

    console.log('entro');

    if (edit) {

      if(edit.type !== values.type) {
        if(edit.type === "Gastos"){
          setBalance(actualBalance + parseInt(edit.amount) + parseInt(values.amount));
        }
        else {
          if (actualBalance - parseInt(edit.amount) - parseInt(values.amount) < 0){
            alert("No tienes suficiente saldo");
            return;
          }

          setBalance(actualBalance - parseInt(edit.amount) - parseInt(values.amount));
        }
      }else{
        if(edit.type === "Gastos"){
          if (actualBalance + parseInt(edit.amount) - parseInt(values.amount) < 0){
            alert("No tienes suficiente saldo");
            return;
          }

          setBalance(actualBalance + parseInt(edit.amount) - parseInt(values.amount));
        }
        else {
          setBalance(actualBalance - parseInt(edit.amount) + parseInt(values.amount));
        }
      }

      editTodo(values);
      alert('Movimiento actualizado correctamente');
    } else {
      if(values.type === "Gastos"){
        if (actualBalance - parseInt(values.amount) < 0){
          alert("No tienes suficiente saldo");
          return;
        }

        setBalance(actualBalance - parseInt(values.amount));
      }
      else {
        setBalance(actualBalance + parseInt(values.amount));
      }

      const newTodo = {
        id: uuid4(),
        ...values
      };

      setTodos([...todos, newTodo]);
      setValues(initialStates);

      alert('Movimento agregado correctamente');
    }
  };

  const editTodo = (todo) => {
    console.log(todo);
    const newTodos = todos.map((item) =>
      item.id === todo.id ? { id: todo.id, type: todo.type, name: todo.name, amount: todo.amount } : item
    );
    setTodos(newTodos);
    setEdit(null);
  };

  const cancelEdit = () => {
    setValues(initialStates);
    setEdit(null);
  };

  useEffect(() => {
    if (edit) setValues(edit)
    else setValues(initialStates)
  }, [edit]);

  return (
    <form onSubmit={handlerSubmit} className={style.Form_Register}>

      <label className={style.container_input}>
        <span className={style.Input_Title}>Tipo</span>
        <select id="type" name="type" className={style.Input_Form} value={values.type} onChange={(e) => setValues({...values, type: e.target.value})}>
          <option value="Gastos">Gastos</option>
          <option value="Ingresos">Ingresos</option>
        </select>
      </label>

      <label className={style.container_input}>
        <span className={style.Input_Title}>Nombre</span>
        <input id="name" name="name" type="text" className={style.Input_Form} value={values.name} onChange={(e) => setValues({...values, name: e.target.value})}></input>
      </label>

      <label className={style.container_input}>
        <span className={style.Input_Title}>Cantidad</span>
        <input id="amount" name="amount" type="number" className={style.Input_Form} value={values.amount} onChange={(e) => setValues({...values, amount: e.target.value})}></input>
      </label>

      <div className={style.Container_Button}>
        <button className={style.Button_Submit} onClick={() => cancelEdit()} type="button">
          Cancelar
        </button>

        <button className={style.Button_Submit} type="submit">Agregar
          <svg className={style.svgIcon} viewBox="0 0 576 512">
            <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path>
            </svg>
        </button>
      </div>


    </form>
  );
};

Form.propTypes = {
  todos: PropTypes.array.isRequired,
  setTodos: PropTypes.func.isRequired,
  edit: PropTypes.object,
  setEdit: PropTypes.func.isRequired,
  balance: PropTypes.number.isRequired,
  setBalance: PropTypes.func.isRequired
};