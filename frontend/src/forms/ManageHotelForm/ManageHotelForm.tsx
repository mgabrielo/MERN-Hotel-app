import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import HotelTypeSection from "./HotelTypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";
import { HotelType } from "../../../../backend/src/models/hotel";
import { useEffect } from "react";

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
    imageUrls?:string[]
};
type ManageHotelFormType={
    hotel?:HotelType
    onSave:(hotelFormData: FormData) => void,
    isLoading?:boolean,
}

const ManageHotelForm = ({onSave, isLoading, hotel}:ManageHotelFormType) => {
    const formMethods=useForm<HotelFormData>();
    const {handleSubmit, reset} = formMethods

    useEffect(()=>{
        reset(hotel)
    },[hotel, reset])

    const onSubmit=handleSubmit((data:HotelFormData)=>{
        console.log('data' , data)
        const formData = new FormData()

        if(hotel){
            formData.append("hotelId", hotel._id)
        }
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
        // for adding a hotel
        Array.from(data.imageFiles).forEach((imageFile)=>{
            formData.append(`imageFiles`, imageFile)
        })
        // for updating a hotel
        if(data.imageUrls){
            data.imageUrls.forEach((url,index)=>{
                formData.append(`imageUrls[${index}]`, url)
            })
        }
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