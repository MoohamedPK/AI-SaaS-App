import { BottleWine } from "lucide-react"


const CompletedLessonsTable = () => {

  return (
    

<div className="relative overflow-x-auto shadow-md sm:rounded-lg border-rounded !rounded-[30px] py-3 px-6 space-y-6">
    <div className="mt-3">
        <h1 className="text-2xl font-bold">Completed Lessons</h1>
    </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Lessons
                </th>
                <th scope="col" className="px-6 py-3">
                    Subjects
                </th>
                <th scope="col" className="px-6 py-3">
                    Duration
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th className="flex-items px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <BottleWine size={32}/>

                    <div className="space-y-1">
                    <h1>Neura the Binary Explorer</h1>
                    <p>Topic Neutral Networks of the Brain</p>
                    </div>
                </th>
                <td className="px-6 py-4 ">
                    Silver
                </td>
                <td className="px-6 py-4">
                    45 mins
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th className="flex-items px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <BottleWine size={32}/>

                    <div className="space-y-1">
                    <h1>Neura the Binary Explorer</h1>
                    <p>Topic Neutral Networks of the Brain</p>
                    </div>
                </th>
                <td className="px-6 py-4">
                    White
                </td>
                <td className="px-6 py-4">
                    40 mins
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th className="flex-items px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <BottleWine size={32}/>

                    <div className="space-y-1">
                    <h1>Neura the Binary Explorer</h1>
                    <p>Topic Neutral Networks of the Brain</p>
                    </div>
                </th>
                <td className="px-6 py-4">
                    Black
                </td>
                <td className="px-6 py-4">
                    30 mins
                </td>
            </tr>
        </tbody>
    </table>
</div>

    // <div>
    //     <table classNameName="w-full text-sm text-left rtl:text-right text-zinc-800 dark:text-gray-400">
    //         <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    //             <tr>
    //                 <th className="px-6 py-3">Lessons</th>
    //                 <th className="px-6 py-3">Subjects</th>
    //                 <th className="px-6 py-3">Duration</th>
    //             </tr>
    //         </thead>

    //         <tbody>
    //             <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
    //                 <td className="flex-items">
    //                     <BottleWine size={32}/>

    //                     <div className="space-y-1">
    //                         <h1>Neura the Binary Explorer</h1>
    //                         <p>Topic Neutral Networks of the Brain</p>
    //                     </div>
    //                 </td>

    //                 <td>
    //                     <h4>Science</h4>
    //                 </td>

    //                 <td>45 mins</td>
    //             </tr>
    //         </tbody>
    //     </table>
    // </div>
  )
}

export default CompletedLessonsTable