import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CompanionForm = () => {
  return (
    <div className="space-y-6 min-w-1/3">
        <div className="flex flex-col space-y-3">
          <label htmlFor="" className="text-sm font-medium">Companion name</label>
          <Input type="text" placeholder="Enter the companion name - ex: Calculus King" className="border border-black"/>
        </div>

        <div className="flex flex-col space-y-3">
          <label htmlFor="" className="text-sm font-medium">Subject</label>
          <Input type="text" placeholder="Enter the subject - ex: Math" className="border border-black"/>
        </div>

        <div className="flex flex-col space-y-3"> 
          <label htmlFor="" className="text-sm font-medium">What should this companion theach</label>
          <Input type="text" placeholder="Enter the topic you want to learn - ex: Derivatives" className="border border-black"/>
        </div>

        <div className="flex flex-col space-y-3"> 
          <label htmlFor="" className="text-sm font-medium">Voice type</label>
          <Select >
            <SelectTrigger className="w-full border-black text-black">
              <SelectValue placeholder="Select Voice"  />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem className="hover-effect block cursor-pointer" value="apple">Apple</SelectItem>
                
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-3">
          <label htmlFor="" className="text-sm font-medium">Speaking Style</label>
          <Select >
            <SelectTrigger className="w-full border-black text-black">
              <SelectValue placeholder="Select Style"  />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem className="hover-effect block cursor-pointer" value="apple">Apple</SelectItem>
                
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-3">
          <label htmlFor="" className="text-sm font-medium">Language</label>
          <Select >
            <SelectTrigger className="w-full border-black text-black">
              <SelectValue placeholder="Select Language"  />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem className="hover-effect block cursor-pointer " value="apple">Apple</SelectItem>
                
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button className="bg-orange-500 w-full cursor-pointer">Build Companion</Button>
    </div>
  )
}

export default CompanionForm