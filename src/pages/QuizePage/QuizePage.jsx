import QuizBlock from '../../components/QuizBlock';
import cls from './QuizePage.module.scss';

const QuizePage = () => {


  return (
    <section className={`${cls.quiz} container`}>
      <div className={cls.inner}>
        <QuizBlock />
      </div>
    </section>
  );
};

export default QuizePage;
