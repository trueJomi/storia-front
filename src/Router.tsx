import React from 'react'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { type LayoutNav } from './models/utils/Layout.model'
import ImagesGenerte from './pages/Images'
import QuestionsPage from './pages/Questions'
import { GiNotebook } from 'react-icons/gi'
import Layout from './components/Layout'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import Error404 from './components/Error404'
import PrivateRoute from './hooks/PrivateRoute.hook'
import { FaHistory } from 'react-icons/fa'
import OnlyPublicRoute from './hooks/OnlyPublicRoute.hook'
import ViewStory from './pages/ViewStory'
import HistoryPage from './pages/History'
import DownloadView from './pages/Download'

const tabsNav: LayoutNav[] = [
  {
    name: 'Inicio',
    path: '/',
    icon: <GiNotebook/>
  },
  {
    name: 'Historial',
    path: '/history',
    icon: <FaHistory/>
  }
]

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={
        <PrivateRoute>
          <Layout routes={tabsNav} >
            <Outlet/>
          </Layout>
        </PrivateRoute>
      }
      >
        <Route path='' element={<HomePage/>} />
        <Route path='history' element={<HistoryPage/>} />
        <Route path='images/:id' element={<ImagesGenerte/>} />
        <Route path='images' element={<Navigate to='/history' />} />
        <Route path='questions/:id' element= {<QuestionsPage/>} />
        <Route path='questions' element={<Navigate to='/history' />} />
        <Route path="story" element= {<Navigate to="/"/>} />
        <Route path='story/:id' element={<ViewStory/>} />
      </Route>
      <Route path='story/d/:id' element={<PrivateRoute><DownloadView/></PrivateRoute>} />
      <Route path='login' element={<OnlyPublicRoute><LoginPage/></OnlyPublicRoute>} />
      <Route path='*' element={<Error404/>} />
    </Routes>
  )
}

export default Router
