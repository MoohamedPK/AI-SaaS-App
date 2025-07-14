import { Search } from "lucide-react"
import { Input } from "../ui/input"

const CompanionSearch = () => {
  return (
    <div className="flex items-center px-3">
        <Search size={18}/>
        <Input placeholder="search your companion" type="text" className=" border-none"/>
    </div>
  )
}

export default CompanionSearch