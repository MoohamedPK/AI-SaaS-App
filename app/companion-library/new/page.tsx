import CompanionForm from "@/components/companion/CompanionForm"

const NewCompanion = () => {
  return (
    <div className="container space-y-8">

      <div className="">
        <h1 className="text-xl font-bold">Companion Builder</h1>
      </div>

      <div className="flex flex-col justify-center items-center">
        <CompanionForm/>
      </div>
    </div>
  )
}

export default NewCompanion