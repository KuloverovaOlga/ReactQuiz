import cls from './Tab.module.scss';

const Tab = (props) => {
  return (
    <button className={`${cls.tab} ${props.isActive ? cls.isActive : ''}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Tab;
