import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import { fetchMyHotels } from "../api-client"
import {BsBuilding, BsMap} from 'react-icons/bs'
import {BiHotel, BiMoney, BiStar} from 'react-icons/bi'
 
const MyHotels = () => {
    const {data: hotelData} = useQuery('fetchMyHotels',fetchMyHotels, {
        onError:()=>{

        },
        onSuccess:()=>{

        }
    })

    if(!hotelData){
        return(
            <span>No Hotels Available</span>
        )
    }
  return (
    <div className="space-y-5">
        <span className="flex justify-between">
        <h2 className="text-3xl font-bold">My Hotels</h2>
        <Link 
        className="flex bg-blue-600 rounded-md text-white font-bold p-2 hover:bg-blue-500"
        to="/add-hotel"
        >
         Add Hotel
        </Link>
        </span>
        <div className="grid grid-cols-1 gap-8">
            {
                hotelData && hotelData.length > 0 && hotelData.map((hotel,)=>(
                    <div key={hotel?._id} className="flex flex-col justify-between border border-slate-600 rounded-md p-4 gap-5">
                        <h2 className="text-2xl font-bold">{hotel?.name}</h2>
                        <div className="whitespace-pre-line">
                            {hotel?.description}
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                            <div className="border border-slate-400  rounded-md p-3 flex items-center">
                                <BsMap className="mr-2"/>
                                {hotel?.city}, {hotel?.country}
                            </div>
                            <div className="border border-slate-400  rounded-md p-3 flex items-center">
                                <BsBuilding className="mr-2"/>
                                {hotel?.type}
                            </div>
                            <div className="border border-slate-400  rounded-md p-3 flex items-center">
                                <BiMoney className="mr-2"/>
                                £ {hotel?.pricePerNight} per Night
                            </div>
                            <div className="border border-slate-400  rounded-md p-3 flex items-center">
                                <BiHotel className="mr-2"/>
                                {hotel?.adultCount} adult(s), {hotel?.childCount} child(s)
                            </div>
                            <div className="border border-slate-400  rounded-md p-3 flex items-center">
                                <BiStar className="mr-2"/>
                                {hotel?.starRating} Star Rating 
                            </div>
                        </div>
                        <span className="flex justify-end">
                            <Link 
                                to={`/edit-hotel/${hotel?._id}`}
                                className="flex bg-blue-600 rounded-md text-white font-bold p-2 hover:bg-blue-500"
                            >
                                View Details
                            </Link>
                        </span>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default MyHotels