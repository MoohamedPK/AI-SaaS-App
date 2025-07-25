import CompletedLessonsTable from "@/components/profile/CompletedLessonsTable"
import ProfileInfoBox from "@/components/profile/ProfileInfoBox"
import { auth } from "@clerk/nextjs/server"
import { User } from "lucide-react"
import { redirect } from "next/navigation"
// import Image from "next/image"

const Profile = async () => {
  
  const {userId} = await auth();

  if (!userId ) redirect("/sign-in")

  return (
    <div className="container space-y-15">

      <div className="flex-between">
        <div className="flex-items">
          <User width={70} height={70} className="rounded-full bg-zinc-400/80"/>
          {/* TODO : 
              CHECK IF THE USER HAVE AN IMAGE IF NOT SHOW THE ABOVE ICON
          */}
          {/* <Image src={'/public/logo.svg'} alt="profile pic" width={100} height={100} className="rounded-full"/> */}

          <div>
            <h3 className="text-lg font-bold">John Doe</h3>
            <p className="text-sm">text@gmail.com</p>
          </div>
        </div>
        
        <div className="flex-items !space-x-8">
          <ProfileInfoBox/>
          <ProfileInfoBox/>
        </div>
      </div>


      <CompletedLessonsTable/>      
    </div>
  )
}

export default Profile