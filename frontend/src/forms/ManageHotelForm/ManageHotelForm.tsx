import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import HotelTypeSection from "./HotelTypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageFiles: FileList;
};

type ManageHotelFormType={
 onSave:(hotelFormData:FormData)=> void,
isLoading:boolean
}
const ManageHotelForm = ({onSave, isLoading}:ManageHotelFormType) => {
    const formMethods=useForm<HotelFormData>();
    const {handleSubmit} = formMethods

    const onSubmit=handleSubmit((data:HotelFormData)=>{
        console.log(data)
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("city", data.city)
        formData.append("country", data.country)
        formData.append("description", data.description)
        formData.append("type", data.type)
        formData.append("pricePerNight", data.pricePerNight.toString())
        formData.append("starRating", data.starRating.toString())
        formData.append("adultCount", data.adultCount.toString())
        formData.append("childCount", data.childCount.toString())
        data.facilities.forEach((facility, index)=>{
            formData.append(`facilities[${index}]`, facility)
        })
        Array.from(data.imageFiles).forEach((imageFile)=>{
            formData.append(`imageFiles`, imageFile)
        })
        onSave(formData)
    })
  return (
    <FormProvider {...formMethods}>
        <form onSubmit={onSubmit} className="flex flex-col gap-10">
            <DetailsSection/>
            <HotelTypeSection/>
            <FacilitiesSection/>
            <GuestSection/>
            <ImageSection/>
            <span className="flex justify-end">
                <button 
                disabled={isLoading} 
                className="bg-blue-600 p-2 rounded-md text-xl text-white font-bold hover:bg-blue-500 disabled::bg-gray-600" 
                type="submit"
                >
                    { isLoading  ? 'Saving...' : 'Save' }
                </button>
            </span>
        </form>
    </FormProvider>
  )
}

export default ManageHotelForm