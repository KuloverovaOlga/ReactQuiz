import React from 'react';
import cls from './Search.module.scss';
import { SearchIcon, CloseIcon } from '../Icons';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue, setIsSearching } from '../../redux/slices/searchSlice';

const Search = () => {
  const dispatch = useDispatch();
  const [innerValue, setInnerValue] = React.useState('');
  const inputRef = React.useRef(null);

  const debouncedSearch = React.useMemo(
    () =>
      debounce((value) => {
        dispatch(setSearchValue(value));
        dispatch(setIsSearching(false));
      }, 500),
    [dispatch]
  );

  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const onChangeInput = (e) => {
    dispatch(setIsSearching(true));
    const value = e.target.value;
    setInnerValue(value);
    debouncedSearch(value);
  };

  const clearInput = () => {
    debouncedSearch.cancel();
    setInnerValue('');
    dispatch(setSearchValue(''));
    dispatch(setIsSearching(false));
    inputRef.current?.focus();
  };

  return (
    <div className={cls.search}>
      <label className={cls.label}>
        <input
          ref={inputRef}
          onChange={onChangeInput}
          value={innerValue}
          className={cls.input}
          type="text"
          placeholder="Найти квиз"
        />
      </label>

      {/* Пробрасываем onClick на обертку или сам крестик */}
      <div className={cls.loupe}>
        {innerValue.length > 0 ? (
          <button type="button" onClick={clearInput} className={cls.clearBtn}>
            <CloseIcon />
          </button>
        ) : (
          <SearchIcon />
        )}
      </div>
    </div>
  );
};

export default Search;
