import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import VerifyAccountPage from './pages/VerifyAccountPage'
import SignInPage from './pages/SignInPage'
import ProfilePage from './pages/ProfilePage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import NotFoundPage from './pages/NotFoundPage'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Header'
import RequireAuth from './components/RequireAuth'

const theme = createTheme({
  typography: {
    'fontFamily': 'Open Sans'
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={< HomePage />} />
          <Route path='/signup' element={< SignUpPage />} />
          <Route path='/verifyaccount' element={< VerifyAccountPage />} />
          <Route path='/signin' element={< SignInPage />} />
          <Route path='/profile' element={<RequireAuth>< ProfilePage /></RequireAuth>} />
          <Route path='/resetpassword' element={<RequireAuth>< ResetPasswordPage /></RequireAuth>} />
          <Route path='*' element={< NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
