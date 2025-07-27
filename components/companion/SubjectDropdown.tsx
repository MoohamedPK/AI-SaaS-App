"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { subjects } from "@/constants/index"

const SubjectDropdown = ({setSelectedSubject}: {setSelectedSubject: (value: string) => void}) => {
  return (
    <Select onValueChange={(value) => setSelectedSubject(value)}>
      <SelectTrigger className="w-[180px] border-white/40 text-white/60">
        <SelectValue placeholder="Select Subject"  />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subjects</SelectLabel>
          <SelectItem className="hover:text-black block cursor-pointer capitalize font-semibold" value="all">All</SelectItem>
          {subjects.map((subject) => <SelectItem key={subject.name} className="hover:text-zinc-900 block cursor-pointer capitalize font-semibold" value={subject.name}>{subject.name.toLowerCase()}</SelectItem>)}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SubjectDropdown