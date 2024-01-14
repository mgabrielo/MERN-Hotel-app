import { useFormContext } from "react-hook-form"
import React from "react"
import { HotelFormData } from "./ManageHotelForm"

const ImageSection = () => {
    const {register, watch, setValue, formState:{errors}} = useFormContext<HotelFormData>()
    const  existingImgUrls=watch('imageUrls')

const handleDelete =(e:React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrl:string)=>{
    e.preventDefault()
    setValue('imageUrls', existingImgUrls?.filter((url)=>{
        return url !==imageUrl
    }))
}
  return (
    <div>
        <h2 className="text-xl font-bold mb-3">Image Upload</h2>
        <div className="border rounded-md p-4 flex flex-col gap-4">
            {
                existingImgUrls && (
                    <div className="grid grid-cols-6 gap-4">
                        {
                            existingImgUrls.length > 0 && existingImgUrls.map((existingImgUrl,index)=>(
                                <div className="relative group" key={index}>
                                    <img src={existingImgUrl} className="min-h-full object-cover" />
                                    <button
                                    onClick={(e)=>handleDelete(e, existingImgUrl)}
                                     className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 opacity-0 group-hover:opacity-100"
                                     >
                                        Delete
                                     </button>
                                </div>
                            ))
                        }
                    </div>
                )
            }
            <input
            type="file"
            multiple
            accept="image/*"
            className="w-full text-gray-700 font-normal"
            {...register("imageFiles", {
                validate:(imageFiles)=>{
                   const totalLength= imageFiles.length + (existingImgUrls?.length || 0);
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