import CompanionCard from "@/components/common/CompanionCard"
import CompanionSearch from "@/components/companion/CompanionSearch"
import SubjectDropdown from "@/components/companion/SubjectDropdown"

const CompanionLibrary = () => {
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
        <CompanionCard/>
        <CompanionCard/>
        <CompanionCard/>
        <CompanionCard/>
        <CompanionCard/>
      </section>
    </main>
  )
}

export default CompanionLibrary