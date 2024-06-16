import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from './Store/Auth/AuthSlice'
import Card from './UI/Card/Card'
import Routes from './Components/Routing/Routes'
import Response from './UI/Response/Response'
import Logout from './UI/Logout/Logout'
import './App.css'

const App = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return (
    <main>
      <Response/>
      <Card>
        <Routes/>
      </Card>
      {isLoggedIn && <Logout/>}
    </main>
  )
}

export default App
