import { useMutation } from "react-query"
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm"
import { useAppContext } from "../contexts/AppContext"
import { addMyHotel } from "../api-client"
  
const AddHotel = () => {
    const {showToast} = useAppContext()
    const {mutate, isLoading} = useMutation(addMyHotel,{
        onSuccess:()=>{
            showToast({message:'Hotel Saved', type:"SUCCESS"})
        },
        onError:(err:Error)=>{
            showToast({message:err?.message, type:"SUCCESS"})
        }
    })
    const handleSave=(hotelFormData:FormData)=>{
        mutate(hotelFormData)
    }
  return (
    <ManageHotelForm onSave={handleSave} isLoading= {isLoading}/>
  )
}

export default AddHotel