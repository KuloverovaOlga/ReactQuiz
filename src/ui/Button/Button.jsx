import cls from './Button.module.scss';

const Button = (props) => {
  return (
    <button onClick={props.onClick} className={`${cls.btn} ${props.isActive ? cls.isActive : ''}`}>
      {props.children}
    </button>
  );
};

export default Button;
