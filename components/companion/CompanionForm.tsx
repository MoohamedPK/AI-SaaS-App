"use client"

import { companionProps } from "@/ts.definitions/types"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel
} from "@/components/ui/select"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { createNewCompanion } from "@/actions/companion/createCompanion"
import { useState } from "react"
import Loading from "../ui/Loading"
import { toast } from "sonner"
import { redirect } from "next/navigation"
import { subjects, voices } from "@/constants/index"

const CompanionForm = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {register, handleSubmit, control, watch} = useForm<companionProps>();

  const selectedVoiceGender = watch("voice");

  const onSubmit:SubmitHandler<companionProps> = async (formData) => {
    try {
      setIsLoading(true)

      const voiceId = voices[selectedVoiceGender?.toLowerCase() as "male" | "female"]

      const finaleData = {...formData, voice: voiceId}
      await createNewCompanion(finaleData);
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      toast.success("Companion is Created")
      redirect("/companion-library")
    }
    
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 min-w-1/3">

        <div className="flex flex-col space-y-3">
          <label htmlFor="" className="text-sm font-medium">Companion name</label>
          <Input type="text" required placeholder="Enter the companion name - ex: Calculus King" className="border border-black" {...register("name")}/>
        </div>

      <Controller
        name="subject"
        control={control}
        render={ ({field}) => (
          <Select required onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full border-black text-black">
              <SelectValue placeholder="Select Subject"  />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Subjects</SelectLabel>
                <SelectItem className="hover-effect block cursor-pointer capitalize font-semibold" value="all">All</SelectItem>
                {subjects.map((subject) => <SelectItem key={subject.name} className="hover-effect block cursor-pointer capitalize font-semibold" value={subject.name}>{subject.name.toLowerCase()}</SelectItem>)}
              </SelectGroup>
            </SelectContent>
          </Select>

        )}
      />

        <div className="flex flex-col space-y-3"> 
          <label htmlFor="" className="text-sm font-medium">What should this companion theach</label>
          <Input type="text" required placeholder="Enter the topic you want to learn - ex: Derivatives" className="border border-black" {...register("topic")}/>
        </div>

    <Controller
      name="style"
      control={control}
      
      render={({ field }) => (
        <Select required onValueChange={field.onChange} value={field.value}>
          <SelectTrigger className="w-full border-black text-black">
            <SelectValue placeholder="Select Style" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Formal">Formal</SelectItem>
              <SelectItem value="Casual">Casual</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />

    <Controller
        name="voice"
        control={control}
        render={({ field }) => (
          <Select required onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full border-black text-black">
              <SelectValue placeholder="Select Voice" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
    />

        <div className="flex flex-col space-y-3"> 
          <label htmlFor="" className="text-sm font-medium">Duration</label>
          <Input required type="number" placeholder="Enter your learning duration - ex: 20 mins" className="border border-black" {...register("duration")}/>
        </div>

        <Button type="submit" className="bg-orange-500 w-full cursor-pointer transition-all duration-300" disabled={isLoading}>{isLoading ? <Loading/> : "Build Companion" }</Button>
    </form>
  )
}

export default CompanionForm