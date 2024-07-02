import Carousel from '../components/Carousel'
import Table from '../components/Table'
// import { useSelector } from 'react-redux'
// import { selectuser } from '../redux/userSlice'
//import Wishlist from '../Component/Wishlist'

const Home = () => {
  // const user = useSelector(selectuser);
  return (
    <div className='flex flex-col items-center justify-center'>
        <Carousel/>
         {/* {user?<Wishlist/>:null} */}
        <Table/> 
    </div>
  )
}

export default Home