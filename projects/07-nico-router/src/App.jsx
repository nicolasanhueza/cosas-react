import { lazy } from 'react'
import { Suspense } from 'react'

import './App.css'

import { Router } from './Router.jsx'
import { Route } from './Route.jsx'

const LazyHomePage = lazy(() => import('./pages/Home.jsx'))
const LazyAboutPage = lazy(() => import('./pages/About.jsx'))
const LazyPage404 = lazy(() => import('./pages/404.jsx'))
const LazySearchPage = lazy(() => import('./pages/Search.jsx'))

const appRoutes = [
  {
    path: '/search/:query',
    Component: LazySearchPage
  }
]

function App() {

  return (
    <main>
      <Suspense fallback={null}>
        <Router routes={appRoutes} defaultComponent={LazyPage404}>
          <Route path='/' Component={LazyHomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
