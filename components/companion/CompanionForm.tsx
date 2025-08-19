"use client";

import { companionProps } from "@/ts.definitions/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel
} from "@/components/ui/select";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { createNewCompanion } from "@/actions/companion/createCompanion";
import { useState } from "react";
import Loading from "../ui/Loading";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { subjects, voices } from "@/constants/index";
import { ChevronRight } from "lucide-react";

const CompanionForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit, control, watch } = useForm<companionProps>();
  const selectedVoiceGender = watch("voice");

  const onSubmit: SubmitHandler<companionProps> = async (formData) => {
    try {
      setIsLoading(true);
      const voiceId = voices[selectedVoiceGender?.toLowerCase() as "male" | "female"];
      const finaleData = { ...formData, voice: voiceId };
      await createNewCompanion(finaleData);
      toast.success("Companion is Created");
      redirect("/companion-library");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-lg mx-auto p-4 sm:p-6 md:p-8 w-full"
    >
      {/* Companion Name */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Companion Name</label>
        <Input
          type="text"
          required
          placeholder="Enter the companion name - ex: Calculus King"
          className="border border-violet-800"
          {...register("name")}
        />
      </div>

      {/* Subject */}
      <Controller
        name="subject"
        control={control}
        render={({ field }) => (
          <Select required onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full border-violet-800 text-white">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="bg-transparent">
                <SelectLabel>Subjects</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem
                    key={subject.name}
                    className="hover-effect block cursor-pointer capitalize font-semibold"
                    value={subject.name}
                  >
                    {subject.name.toLowerCase()}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      {/* Topic */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">What should this companion teach</label>
        <Input
          type="text"
          required
          placeholder="Enter the topic you want to learn - ex: Derivatives"
          className="border border-violet-800"
          {...register("topic")}
        />
      </div>

      {/* Style */}
      <Controller
        name="style"
        control={control}
        render={({ field }) => (
          <Select required onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full border-violet-800 text-white">
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

      {/* Voice */}
      <Controller
        name="voice"
        control={control}
        render={({ field }) => (
          <Select required onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full border-violet-800 text-white">
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

      {/* Duration */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Duration (mins)</label>
        <Input
          required
          type="number"
          placeholder="Enter your learning duration - ex: 20 mins"
          className="border border-violet-800"
          {...register("duration")}
        />
      </div>

      {/* Submit Button */}

        <Button
        type="submit"
          disabled={isLoading}
          variant="ghost"
          className="cursor-pointer w-full bg-white/10 hover:bg-white/20 border border-white/10
            text-white backdrop-blur-md transition-all duration-300
            hover:border-purple-600/50 hover:text-white
            group-hover:shadow-lg group-hover:shadow-purple-600/20 flex items-center justify-between"
        >
          {isLoading ? <Loading /> : "Build Companion"}
          <ChevronRight />
        </Button>
    </form>
  );
};

export default CompanionForm;
