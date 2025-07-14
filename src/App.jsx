import React from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </AuthProvider>
    </div>
  )
}
export default App