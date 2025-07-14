

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const SubjectDropdown = () => {
  return (
    <Select >
      <SelectTrigger className="w-[180px] border-black text-black">
        <SelectValue placeholder="Select Subject"  />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subjects</SelectLabel>
          <SelectItem className="hover-effect block cursor-pointer" value="apple">Apple</SelectItem>
          
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SubjectDropdown