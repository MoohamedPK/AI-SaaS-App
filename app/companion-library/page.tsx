"use client"

import { fetchCompanions } from "@/actions/companion/fetchCompanions"
import CompanionCard from "@/components/common/CompanionCard"
import CompanionSearch from "@/components/companion/CompanionSearch"
import SubjectDropdown from "@/components/companion/SubjectDropdown"
import { Button } from "@/components/ui/button"
import CardSkeleton from "@/components/ui/CardSkeleton"
import { Companion } from "@prisma/client"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const CompanionLibrary = () => {

  const [companions, setCompanions] = useState<Companion[]>()
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const [selectedSubject, setSelectedSubject] = useState<string>("")
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

  const filteredCompanions = companions?.filter((companion) =>
  // Match search query
  (searchQuery === "" ||
    companion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    companion.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    companion.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  &&
  // Match subject filter
  (selectedSubject === "all" || selectedSubject === ""  || companion.subject.toLowerCase() === selectedSubject.toLowerCase())
)

  return (
    <main className="container flex flex-col space-y-12 bg-color h-screen relative">

      <div className="size-full absolute">
            <p className="neon-circle animate-[wiggle_0.2s_ease-in-out_infinite] bg-violet-400/70 size-[400px] rounded-full blur-[130px]" />
            <span className="neon-circle  absolute bg-violet-400/70 size-[400px] rounded-full blur-[130px]" />
        </div>

      <nav className="flex-between z-30 border-b border-white/40 p-8 rounded-sm">
        <h1 className="font-bold text-white/60 text-2xl">Companion Library</h1>
        <div className="flex-items">
          <CompanionSearch setSearchQuery={setSearchQuery}/>
        </div>

        <div className="flex-items">
          <SubjectDropdown setSelectedSubject={setSelectedSubject}/>

          <Link href={'/companion-library/new'}>
            <Button className="flex-items !space-x-2 btn-hover cursor-pointer">
              <Plus/>
              Add New Companion
            </Button>
          </Link>
        </div>
      </nav>
      
        

      <div className="flex-items !space-x-2 font-semibold z-30">
        {searchQuery && (
          <>
            <p>search for </p>
            <q className=""><i>{searchQuery}</i></q>
          </>
        )}
      </div>

      <section className=" grid grid-cols-3 gap-6 z-30">
        {isLoading ? <CardSkeleton/>  :  filteredCompanions?.map((companion) =>
          <CompanionCard key={companion.id} companion={companion}/>)}
      </section>
    </main>
  )
}

export default CompanionLibrary