import { fetchCompanionById } from "@/actions/companion/fetchCompanionById"
import BackButton from "@/components/common/BackButton"
import AgentComponent from "@/components/companion/AgentComponent"
import { subjects } from "@/lib/utils"
import { Companions } from "@prisma/client"

const CompanionSession = async ({params}: {params: Promise<{id: string}>}) => {

  const companionId = ((await params).id)
  const companion = await fetchCompanionById(companionId) as Companions

  // Find the icon based on subject
  const subjectData = subjects.find((s) => s.name === companion.subject);
  const iconName = subjectData?.iconName;
  const color = subjectData?.color || "";

  return (
    <main className="container space-y-12">
      <BackButton/>
      <section className=" border-rounded px-7 py-10 flex-between " style={{backgroundColor: color}}>
        <div className="flex-items">
          {/* {Icon && <iconName size={32} className="text-primary" />} */}

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

      <AgentComponent iconName={iconName}/>

    </main>
  )
}

export default CompanionSession