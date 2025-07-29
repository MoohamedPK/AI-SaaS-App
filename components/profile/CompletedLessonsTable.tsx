import { fetchSessionHsitory } from "@/actions/companion/companionHistory/companionHistory"
import { BottleWine } from "lucide-react"

const CompletedLessonsTable = async ({ userId }: { userId: string }) => {

  const completedSessions = await fetchSessionHsitory(userId)

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-rounded !rounded-[30px] py-3 px-6 space-y-6">
      <div className="mt-3">
        <h1 className="text-2xl font-bold">Completed Lessons</h1>
      </div>

      {completedSessions.length === 0 ? (
        <p className="text-gray-500">No completed lessons found.</p>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Lesson</th>
              <th scope="col" className="px-6 py-3">Subject</th>
              <th scope="col" className="px-6 py-3">Duration</th>
            </tr>
          </thead>
          <tbody>
            {completedSessions.map((session, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <th className="flex gap-4 items-start px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <BottleWine size={28} className="mt-1" />
                  <div className="space-y-1">
                    <h1 className="font-semibold text-base">
                      {session.companion.name}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Topic: {session.companion.topic}
                    </p>
                  </div>
                </th>
                <td className="px-6 py-4">
                  {session.companion.subject}
                </td>
                <td className="px-6 py-4">
                  {session.companion.duration} mins
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default CompletedLessonsTable
