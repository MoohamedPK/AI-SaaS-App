import CompanionForm from "@/components/companion/CompanionForm"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const NewCompanion = async () => {

  const {userId} = await auth()

  if (!userId) return redirect("/sign-in")
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