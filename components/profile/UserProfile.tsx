"use client"

import { User } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import Image from "next/image";

const UserProfile = () => {

    const {user} = useUser();
    
  return (
    <div className="flex-items">

            {user?.hasImage ? (
                <Image src={user.imageUrl} alt="profile pic" width={100} height={100} className="rounded-full"/>
                
            ) : (
                <User width={70} height={70} className="rounded-full bg-zinc-400/80"/>
            )}

          <div>
            <h3 className="text-lg font-bold">{user?.fullName ? user.fullName : user?.emailAddresses[0].emailAddress.split("@")[0]}</h3>
            <p className="text-sm">{user?.emailAddresses[0].emailAddress}</p>
          </div>
        </div>
  )
}

export default UserProfile