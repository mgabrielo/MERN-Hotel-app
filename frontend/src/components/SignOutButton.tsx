import { useMutation, useQueryClient } from "react-query"
import { logOut } from "../api-client"
import { useAppContext } from "../contexts/AppContext"

const SignOutButton = () => {
    const queryClient= useQueryClient()
    const {showToast}= useAppContext();

    const mutation= useMutation(logOut, {
        onSuccess:async()=>{
            await queryClient.invalidateQueries('validateToken')
            showToast({message:'Signed Out Successfull', type:'SUCCESS'})
        },
        onError:(error:Error)=>{
            showToast({message:error.message, type:'ERROR'})
        }
    })
    const handleClick=()=>{
        mutation.mutate();
    }
  return (
    <button onClick={handleClick} className="text-blue-600 px-3 font-bold bg-white hover:bg-blue-600  hover:text-white rounded-md">
        Sign Out
    </button>
  )
}

export default SignOutButton