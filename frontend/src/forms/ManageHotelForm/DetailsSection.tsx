import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"

const DetailsSection = () => {
    const {register, formState:{errors}} = useFormContext<HotelFormData>()
  return (
    <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold mb-3">Add Hotel</h2>
        <label className='text-gray-700 text-sm font-bold flex-1'>
             Name
            <input 
            className='w-full border border-blue-800 rounded-md py-2 px-2 font-normal'
            type="text"
            {...register("name", {required:"This field is required"})}
             />
              {errors.name && (
                <span className='text-red-500'>{errors.name.message}</span>
             )}
        </label>
        <div className="flex gap-4">
        <label className='text-gray-700 text-sm font-bold flex-1'>
             City
            <input 
            className='w-full border border-blue-800 rounded-md py-2 px-2 font-normal'
            type="text"
            {...register("city", {required:"This field is required"})}
             />
              {errors.city && (
                <span className='text-red-500'>{errors.city.message}</span>
             )}
        </label>
        <label className='text-gray-700 text-sm font-bold flex-1'>
             Country
            <input 
            className='w-full border border-blue-800 rounded-md py-2 px-2 font-normal'
            type="text"
            {...register("country", {required:"This field is required"})}
             />
              {errors.country && (
                <span className='text-red-500'>{errors.country.message}</span>
             )}
        </label>
        </div>
        <label className='text-gray-700 text-sm font-bold flex-1'>
             Description
            <textarea 
            className='w-full border border-blue-800 rounded-md py-2 px-2 font-normal'
            rows={10}
            {...register("description", {required:"This field is required"})}
             />
              {errors.description && (
                <span className='text-red-500'>{errors.description.message}</span>
             )}
        </label>

        <label className='text-gray-700 text-sm font-bold max-w-[50%]'>
             Price Per Night
            <input 
            className='w-full border border-blue-800 rounded-md py-2 px-2 font-normal'
            type="number"
            min={1}
            {...register("pricePerNight", {required:"This field is required"})}
             />
              {errors.pricePerNight && (
                <span className='text-red-500'>{errors.pricePerNight.message}</span>
             )}
        </label>
        <label className='text-gray-700 text-sm font-bold max-w-[50%]'>
             Star Rating
            <select 
            {...register("starRating", {required:'This Field is required'})}
            className="border rounded w-full p-2 text-gray-700 font-normal"
            >
                <option value="" className="text-sm font-bold">Select as Rating</option>
                {
                    [1,2,3,4,5].map((rating)=>(
                        <option key={rating} value={rating}>{rating}</option>
                    ))
                }
            </select>
              {errors.starRating && (
                <span className='text-red-500'>{errors.starRating.message}</span>
             )}
        </label>
    </div>
  )
}

export default DetailsSection