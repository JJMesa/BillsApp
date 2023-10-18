import style from './CardTitle.module.css';

// eslint-disable-next-line react/prop-types
export const CardTitle = ({ title, count }) => {
  return (
    <div className={style.Div_TitleMovements}>
      <label className={style.Label_Title}>{title}</label>
      <label className={count != 0 ? style.Label_Count : style.No_Show}>{count}</label>
    </div>
  );
}