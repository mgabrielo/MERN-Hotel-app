import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"

const ImageSection = () => {
    const {register, formState:{errors}} = useFormContext<HotelFormData>()

  return (
    <div>
        <h2 className="text-xl font-bold mb-3">Image Upload</h2>
        <div className="border rounded-md p-4 flex flex-col gap-4">
            <input
            type="file"
            multiple
            accept="image/*"
            className="w-full text-gray-700 font-normal"
            {...register("imageFiles", {
                validate:(imageFiles)=>{
                   const totalLength= imageFiles.length
                   if(totalLength === 0){
                    return "At Least One Image Must Be Uploaded"
                   }
                   if(totalLength > 6){
                    return "At Most Six Images Must Be Uploaded"
                   }
                   return true
                }
            })}
            />
        </div>
        {errors.imageFiles && (
                <span className='text-red-500'>{errors.imageFiles.message}</span>
            )}

    </div>
  )
}

export default ImageSection