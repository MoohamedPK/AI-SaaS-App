import { fetchSessionHsitory } from "@/actions/companion/companionHistory/companionHistory"
import AnimatedCompletedLessonsTable from "./AnimatedCompletedLessonsTable"

const CompletedLessonsTable = async ({ userId }: { userId: string }) => {

  const completedSessions = await fetchSessionHsitory(userId)

  return <AnimatedCompletedLessonsTable completedSessions={completedSessions}/>
}

export default CompletedLessonsTable
