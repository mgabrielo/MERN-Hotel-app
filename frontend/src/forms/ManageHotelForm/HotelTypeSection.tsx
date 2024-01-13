import { useFormContext } from "react-hook-form";
import { HotelOptionTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";


const HotelTypeSection = () => {
    const {register, watch, formState:{errors}} = useFormContext<HotelFormData>()
    const typeWatch= watch('type') 
  return (
    <div >
        <h2 className="text-xl mb-3 font-bold">Types</h2>
        <div className="grid grid-cols-5 gap-2">
            {
                HotelOptionTypes.map((hotelType)=>(
                    <label 
                    key={hotelType}
                    className={
                        typeWatch === hotelType ?
                        "cursor-pointer bg-blue-400 text-sm rounded-full px-4 py-2"
                        :
                        "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2"
                    }
                    >
                        <input type="radio" className="hidden" value={hotelType} {...register("type", {required:'This field is required'})} />
                    <span>{hotelType}</span>
                    </label>
                ))
            }
        </div>
        {errors.type && (
                <span className='text-red-500'>{errors.type.message}</span>
             )}
    </div>
  )
}

export default HotelTypeSection