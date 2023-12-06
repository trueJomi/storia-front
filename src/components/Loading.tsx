import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { logoPng } from '../context/images.context'

const Loading = () => {
  return (
    <div className=" h-screen w-full flex flex-col items-center justify-center" >
        <img src={logoPng} alt="logo" className="w-40 h-40" />
        <div className=" text-7xl animate-spin mt-5" >
            <AiOutlineLoading3Quarters/>
        </div>
    </div>
  )
}

export default Loading
