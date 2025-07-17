import { Mic, Repeat, User } from "lucide-react"
import { Button } from "../ui/button"

const LessonContolle = () => {
  return (
    <div>
        <div className="space-y-5"> 
            <div className="user center-items p-8 border-rounded">
                {/* user image  */}
                <User size={50} className="bg-neutral-400 rounded-full"/>
                <p className="text-lg font-bold">user name</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
                <Button  className="mic border-rounded center-items py-3 min-h-full cursor-pointer">
                    <Mic size={28}/>
                    <p>Turn off mic</p>
                </Button>

                <Button className="repeat border-rounded center-items py-3 h-full cursor-pointer">
                    <Repeat size={28}/>
                    <p>Repeat</p>
                </Button>
            </div>

            <Button className="w-full bg-orange-500 cursor-pointer">End Lesson</Button>
        </div>

    </div>
  )
}

export default LessonContolle