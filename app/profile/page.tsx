import { fetchSessionHsitory } from "@/actions/companion/companionHistory/companionHistory";
import { fetchUserCompanions } from "@/actions/companion/fetchUserCompanions";
import BookmarkedSessions from "@/components/profile/BookmarkedSessions";
import CompletedLessonsTable from "@/components/profile/CompletedLessonsTable";
import ProfileInfoBox from "@/components/profile/ProfileInfoBox";
import UserProfile from "@/components/profile/UserProfile";
import BookmarkSkeleton from "@/components/ui/BookmarkSkeleton";
import { auth } from "@clerk/nextjs/server";
import { Companion, SessionHistory } from "@prisma/client";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const Profile = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const sessions = (await fetchUserCompanions(userId)) as Companion[];
  const completedSessions = (await fetchSessionHsitory(userId)) as SessionHistory[];

  return (
    <section className="relative min-h-screen bg-color text-white/80">
      {/* Neon background effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35rem] h-[35rem] rounded-full bg-purple-600 blur-[30rem] -z-10" />

      <div className="container mx-auto space-y-12 relative z-10 px-4 md:px-0">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
          <UserProfile />

          <div className="flex flex-wrap gap-4 md:gap-8">
            <ProfileInfoBox value={completedSessions.length} text="Sessions Completed" />
            <ProfileInfoBox value={sessions.length} text="Sessions Created" />
          </div>
        </div>

        {/* Completed Lessons Table */}
        <CompletedLessonsTable userId={userId} />

        {/* Bookmarked Sessions */}
        <Suspense fallback={<BookmarkSkeleton />}>
          <BookmarkedSessions />
        </Suspense>
      </div>
    </section>
  );
};

export default Profile;
