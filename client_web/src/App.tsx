import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import VerifyAccountPage from './pages/VerifyAccountPage'
import SignInPage from './pages/SignInPage'
import ProfilePage from './pages/ProfilePage'
import ResetPasswordPage from './pages/ResetPasswordPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={< HomePage />} />
        <Route path='/signup' element={< SignUpPage />} />
        <Route path='/verifyaccount' element={< VerifyAccountPage />} />
        <Route path='/signin' element={< SignInPage />} />
        <Route path='/profile' element={< ProfilePage />} />
        <Route path='/resetpassword' element={< ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
