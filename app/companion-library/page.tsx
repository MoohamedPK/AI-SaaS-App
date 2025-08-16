'use client'

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
    (searchQuery === "" ||
      companion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      companion.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      companion.subject.toLowerCase().includes(searchQuery.toLowerCase()))
    &&
    (selectedSubject === "all" || selectedSubject === ""  || companion.subject.toLowerCase() === selectedSubject.toLowerCase())
  )

  return (
    <main className="container mx-auto px-4 md:px-8 flex flex-col space-y-12 bg-color min-h-screen relative">

      {/* Background Neon Circles */}
      <div className="absolute inset-0">
        <div className="neon-circle animate-[wiggle_0.2s_ease-in-out_infinite] bg-violet-400/70 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full blur-[80px] md:blur-[130px] top-1/3 left-1/4 absolute" />
        <div className="neon-circle bg-violet-400/70 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full blur-[80px] md:blur-[130px] top-1/2 right-1/4 absolute" />
      </div>

      {/* Navbar / Filters */}
        <h1 className="font-bold text-white/60 text-xl md:text-2xl">Companion Library</h1>
      <nav className="flex flex-col md:flex-row md:justify-between md:items-center z-30 border-b border-white/40 p-4 md:p-8 rounded-sm gap-4 md:gap-0">

        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <CompanionSearch setSearchQuery={setSearchQuery} />

          <div  className="flex justify-center space-x-4 ">
            <SubjectDropdown setSelectedSubject={setSelectedSubject} />
            <Link href={'/companion-library/new'}>
              <Button className="flex items-center gap-2 btn-hover cursor-pointer text-sm md:text-base">
                <Plus size={16}/> Add New Companion
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Search Query Display */}
      {searchQuery && (
        <div className="flex items-center gap-2 font-semibold z-30 text-sm md:text-base flex-wrap">
          <p>Searching for:</p>
          <q><i>{searchQuery}</i></q>
        </div>
      )}

      {/* Companions Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-30">
        {isLoading 
          ? Array(6).fill(0).map((_, i) => <CardSkeleton key={i}/>) 
          : filteredCompanions?.map((companion) =>
            <CompanionCard key={companion.id} companion={companion} />)}
      </section>
    </main>
  )
}

export default CompanionLibrary
