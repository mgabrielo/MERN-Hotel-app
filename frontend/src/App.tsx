import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layout/Layout'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import AddHotel from './pages/AddHotel'
import { useAppContext } from './contexts/AppContext'
import MyHotels from './pages/MyHotels'
import EditHotel from './pages/EditHotel'

function App() {
  const {isLoggedin} = useAppContext();
  return (
    <Router>
      <Routes>
        <Route 
        path='/' 
        element={<
          Layout>
          <p>HomePage</p>
        </Layout>
      }
        />
        <Route 
        path='/search' 
        element={<
          Layout>
          <p>Search Page</p>
        </Layout>
      }
        />
        <Route path='/register' element={
          <Layout>
            <Register/>
          </Layout>
        }/>
        <Route path='sign-in' element={
        <Layout>
          <SignIn/>
        </Layout>
        }/>
        {
          isLoggedin && (
            <>
            <Route path='add-hotel' element={<Layout><AddHotel/></Layout>}/>
            <Route path='my-hotels' element={<Layout><MyHotels/></Layout>}/>
            <Route path='edit-hotel/:hotelId' element={<Layout><EditHotel/></Layout>}/>
            </>
          )
        }
        <Route path='*' element={<Navigate to={'/'}/>}/>
      </Routes>
    </Router>
  )
}

export default App
