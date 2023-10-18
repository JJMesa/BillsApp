import style from './filter.module.css'
import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
export function Filter({ filter, setFilter}) {

    const handleCheckBox = (e) => {    
        if (e.target.checked) {
            setFilter({...filter, checkbox: e.target.name});

            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach((checkbox) => {
                if (checkbox !== e.target) {
                    checkbox.checked = false;
                }
            });
        } else {
            document.getElementById('Todos').checked = true;
            setFilter({...filter, checkbox: "Todos"});
        }
    };

    useEffect(() => {
        setFilter({ input: "", checkbox: "Todos" });

        document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            if(checkbox.name == "Todos"){
                checkbox.checked = true;
            }
        });
      }, [setFilter]);

    return (
        <div className={style.container_filter}>
            <input name="input" id="input" type="text" className={style.input_filter} onChange={(e) => setFilter({...filter, input: e.target.value})}  />
            <label><input type="checkbox" id="Todos" name="Todos" className={style.checkbox_filter} onChange={(e) => handleCheckBox(e)}></input> Todos</label>
            <label><input type="checkbox" name="Gastos" className={style.checkbox_filter} onChange={(e) => handleCheckBox(e)}></input> Gastos</label>
            <label><input type="checkbox" name="Ingresos" className={style.checkbox_filter} onChange={(e) => handleCheckBox(e)}></input> Ingresos</label>
        </div>
    )
}