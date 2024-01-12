import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Register from './pages/Register'
import SignIn from './pages/SignIn'

function App() {

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
      </Routes>
    </Router>
  )
}

export default App