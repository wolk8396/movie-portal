import React, { Suspense, lazy } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { PATHNAMES } from './app/shared/consts/routes';

import Header from './app/core/components/header/header';
import Spinner from './app/shared/UI/spinner/spinner';
import { useAppSelector } from './app/redux/store';
import { KEY_LOADING_APP } from './app/redux/slices/loadingSlice';

const Main = lazy(() => import('./app/modules/main/main'));
const Film = lazy(() => import('./app/modules/film/film'));
const SignUP = lazy(() => import('./app/modules/sign-up/sign-up'));
const SignIN = lazy(() => import('./app/modules/sign-in/sign-in'));
const Favorites = lazy(() => import('./app/modules/favorites/favorites'));
const NotFound =  lazy(() => import('./app/modules/error/error'));

function App() {
  const {loading, error} = useAppSelector(state => state[KEY_LOADING_APP]);
  return (
    <>
      <Spinner loading={loading}/>
      <div className='wrapper'>
      <header className='header-app'>
        <Header/>
      </header>
      <main className='main-app'>
        <Routes>
          <Route path={PATHNAMES.main} element={
            <Suspense fallback={<p></p>}>
              <Main/>
            </Suspense>
            }
          />
          <Route path={`${PATHNAMES.film}/:id`} element={
            <Suspense fallback={<p></p>}>
              <Film/>
            </Suspense>
          }/> 
          <Route path={PATHNAMES.favorites} element={
            <Suspense fallback={<p></p>}>
              <Favorites/>
            </Suspense>
          } />
          <Route path={PATHNAMES.sign_up} element={
             <Suspense fallback={<p></p>}>
              <SignUP/>
            </Suspense>
          } />
          <Route path={PATHNAMES.sign_in} element={
            <Suspense fallback={<p></p>}>
              <SignIN/>
            </Suspense>
          } />
          {/* <Route path={PATHNAMES.reject} element={
            <Suspense fallback={<p></p>}>
              <Main/>
           </Suspense>
          } /> */}
             <Route path={PATHNAMES.error} element={
            <Suspense fallback={<p></p>}>
              <NotFound/>
           </Suspense>
          } />
        </Routes>
      </main>
    </div>
    </>
  );
}

export default App;
