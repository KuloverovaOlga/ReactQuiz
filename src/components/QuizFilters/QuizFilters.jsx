import cls from './QuizFilters.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '../../ui';

import { CATEGORIES } from '../../constants';

import { setActiveCategoryIndex } from '../../redux/slices/filtersSlice';

const QuizFilters = () => {
  const dispatch = useDispatch();

  const { activeCategoryIndex } = useSelector((state) => state.filters);

  const onClickTab = (id) => {
    dispatch(setActiveCategoryIndex(id));
  };

  return (
    <div className={cls.filtersWrap}>
      <ul className={cls.filters}>
        {CATEGORIES.map((item) => (
          <Tab isActive={activeCategoryIndex === item.id} onClick={() => onClickTab(item.id)} key={item.id}>
            {item.name}
          </Tab>
        ))}
      </ul>
    </div>
  );
};

export default QuizFilters;
