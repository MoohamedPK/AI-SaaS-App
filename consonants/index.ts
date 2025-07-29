export const companions = [
  {
    id: 1,
    name: "Neura1",
    subject: "Neuroscience",
    tagline: "Master brain waves with Neura!",
    image: "/imgs/Neura.png"
  },
  {
    id: 2,
    name: "Atomus",
    subject: "Physics",
    tagline: "Smash particles and unlock the universe!",
    image: "/imgs/atomus.png"
  },
  {
    id: 3,
    name: "Chrono",
    subject: "History",
    tagline: "Travel time and relive ancient wisdom!",
    image: "/imgs/chrono.png"
  },
  {
    id: 4,
    name: "Lingua",
    subject: "Languages",
    tagline: "Talk your way to the top with Lingua!",
    image: "/imgs/lingua3.png"
  },
];


import {Bolt, Layers, Check, X} from "lucide-react" 

export const pricing = [
  {
    icon: Bolt,
    title: "Basic Plan",
    price: "0",
    description: "Perfect for Testing The Waters",
    features : [
      {icon: Check, text: "10 Conversations/month"},
      {icon: Check, text: "3 Active Companion"},
      {icon: Check, text: "Basic Session Recaps"},
      {icon: X, text: "Monthly Progress Reports"},
      {icon: X, text: "Save Conversation History"},
      {icon: X, text: "Full Performance Dashboards"},
    ],
    button: {
      href: "/sign-in",
      text: "Get Started Free"
    }
  },

  {
    icon: Layers,
    title: "Core Learner",
    price: "12",
    description: "More Companions. More growth.",
    features : [
      {icon: Check, text: "Everything in Free"},
      {icon: Check, text: "Unlimited Conversations"},
      {icon: Check, text: "Up to 10 Active Companions"},
      {icon: Check, text: "Save Conversation History"},
      {icon: Check, text: "nline Quizzes & Recaps"},
      {icon: Check, text: "Monthly Progress Reports"},
    ],
    button: {
      href: "/sign-in",
      text: "Upgrade to Core"
    }
  },

  {
    title: "Pro Companion",
    price: "29",
    description: "Your personal AI-powered academy.",
    features : [
      {icon: Check, text: "Everything in Core"},
      {icon: Check, text: "Unlimited Companions"},
      {icon: Check, text: "Full Performance Dashboards"},
      {icon: Check, text: "Daily Learning Reminders"},
      {icon: Check, text: "Early Access to New Features"},
      {icon: Check, text: "Priority Support"},
    ],
    button: {
      href: "/sign-in",
      text: "Upgrade to Pro"
    }
  },
]