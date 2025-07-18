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

const SubjectDropdown = ({subjects, setSelectedSubject}: {subjects: string[], setSelectedSubject: (value: string) => void}) => {
  return (
    <Select onValueChange={(value) => setSelectedSubject(value)}>
      <SelectTrigger className="w-[180px] border-black text-black">
        <SelectValue placeholder="Select Subject"  />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subjects</SelectLabel>
          <SelectItem className="hover-effect block cursor-pointer capitalize font-semibold" value="all">All</SelectItem>
          {subjects.map((subject) => <SelectItem key={subject} className="hover-effect block cursor-pointer capitalize font-semibold" value={subject}>{subject.toLowerCase()}</SelectItem>)}
          
          
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SubjectDropdown