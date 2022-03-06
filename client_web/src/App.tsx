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
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import MainPage from './pages/MainPage'
import APKPage from './pages/APKPage'

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
          <Route path='/forgotpassword' element={< ForgotPasswordPage />} />
          <Route path='/signin' element={< SignInPage />} />
          <Route path='/profile' element={<RequireAuth>< ProfilePage /></RequireAuth>} />
          <Route path='/client.apk' element={< APKPage />} />
          <Route path='/resetpassword' element={<RequireAuth>< ResetPasswordPage /></RequireAuth>} />
          <Route path='/mainpage' element={<RequireAuth>< MainPage /></RequireAuth>} />
          <Route path='*' element={< NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
