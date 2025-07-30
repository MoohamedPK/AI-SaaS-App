import { fetchSessionHsitory } from "@/actions/companion/companionHistory/companionHistory"
import { fetchUserCompanions } from "@/actions/companion/fetchUserCompanions"
import BookmarkedSessions from "@/components/profile/BookmarkedSessions"
import CompletedLessonsTable from "@/components/profile/CompletedLessonsTable"
import ProfileInfoBox from "@/components/profile/ProfileInfoBox"
import UserProfile from "@/components/profile/UserProfile"
import BookmarkSkeleton from "@/components/ui/BookmarkSkeleton"
import { auth } from "@clerk/nextjs/server"
import { Companion, SessionHistory } from "@prisma/client"
import { redirect } from "next/navigation"
import { Suspense } from "react"

const Profile = async () => {
  
  const {userId} = await auth();
  if (!userId ) redirect("/sign-in")

  const sessions = await fetchUserCompanions(userId) as Companion[]
  const completedSessions = await fetchSessionHsitory(userId) as SessionHistory[]

  return (
    <section className="relative">

      <div className="neon absolute top-0 size-[35rem] rounded-full bg-purple-600 blur-[30rem]"/>

      <div className="container space-y-15 relative z-90">

        <div className="flex-between z-90">
          <UserProfile/>
          
          <div className="flex-items !space-x-8">
            <ProfileInfoBox value={completedSessions.length} text="Sessions Completed"/>
            <ProfileInfoBox value={sessions.length} text="Sesisons Created"/>
          </div>
        </div>


        <CompletedLessonsTable userId={userId}/>     
        
        <Suspense fallback={<BookmarkSkeleton/>}>
          <BookmarkedSessions/>
        </Suspense>
      </div>
    </section>
  )
}

export default Profile