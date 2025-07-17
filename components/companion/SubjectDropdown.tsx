

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const SubjectDropdown = ({subjects}: {subjects: string[]}) => {
  return (
    <Select >
      <SelectTrigger className="w-[180px] border-black text-black">
        <SelectValue placeholder="Select Subject"  />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subjects</SelectLabel>
          {subjects.map((subject) => <SelectItem key={subject} className="hover-effect block cursor-pointer capitalize font-semibold" value="apple">{subject.toLowerCase()}</SelectItem>)}
          
          
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SubjectDropdown