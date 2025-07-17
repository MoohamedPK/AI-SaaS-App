import { fetchCompanionById } from "@/actions/companion/fetchCompanionById"
import BackButton from "@/components/common/BackButton"
import AgentBox from "@/components/companion/AgentBox"
import LessonControlle from "@/components/companion/LessonControlle"
import { Companions } from "@prisma/client"
import { BottleWine } from "lucide-react"

const CompanionSession = async ({params}: {params: Promise<{id: string}>}) => {

  const companionId = ((await params).id)
  const companion = await fetchCompanionById(companionId) as Companions


  return (
    <main className="container space-y-12">
      <BackButton/>
      <section className=" border-rounded px-7 py-10 flex-between ">
        <div className="flex-items">
          <BottleWine size={40}/>

          <div className="space-y-2">
            <div className="flex-items">
              <h1 className="text-xl font-bold">{companion.name}</h1>
              <span className="text-[13px] font-semibold rounded-bg">{companion.subject}</span>
            </div>

            <p className="text-zinc-800/80">Topic: {companion.topic}</p>
          </div>
        </div>

        <p className="font-semibold text-lg">{companion.duration} mins</p>
      </section>


      <section className="grid grid-cols-4 gap-6">
        <div className="col-span-3 space-y-8">
          <AgentBox/>

          <div className="min-w-full text-center">
            <p>translation</p>
          </div>
        </div>

        <div className="col-span-1">
          <LessonControlle/>
        </div>
      </section>

    </main>
  )
}

export default CompanionSession