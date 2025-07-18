import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const subjects = [
  { name: "Mathematics", color: "#A9D6F5", iconName: "Calculator" },
  { name: "Physics", color: "#F5A3A3", iconName: "Atom" },
  { name: "Chemistry", color: "#9FE9B3", iconName: "FlaskConical" },
  { name: "Biology", color: "#D7B8F4", iconName: "Dna" },
  { name: "History", color: "#FFD27A", iconName: "BookOpen" },
  { name: "Literature", color: "#8FEFE6", iconName: "ScrollText" },
  { name: "Computer Science", color: "#B0BDC8", iconName: "Monitor" },
  { name: "Geography", color: "#F9AE73", iconName: "Globe" },
  { name: "Art", color: "#F5A365", iconName: "Paintbrush" },
  { name: "Music", color: "#79E0B3", iconName: "Music" }
];