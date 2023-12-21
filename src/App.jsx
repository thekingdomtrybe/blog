import './styles.css'
import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import LandingPage from './views/LandingPage'
import Header from './components/Header'
import ReadPage from './views/ReadPage'
import Footer from './components/Footer'
import CategoryPage from './views/CategoryPage'
import MinisterPage from './views/MinisterPage'
import LoggedInMinisterPage from './views/MinisterPage[LoggedIn]'
import EditPage from './views/EditPage'
import WritePage from './views/WritePage'
import LoginPage from './views/LoginPage'
import ResetPage from './views/ResetPage'
import SetPasswordPage from './views/SetPasswordPage'
import UpdateMinisterPage from './views/UpdateMinisterPage'
import ChangePasswordPage from './views/ChangePasswordPage'
import AdminPage from './views/AdminPage'
import PreviewPage from './views/PreviewPage'
import ConfirmAccountPage from './views/ConfirmAccountPage'
import Data from './data/Data'
import ProtectedRoute from './components/ProtectedRoute'
import 'toastr/build/toastr.min.css'
import ThemeSwitch from './components/ThemeSwitch'

function App() {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [ministers, setMinisters] = useState([]);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [articlesLoaded, setArticlesLoaded] = useState(false);
  const [, setMinistersLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Data
        categoriesCallback={(data, isSuccess) => {
          setCategories(data);
          setCategoriesLoaded(isSuccess);
        }}
        articlesCallback={(data, isSuccess) => {
          setArticles(data);
          setArticlesLoaded(isSuccess);
        }}
        ministersCallback={(data, isSuccess) => {
          setMinisters(data);
          setMinistersLoaded(isSuccess);
        }}
      />
      <Header />
      <Routes>
        <Route path="/confirm" element={<ConfirmAccountPage />} />
        <Route path="/preview/:id/:url" element={<PreviewPage />} />
        <Route path="/admin" element={
          <ProtectedRoute admin>
            <AdminPage
              categories={categories}
              ministers={ministers}
            />
          </ProtectedRoute>
        } />
        <Route path="/change" element={<ChangePasswordPage />} />
        <Route path="/update" element={
          <ProtectedRoute fallback={<UpdateMinisterPage />}>
            <Navigate to="/" />
          </ProtectedRoute>
        } />
        <Route path="/set" element={
          <ProtectedRoute>
            <SetPasswordPage />
          </ProtectedRoute>
        } />
        <Route path="/reset" element={
          <ProtectedRoute>
            <ResetPage />
          </ProtectedRoute>
        } />
        <Route path="/login" element={
          <LoginPage />
        } />
        <Route path="/write" element={
          <ProtectedRoute fallback={<WritePage />} ministerOnly>
            <Navigate to="/" />
          </ProtectedRoute>
        } />
        <Route path="/edit/:id" element={
          <ProtectedRoute fallback={<EditPage />} ministerOnly>
            <Navigate to="/" />
          </ProtectedRoute>
        } />
        <Route path="/minister/:url" element={
          <ProtectedRoute fallback={<LoggedInMinisterPage />}>
            <MinisterPage />
          </ProtectedRoute>
        } />
        <Route path="/category/:name" element={<CategoryPage />} />
        <Route path="/:id/:url" element={<ReadPage />} />
        <Route
          path="/"
          element={
            <LandingPage
              categories={categories}
              articles={articles}
              categoriesLoaded={categoriesLoaded}
              articlesLoaded={articlesLoaded}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ThemeSwitch />
      <Footer />
    </>
  )
}

export default App
