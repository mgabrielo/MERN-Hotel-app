import { useMutation, useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { fetchMyHotelById, updateMyHotelById } from "../api-client"
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm"
import { useAppContext } from "../contexts/AppContext"

const EditHotel = () => {
    const {hotelId} = useParams()
    const {showToast} = useAppContext()
    const {data:hotel} = useQuery("fetchMyHotelById",()=>fetchMyHotelById(hotelId || ''), {
        enabled: !!hotelId
    })
    const {mutate, isLoading} = useMutation(updateMyHotelById,{
        onError:(err:Error)=>{
            showToast({message:err.message, type:"ERROR"})
        },
        onSuccess:()=>{
            showToast({message:'Hotel Updated', type:"SUCCESS"})
        }
    })

    const handleSave=(hotelData:any)=>{
        console.log('hotelData', hotelData)
        mutate(hotelData)
    }
  return (
    <>
        {hotel && (
            <ManageHotelForm hotel={hotel} onSave={handleSave}  isLoading={isLoading}/>
         )} 
    </>
    )
}

export default EditHotel