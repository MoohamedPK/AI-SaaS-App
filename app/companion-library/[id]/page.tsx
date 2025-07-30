import { fetchCompanionById } from "@/actions/companion/fetchCompanionById"
// import BackButton from "@/components/common/BackButton"
import AgentComponent from "@/components/companion/AgentComponent"
import { subjects } from "@/constants/index"
import { Companion } from "@prisma/client"

const CompanionSession = async ({params}: {params: Promise<{id: string}>}) => {

  const companionId = ((await params).id)
  const companion = await fetchCompanionById(companionId) as Companion

  // Find the icon based on subject
  const subjectData = subjects.find((s) => s.name === companion.subject);
  const iconName = subjectData?.iconName;
  const color = subjectData?.color || "";

  return (
    <main className="container space-y-12">
      {/* <BackButton/> */}
      <section className="rounded-lg px-7 py-10 flex-between shadow-2xl" style={{backgroundColor: color}}>
        <div className="flex-items ">
          {/* {Icon && <iconName size={32} className="text-primary" />} */}

          <div className="space-y-2">
            <div className="flex-items">
              <h1 className="text-xl font-bold">{companion.name}</h1>
              <span className="text-[13px] font-semibold rounded-bg">{companion.subject}</span>
            </div>

            <p className="accent-color">Topic: {companion.topic}</p>
          </div>
        </div>

        <p className="font-semibold accent-color text-lg">{companion.duration} mins</p>
      </section>

      <AgentComponent companion= {companion} iconName={iconName}/>

    </main>
  )
}

export default CompanionSession