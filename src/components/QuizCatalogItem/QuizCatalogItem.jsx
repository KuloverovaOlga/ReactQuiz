import cls from './QuizCatalogItem.module.scss';
import lamp from '../../assets/images/lamp.png';
import lampon from '../../assets/images/lampon.png';

import { getDeclension } from '../../helpers/getDeclension';

import { Link } from 'react-router-dom';

const QuizCatalogItem = (props) => {

  return (
    <li className={`${cls.item} ${props.isPassed ? cls.isPassed : ''}`}>
      <Link to={`/quizes/${props.id}`} className={cls.link}>
        <h3 className={cls.title}>{props.title}</h3>
        <div className={cls.img}>
          <img src={lamp} alt="" className="catalog__img img1" />
          <img src={lampon} alt="" className="catalog__img img2" />
        </div>
        <p className={cls.count}>
          {props.questions.length} {getDeclension(props.questions.length, ['вопрос', 'вопроса', 'вопросов'])}
        </p>
      </Link>
    </li>
  );
};

export default QuizCatalogItem;
