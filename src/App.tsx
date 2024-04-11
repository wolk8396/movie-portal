import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { PATHNAMES } from './app/shared/consts/routes';

import Header from './app/core/components/header/header';
import Main from './app/modules/main/main';
import Film from './app/modules/film/film';
import SignUP from './app/modules/sign-up/sign-up';
import SignIN from './app/modules/sign-in/sign-in';
import Favorites from './app/modules/favorites/favorites';
import NotFound from './app/modules/error/error';
import { useWindowResize } from './app/core/hooks/useWindowResize';

function App() {
  return (
    <div className='wrapper'>
      <header className='header-app'>
        <Header/>
      </header>
      <main className='main-app'>
        <Routes>
          <Route path={PATHNAMES.main} element={<Main/>}/>
          <Route path={PATHNAMES.film} element={<Film/>} />
          <Route path={PATHNAMES.favorites} element={<Favorites/>} />
          <Route path={PATHNAMES.sign_up} element={<SignUP/>} />
          <Route path={PATHNAMES.sign_in} element={<SignIN/>} />
          <Route path={PATHNAMES.error} element={<NotFound/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
