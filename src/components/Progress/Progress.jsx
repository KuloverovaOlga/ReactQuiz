import cls from './Progress.module.scss';

const Progress = (props) => {
  const percentage = Math.round((props.step / props.count) * 100);
  return (
    <div className={cls.progress}>
      <div className={cls.bar}>
        <div className={cls.thumb} style={{ width: `${percentage}%` }}></div>
      </div>
      <p className={cls.question}>
        {props.step} из {props.count}
      </p>
    </div>
  );
};

export default Progress;
