import cls from './HomePage.module.scss';

import hero from '../../assets/images/hero.png';
import { Button } from '../../ui';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <section className={`${cls.hero} container`}>
      <div className={cls.inner}>
        <div className={cls.img}>
          <img alt="lamp" src={hero} />
        </div>

        <div className={cls.content}>
          <h1 className={`${cls.title} title`}>
            Онлайн квизы <br /> на разные темы
          </h1>
          <p className={cls.desc}>
            Разнообразные тематические квизы будут интересны не только взрослым людям, но и детям подросткового и младшего
            возраста
          </p>
          <Button
            onClick={() => {
              navigate('quizes');
            }}
          >
            Играть
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
