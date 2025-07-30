import { CheckCircle } from "lucide-react"

// this compo takes prosp of icon - value - text
const ProfileInfoBox = ({value, text}: {value: number, text: string}) => {
  return (
    <div className="border-rounded !border-white/60 px-6 py-3">
        <div className="flex-items !space-x-3">
            <CheckCircle size={20} className="text-orange-500"/>
            <span className="font-bold text-2xl">{value}</span>
        </div>

        <p className=" font-normal">{text}</p>
    </div>
  )
}

export default ProfileInfoBox