import { fetchCompanions } from "@/actions/companion/fetchCompanions"
import CompanionCard from "@/components/common/CompanionCard"
import CompanionSearch from "@/components/companion/CompanionSearch"
import SubjectDropdown from "@/components/companion/SubjectDropdown"
import { Suspense } from "react"

const CompanionLibrary = async () => {

  const companions = await fetchCompanions();

  return (
    <main className="container flex flex-col space-y-12">

      <nav className="flex-between ">
        <h1 className="font-bold text-2xl">Companion Library</h1>

        <div className="flex-items">
          <CompanionSearch/>
          <SubjectDropdown/>
        </div>

      </nav>

      <section className=" grid grid-cols-3 gap-6">
        {companions?.map((companion) => <Suspense key={companion.id} fallback={"content is loading"}>
          <CompanionCard key={companion.id} companion={companion}/>
        </Suspense>) }
        
      </section>
    </main>
  )
}

export default CompanionLibrary