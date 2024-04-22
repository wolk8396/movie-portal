import React, { useEffect, useState } from 'react';

import './main.scss'
import Paginator from '../../shared/UI/Paginator/Paginator';
import { movieApi } from '../../core/services/movi.services';
import Content from './content/content';
import { Movie } from '../../shared/consts/moky';
import { useWindowResize } from '../../core/hooks/useWindowResize';
import { useMapDate } from '../../core/hooks/mapDateHooks';
import Filters from './filters/filters';
import Select from '../../shared/UI/select/select';
import { Collection } from '../../shared/consts/collection';
import { MapDateFilms, MovieItem, MovieModel } from '../../core/models/movie.models';
import { useAppDispatch } from '../../redux/store';
import { stopAction } from '../../redux/actions/loading';
import Input from '../../shared/UI/input/input';
import { inputStyle } from '../../shared/consts/ui-style';
import { useDebounce } from '../../core/hooks/debounce';
import { Sort } from '../../shared/consts/sort';
import { DynamicKeyModels } from '../../core/models/dynamic.key.models';

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>('')
  const debounced = useDebounce(value, 400);
  const {screenHeight} = useWindowResize();
  const [page, setPage] = useState<number>(1);
  const [type, setType] = useState<string>('TOP_POPULAR_ALL');
  const [typeSort, setTypeSort] = useState<DynamicKeyModels>();
  const [trigger, search] = movieApi.useLazySearchQuery();
  const {isSuccess, data } = movieApi.useGetCollectionsMovieQuery({type:type, page:page});
  const [isDate, setIsDate] = useState<MovieModel| null>(null);
  const {dateFilm} = useMapDate(isDate?.items, isSuccess, typeSort);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
  if (typeof data !== 'undefined' && isSuccess) {
    setIsDate(data);
    setTotalPages(data.totalPages);
  };
  }, [page, data])

  useEffect(() => {
    if (typeof search.data !== 'undefined' && search.isSuccess) {
      setIsDate(search.data);
      setTotalPages(search.data.totalPages);
    }
  }, [search.data, page]);

  useEffect(() => {
    if (debounced.length >= 3) {
      setTotalPages(0);
      setPage(1);
      setType('');
      trigger({text:debounced, page:page})
    };
  }, [debounced])

  const handleOptionClick = (value: string) => {
    setTotalPages(0);
    setPage(1);
    setType(value);
  };

  const handleSearchMovie = (e:React.ChangeEvent<HTMLInputElement>) => { 
    let text = e.target.value;
    setValue(text);
  };

  return (
    <>
      <Filters 
        select={
          <Select 
            title='Collection'
            collection={Collection} 
            onGetValue={(option) => handleOptionClick(option.value)}
          />
        }
        input={
          <Input 
            placeholder='Search Movie' 
            onChange={handleSearchMovie}
            onFocus={() => dispatch(stopAction(false))}
            onBlur={() => dispatch(stopAction(true))}
            styleConf={inputStyle}
          />
        }
        sort= {
          <Select 
            title='Sort films'
            collection={Sort} 
            onGetValue={(option) => setTypeSort(option)}
          />
        }
      />
      <div className='wrapper-main' style={{height: `${screenHeight - 140}px`}}>
        <Content date={dateFilm}/>
        <div className='footer'>
          <Paginator 
            totalPages={totalPages} 
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </>
  )
}

export default Main;
