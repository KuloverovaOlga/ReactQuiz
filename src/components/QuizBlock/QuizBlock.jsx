import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getDeclension } from '../../helpers/getDeclension';

import cls from './QuizBlock.module.scss';
import { ArrLeftIcon, ArrRightIcon } from '../../components/Icons';
import QuizAnswer from '../QuizAnswer';
import Progress from '../Progress';


import { fetchQuizById, selectAnswer, nextQuestion, prevQuestion, resetQuiz } from '../../redux/slices/currentQuisSlise';
import { addPassedQuizId } from '../../redux/slices/quizesSlice';

import { Button } from '../../ui';

const QuizBlock = () => {
  const { quizeId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { data, step, userAnswers, status } = useSelector((state) => state.currentQuiz);

  React.useEffect(() => {
    if (quizeId) {
      dispatch(fetchQuizById(quizeId));
    }
  }, [dispatch, quizeId]);

  const getUIStatus = () => {
    if (status === 'loading') return 'loading';
    if (status === 'error' || !data) return 'error';
    return 'success';
  };

  const currentStatus = getUIStatus();


  const isFinished = currentStatus === 'success' && step >= data.questions.length;

  const rightAnswers = React.useMemo(() => {
    if (!isFinished) return [];
    return data.questions.filter((item, i) => item.correctAnswer === +userAnswers[i]);
  }, [isFinished, data, userAnswers]);

  const is100Percent = isFinished && rightAnswers.length === data?.questions?.length;

 
  React.useEffect(() => {
    if (is100Percent && data?.id) {
      dispatch(addPassedQuizId(data.id));
    }
  }, [is100Percent, data?.id, dispatch]);


  const handleGoHome = () => {
    dispatch(resetQuiz());
    navigate('/quizes', { replace: true });
  };


  if (isFinished) {
    const count = data.questions.length;

    return (
      <div className={cls.quiz}>
        <h3 className={`${cls.title} title`}>Квиз завершен!</h3>
        <p>
          Ты ответил на {rightAnswers.length} {getDeclension(rightAnswers.length, ['вопрос', 'вопроса', 'вопросов'])} из {count}
        </p>
        <Button onClick={handleGoHome}>К списку квизов</Button>
      </div>
    );
  }

  const currentQuestion = data?.questions[step];
  const selectedAnswerIndex = userAnswers[step];
  const hasAnswered = selectedAnswerIndex !== undefined;

  const handleSelectOption = (index) => {
    dispatch(selectAnswer({ step, answerIndex: index }));
    dispatch(nextQuestion());
  };

  return (
    <>
      {currentStatus === 'loading' && <div>Загрузка...</div>}
      {currentStatus === 'error' && <div>Произошла ошибка</div>}

      {currentStatus === 'success' && currentQuestion && (
        <div className={cls.quiz}>
          <h3 className={`${cls.title} title`}>{data.title}</h3>

          <Progress step={step + 1} count={data.questions.length} />

          <div className={cls.main}>
            <span className={cls.question}>{currentQuestion.question}</span>

            <ul className={cls.answers}>
              {currentQuestion.options.map((item, i) => (
                <QuizAnswer key={i} active={selectedAnswerIndex === i} onClick={() => handleSelectOption(i)}>
                  {item}
                </QuizAnswer>
              ))}
            </ul>
          </div>

          <div className={cls.btns}>
            <button type="button" className={cls.btn} disabled={step === 0} onClick={() => dispatch(prevQuestion())}>
              <ArrLeftIcon />
            </button>

            <button type="button" className={cls.btn} disabled={!hasAnswered} onClick={() => dispatch(nextQuestion())}>
              <ArrRightIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizBlock;
