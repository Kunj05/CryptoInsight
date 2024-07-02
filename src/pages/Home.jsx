import Carousel from '../components/Carousel'
import Table from '../components/Table'
import { useSelector } from 'react-redux'
import { selectuser } from '../redux/userSlice'
import Wishlist from '../components/Wishlist'
import Footer from '../components/Footer';

const Home = () => {
  const user = useSelector(selectuser);
  return (
    <div className='flex flex-col items-center justify-center'>
        <Carousel/>
         {user && user.accessToken?<Wishlist/>:null}
        <Table/> 
        <Footer/>
    </div>
  )
}

export default Home