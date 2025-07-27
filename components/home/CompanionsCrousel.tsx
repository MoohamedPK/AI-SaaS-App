// "use client";

// import Link from "next/link";
// import { Button } from "../ui/button";
// import Image from "next/image";
// import { useRef, useEffect } from "react";

// import gsap from "gsap";
// import {ScrollTrigger} from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger)


// const CompanionsCrousel = () => {


//   return (
//     <section className="h-[300dvh] flex flex-col text-white/60 pt-12 relative overflow-hidden">
        
//         <div className="w-full absolute">
//             <div className="size-[25rem] bg-purple-500 blur-[200px] top-1/2 left-0 -translate-x-52  translate-y-1/2 rotate-90
//                 rounded-tl-full rounded-tr-full ">

//             </div>
//         </div>

//         <div className="w-full absolute">
//             <div className="size-[25rem] bg-purple-500 blur-[200px] top-1/2 right-0 translate-x-[90rem]  translate-y-1/2 rotate-90
//                 rounded-tl-full rounded-tr-full ">

//             </div>
//         </div>



//         <div className="text-center text-[30px] font-bold pt-20">
//             <h1>Companions Carousel</h1>
//         </div>


//         <main className="grid grid-cols-2 gap-5 size-full container z-90">

//             <section className="left flex flex-col justify-center space-y-6">
//                 <h1 className="text-[3rem]">Meet Your Study Buddies</h1>
//                 <p className="max-w-[35rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero excepturi nam sequi hic cum, natus earum quas aperiam explicabo iure!</p>

//                 <Link href={"/companion-library"} >
//                     <Button className="cursor-pointer btn-hover">Start Lesson</Button>
//                 </Link>
//             </section>


//             <section className="right ">

//                 <div className="wrapper bg-color flex justify-center items-center sticky top-[10px] overflow-hidden">
//                     <div className="relative flex flex-col justify-center size-full rounded-lg">
//                         <div className="border border-white/30 rounded-lg shadow-xl  p-5">
//                             <div className="flex justify-between items-center">
//                                 <div className="relative">
//                                     <div className="animate-pulse before:w-full before:h-full before:bg-purple-500/60 before:absolute before:bottom-0 before:-left-2  before:blur-[60px]">
//                                         <h1 className="text-purple-600 text-shadow-2xs text-shadow-purple-400 text-[2.5rem] font-bold">Neura1</h1>
//                                         <h3 className="">Neuroscience</h3>
//                                     </div>
//                                 </div>
//                                 <div className="avatar translate-x-10 -translate-y-20"><Image  src={"/imgs/atomus.png"} alt="avatar" width={200} height={200}/></div>
//                             </div>
//                             <i className="text-[1.3rem]">“Master brain waves with Neura!”</i>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="wrapper bg-color flex justify-center items-center sticky top-0">
//                     <div className="relative flex flex-col justify-center size-full rounded-lg">
//                         <div className="border border-white/30 rounded-lg shadow-xl  p-5">
//                             <div className="flex justify-between items-center">
//                                 <div className="relative">
//                                     <div className="animate-pulse before:w-full before:h-full before:bg-purple-500/60 before:absolute before:bottom-0 before:-left-2  before:blur-[60px]">
//                                         <h1 className="text-purple-600 text-shadow-2xs text-shadow-purple-400 text-[2.5rem] font-bold">Neura2</h1>
//                                         <h3 className="">Neuroscience</h3>
//                                     </div>
//                                 </div>
//                                 <div className="avatar translate-x-10 -translate-y-20"><Image  src={"/imgs/atomus.png"} alt="avatar" width={200} height={200}/></div>
//                             </div>
//                             <i className="text-[1.3rem]">“Master brain waves with Neura!”</i>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="wrapper bg-color flex justify-center items-center sticky top-0">
//                     <div className="relative flex flex-col justify-center size-full rounded-lg">
//                         <div className="border border-white/30 rounded-lg shadow-xl  p-5">
//                             <div className="flex justify-between items-center">
//                                 <div className="relative">
//                                     <div className="animate-pulse before:w-full before:h-full before:bg-purple-500/60 before:absolute before:bottom-0 before:-left-2  before:blur-[60px]">
//                                         <h1 className="text-purple-600 text-shadow-2xs text-shadow-purple-400 text-[2.5rem] font-bold">Neura3</h1>
//                                         <h3 className="">Neuroscience</h3>
//                                     </div>
//                                 </div>
//                                 <div className="avatar translate-x-10 -translate-y-20"><Image  src={"/imgs/atomus.png"} alt="avatar" width={200} height={200}/></div>
//                             </div>
//                             <i className="text-[1.3rem]">“Master brain waves with Neura!”</i>
//                         </div>
//                     </div>
//                 </div>

                
//             </section>
//         </main>
//     </section>
//   )
// }

// export default CompanionsCrousel