import cls from './QuizAnswer.module.scss';

const QuizAnswer = (props) => {
  return (
    <li onClick={props.onClick} className={cls.answer} data-id="1">
      {props.children}
    </li>
  );
};

export default QuizAnswer;
