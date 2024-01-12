import {useForm} from 'react-hook-form';
import  * as apiClient from '../api-client'
import {useMutation, useQueryClient} from 'react-query'
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

export type RegisterFormData={
    firstName:string;
    lastName:string
    email:string;
    password:string;
    confirmPassword:string;
}

const Register = () => {
    const queryClient= useQueryClient()
    const navigate = useNavigate()
    const {showToast} = useAppContext()
    const {register, watch, handleSubmit, formState:{errors}} = useForm<RegisterFormData>();
    const mutation = useMutation(apiClient.register,{
        onSuccess: async()=>{
            showToast({message:'Registration Successful', type:'SUCCESS'})
            await queryClient.invalidateQueries('validateToken')
            navigate('/')
        },
        onError:()=>{
            showToast({message:'Registration Failed', type:'ERROR'})
        }
    })

const onSubmit = handleSubmit((data)=>{
    mutation.mutate(data)
})
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">
            Create An Account
        </h2>
        <div 
        className='flex flex-col md:flex-row gap-5'
        >
        <label className='text-gray-700 text-sm font-bold flex-1'>
            First Name
            <input 
            className='w-full border border-blue-800 rounded-md py-2 px-2 font-normal'
            type="text"
            {...register("firstName", {required:"This field is required"})}
             />
             {errors.firstName && (
                <span className='text-red-500'>{errors.firstName.message}</span>
             )}
        </label>
        <label className='text-gray-700 text-sm font-bold flex-1'>
            Last Name
            <input 
            className='w-full border border-blue-800 rounded-md py-2 px-2 font-normal'
            type="text"
            {...register("lastName", {required:"This field is required"})}
             />
              {errors.lastName && (
                <span className='text-red-500'>{errors.lastName.message}</span>
             )}
        </label>
        </div>
        <label className='text-gray-700 text-sm font-bold flex-1'>
             Email
            <input 
            className='w-full border border-blue-800 rounded-md py-2 px-2 font-normal'
            type="email"
            {...register("email", {required:"This field is required"})}
             />
              {errors.email && (
                <span className='text-red-500'>{errors.email.message}</span>
             )}
        </label>
        <label className='text-gray-700 text-sm font-bold flex-1'>
            Password
            <input 
            className='w-full border border-blue-800 rounded-md py-2 px-2 font-normal'
            type="password"
            {...register("password", {required:"This field is required", minLength:{value:6, message:'Password must be six or more Characters'}})}
             />
                {errors.password && (
                <span className='text-red-500'>{errors.password.message}</span>
             )}
        </label>
        <label className='text-gray-700 text-sm font-bold flex-1'>
            Confirm Password
            <input 
            className='w-full border border-blue-800 rounded-md py-2 px-2 font-normal'
            type="password"
            {...register("confirmPassword", 
            {validate:(val)=>{
                if(!val){
                    return "This field is required"
                }else if(watch('password') !== val){
                    return "passwords do not match"
                }
            }
            })}
             />
                {errors.confirmPassword && (
                <span className='text-red-500'>{errors.confirmPassword.message}</span>
             )}
        </label>
        <span>
            <button
            type='submit'
            className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded-md'
            >
                Create Account
            </button>
        </span>
    </form>
  )
}

export default Register