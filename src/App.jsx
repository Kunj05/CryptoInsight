import {  Routes,Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import Navbar from './components/Navbar'
import Coin from './pages/Coin'
import { useState ,Suspense,lazy } from 'react'
import "./App.css"
import Modal from './components/Modal'
import {Toaster} from 'react-hot-toast'
const Home = lazy(() => import('./pages/Home'));

const App = () => {
  const [modal, setModal] = useState(false);
  const openmodal = () => {
    setModal(true);
    document.body.classList.add('active-modal');
  }
  const closemodal = () => {
    setModal(false);
    document.body.classList.remove('active-modal');
  }

  return (
    <Provider store={store}>
        <div className='w-screen h-screen bg-[#14161a]'>
            <Navbar openmodal={openmodal} />
            <Routes>
                <Route exact path="/" element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <Home />
                    </Suspense>
                    }>
                </Route>

                <Route exact path="/coins/:id" element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <Coin />
                    </Suspense>
                    }>
                </Route>
            </Routes>
            {modal && <Modal openmodal={openmodal} closemodal={closemodal} />}
            <Toaster />
        </div>
    </Provider>
  )
}

export default App