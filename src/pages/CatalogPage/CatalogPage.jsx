import cls from './CatalogPage.module.scss';

import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { ITEMS_PER_PAGE } from '../../constants';

import { fetchQuizzes } from '../../redux/slices/quizesSlice';
import { Button } from '../../ui';
import QuizFilters from '../../components/QuizFilters';
import QuizCatalogItem from '../../components/QuizCatalogItem';

const CatalogPage = () => {
  const { quizes, status, passed100Ids } = useSelector((state) => state.quizes);
  const { searchValue, isSearching } = useSelector((state) => state.search);
  const { activeCategoryIndex } = useSelector((state) => state.filters);
  const [visibleCount, setVisibleCount] = React.useState(ITEMS_PER_PAGE);
    console.log(1);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  React.useEffect(() => {
    queueMicrotask(() => {
      setVisibleCount(ITEMS_PER_PAGE);
    });
  }, [searchValue, activeCategoryIndex]);

  const filterList = quizes.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchValue.toLowerCase());
    const matchesCategory = activeCategoryIndex === 0 || item.category.includes(activeCategoryIndex);
    return matchesSearch && matchesCategory;
  });

  // 3. Вырезаем только ту часть, которую нужно показать
  const visibleList = filterList.slice(0, visibleCount);

  // Обработчик клика по кнопке
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const getUIStatus = () => {
    if (status === 'loading') return 'loading';
    if (status === 'error') return 'error';
    if (isSearching) return 'searching';
    if (filterList.length === 0) return 'empty';

    return 'success';
  };

  const currentStatus = getUIStatus();

  return (
    <section className={`${cls.catalog} container `}>
      <div className={cls.inner}>
        <h2 className={`${cls.title} title`}>Каталог квизов</h2>

        <QuizFilters />

        <ul className={cls.list}>
          {currentStatus === 'loading' && <li>Загрузка квизов...</li>}
          {currentStatus === 'searching' && <li>Поиск...</li>}
          {currentStatus === 'error' && <li>Ошибка при загрузке квизов</li>}
          {currentStatus === 'empty' && <li>Квизы не найдены</li>}
          {currentStatus === 'success' &&
            visibleList.map((item) => {
              const isPassed = passed100Ids.includes(`${item.id}`);
              return <QuizCatalogItem key={item.id} {...item} isPassed={isPassed} />;
            })}
        </ul>
        {visibleCount < filterList.length && <Button onClick={handleShowMore}>Показать больше</Button>}
      </div>
    </section>
  );
};

export default CatalogPage;
