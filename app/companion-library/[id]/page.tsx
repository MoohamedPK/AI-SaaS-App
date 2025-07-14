import AgentBox from "@/components/companion/AgentBox"
import LessonContolle from "@/components/companion/LessonContolle"
import { BottleWine } from "lucide-react"

const CompanionSession = () => {
  return (
    <main className="container space-y-12">

      <section className=" border-rounded px-7 py-10 flex-between ">
        <div className="flex-items">
          <BottleWine size={40}/>

          <div className="space-y-2">
            <div className="flex-items">
              <h1 className="text-xl font-bold">Neura the Binary Explorer</h1>
              <span className="text-sm rounded-bg">Science</span>
            </div>

            <p className="text-zinc-800/80">Topic: Neural Networks of the Brain</p>
          </div>
        </div>

        <p className="font-semibold text-lg">45 mins</p>
      </section>


      <section className="grid grid-cols-4 gap-6">
        <div className="col-span-3 space-y-8">
          <AgentBox/>

          <div className="min-w-full text-center">
            <p>translation</p>
          </div>
        </div>

        <div className="col-span-1">
          <LessonContolle/>
        </div>
      </section>

    </main>
  )
}

export default CompanionSession