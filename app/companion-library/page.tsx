"use client"

import { fetchCompanions } from "@/actions/companion/fetchCompanions"
import CompanionCard from "@/components/common/CompanionCard"
import CompanionSearch from "@/components/companion/CompanionSearch"
import SubjectDropdown from "@/components/companion/SubjectDropdown"
import CardSkeleton from "@/components/ui/CardSkeleton"
import { Companions } from "@prisma/client"
import { useEffect, useState } from "react"

const CompanionLibrary = () => {

  const [companions, setCompanions] = useState<Companions[]>()
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const getData = async () => {

      try {

        setIsLoading(true)
        
        const data = await fetchCompanions();
        setCompanions(data)

      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [])

  const filteredCompanions = companions?.filter(companion =>
    companion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    companion.topic.toLowerCase().includes(searchQuery.toLowerCase()) || 
    companion.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const subjects = companions?.map((comp) => comp.subject)
  const filtredSubjects = [...new Set(subjects)]

  return (
    <main className="container flex flex-col space-y-12">

      <nav className="flex-between ">
        <h1 className="font-bold text-2xl">Companion Library</h1>
        <div className="flex-items">
          <CompanionSearch setSearchQuery={setSearchQuery}/>
          <SubjectDropdown subjects={filtredSubjects}/>
        </div>
      </nav>

      <div className="flex-items !space-x-2 font-semibold">
        {searchQuery && (
          <>
            <p>search for </p>
            <q className=""><i>{searchQuery}</i></q>
          </>
        )}
      </div>

      <section className=" grid grid-cols-3 gap-6">
        {isLoading ? <CardSkeleton/> :  filteredCompanions?.map((companion) =>
          <CompanionCard key={companion.id} companion={companion}/>)}
      </section>
    </main>
  )
}

export default CompanionLibrary