import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"
import { hotelFacilities } from "../../config/hotel-options-config"

const FacilitiesSection = () => {
    const {register, formState:{errors}} = useFormContext<HotelFormData>()

    return (
    <div>
        <h2 className="text-xl mb-3 font-bold">Facilities</h2>
        <div className="grid grid-cols-5 gap-3">
            {
                hotelFacilities.map((facility)=>(
                    <label 
                    className="text-sm flex gap-1 items-center text-gray-700"
                    key={facility}
                    >
                        <input 
                        type="checkbox" 
                        value={facility} 
                        {...register("facilities",
                            {
                                validate:(facilities)=>{
                                    if(facilities && facilities.length > 0){
                                        return true
                                    }else{
                                        return "At Least One Facility Must be Selected"
                                    }
                                }
                            }
                        )}/>
                        {facility}
                    </label>
                ))
            }
        </div>
        {errors.facilities && (
                <span className='text-red-500'>{errors.facilities.message}</span>
        )}
    </div>
  )
}

export default FacilitiesSection