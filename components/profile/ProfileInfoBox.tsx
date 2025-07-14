import { CheckCircle } from "lucide-react"

// this compo takes prosp of icon - value - text
const ProfileInfoBox = () => {
  return (
    <div className="border-rounded px-6 py-3">
        <div className="flex-items !space-x-3">
            <CheckCircle size={20} className="text-orange-500"/>
            <span className="font-bold text-2xl">20</span>
        </div>

        <p className="text-neutral-600 font-normal">Lessons Completed</p>
    </div>
  )
}

export default ProfileInfoBox