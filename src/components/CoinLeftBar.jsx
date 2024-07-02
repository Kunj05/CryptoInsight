
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../Api';
import DOMPurify from 'dompurify';
import { useSelector,useDispatch } from 'react-redux';
import { selectuser } from '../redux/userSlice';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { selectWatchlist, setWatchlist } from '../redux/watchlistSlice';
import {toast } from 'react-hot-toast'

const CoinLeftBar = () => {
    const [coin, setcoin] = useState();
    const currency = useSelector((store) => store.currency.currency)
    const { id } = useParams();
    const user = useSelector(selectuser);
    const watchlist = useSelector(selectWatchlist);
    const dispatch = useDispatch();
    const [inWatchlist, setInWatchlist] = useState(watchlist.includes(id));
    
    console.log(inWatchlist)

    useEffect(() => {
        console.log("About a particular coin page");
        const fetchdata = async () => {
            try {
                const response = await axios.get(SingleCoin(id))
                console.log(response.data);
                setcoin(response.data);
            }
            catch (err) {
                console.log(err.message);
            }
        }
        fetchdata();
    }, [id]);

    const handleAddToWatchlist = async () => {
    
        const updatedWatchlist = [...watchlist,coin.id]; // Add the coin ID to the watchlist
        const coinRef = doc(db, "watchlist", user.email);
        try {
            await setDoc(
                coinRef,
                { coins: updatedWatchlist },
                { merge: true }
            );
            setInWatchlist(true);
            dispatch(setWatchlist(updatedWatchlist))
            toast.success(`${coin?.name} Added to the Watchlist!`);
        } catch (error) {
            toast.error("Error while adding to watchlist", error.message);
        }
    }
    console.log("watchlist",watchlist);
    
    const handleRemoveFromWatchlist = async () => {
    
        const updatedWatchlist = watchlist.filter(wish => wish !== coin.id); // Remove the coin ID from the watchlist
    
        const coinRef = doc(db, "watchlist", user.email);
        try {
            await setDoc(
                coinRef,
                { coins: updatedWatchlist },
                { merge: true }
            );
            setInWatchlist(false);
            dispatch(setWatchlist(updatedWatchlist));
            toast.success(`${coin?.name} Removed from the Watchlist!`);
        } catch (error) {
            toast.error("Error while removing from watchlist", error.message);
        }
    };
    

    return (
        <div className='w-[100vw] lg:w-[25vw] h-screen flex flex-col text-[#FAF0E6] p-3'>
            <div className='w-full flex flex-col items-center'>
                <img className='p-2 pb-0 w-[180px] h-[180px]' src={coin?.image.large} alt="" />
                <h3 className='p-2 pb-0 text-5xl font-bold'>{coin?.name}</h3>
            </div>
            <div className='w-full flex flex-col items-start'>
                <h6 className='p-2 pb-0 text-sm'>          {coin?.description?.en ? (
            <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(coin.description.en.split(". ")[0]) }} />
          ) : "No description available"}.</h6>
                <h5 className='p-2 pb-0 text-lg flex justify-start'>Rank: {coin?.market_cap_rank}</h5>
                <h5 className='p-2 pb-0 text-lg flex justify-start'>Current Price: {currency === 'usd' ? "$" : "₹"} {coin?.market_data.current_price[currency].toLocaleString()}</h5>
                <h5 className='p-2  text-lg flex justify-start'>Market Cap: {currency === 'usd' ? "$" : "₹"} {Number((coin?.market_data.market_cap[currency] / 1000000).toFixed(0)).toLocaleString()} M</h5>
                {
                    user ? (
                        <button
                            onClick={inWatchlist ? handleRemoveFromWatchlist : handleAddToWatchlist}
                            className="text-center text-black px-2 py-1 w-[60%] text-lg flex justify-start ${inWatchlist ? 'bg-red-500' : 'bg-green-500'} border border-black rounded-md"
                            style={{ width: '60%', textAlign: 'center' }}
                        >
                            {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                        </button>
                    ) : null
                }

            </div>
        </div>
    )
}
export default CoinLeftBar
