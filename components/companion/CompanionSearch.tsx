import { Search } from "lucide-react"
import { Input } from "../ui/input"

const CompanionSearch = ({setSearchQuery}: {setSearchQuery: (query:string) => void}) => {
  return (
    <div className="flex items-center w-full px-3">
        <Search size={18}/>
        <Input onChange={(e) => setSearchQuery(e.target.value)} placeholder="search your companion" type="text" className="text-white/60 border-none"/>
    </div>
  )
}

export default CompanionSearch