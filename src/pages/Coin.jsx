
import CoinLeftBar from '../components/CoinLeftBar'
import Chart from '../components/Chart'

const Coin = () => {
  return (
    <div className='flex flex-col lg:flex-row w-screen h-screen'>
      <CoinLeftBar />
      <Chart />
      
    </div>
  )
}

export default Coin