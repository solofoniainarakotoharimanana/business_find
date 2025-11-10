
import './App.css'
import FloatingShape from './components/FloatingShape'
import { Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import EmailVerificationPage from './pages/EmailVerificationPage'
import { useAuthStore } from './store/authStore';
import { useState } from 'react';
// import { Toaster } from 'react-hot-toast'

function App() {
  // const [count, setCount] = useState(0)

  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  
  useState(() => {
    checkAuth();
  }, [])

  console.log("IS AUTH >>> ", isAuthenticated)
  console.log("USER >>> ", user)

  return (
    <>
      <div
			  className='min-h-screen bg-gradient-to-br
      from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'
      > 
        <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			  <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			  <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

        <Routes>
          <Route path='/' element={"Home"} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<SignInPage />} />
          <Route path='/verify-email' element={<EmailVerificationPage />} />
        </Routes>
               
      </div>
      {/* <Toaster />  */}
    </>
  )
}

export default App
