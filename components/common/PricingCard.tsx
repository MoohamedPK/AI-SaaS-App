import { PricingPlan } from "@/ts.definitions/types"
import { Button } from "../ui/button"
import Link from "next/link";

const PricingCard = ({content}: {content: PricingPlan}) => {

    const {title, description, price, features, button } = content;

  return (
    <div className="p-8 border-2 space-y-8 rounded-lg bg-color border-white/60 ">
        
        <div className="center-items space-y-3">
            <h3 className="accent-color text-[2rem] font-bold">{title}</h3>
            <span className="text-[1.5rem] text-white font-semibold ">${price}/mnt</span>
            <p className="text-sm">{description}</p>
        </div>

        <ul>
            {features.map((feat, index) => (
            <li key={index} className="flex items-center space-x-4 mb-5">
                <feat.icon size={18}/>
                <p>{feat.text}</p>
            </li>
            ))}
        </ul>
        
        <Link href={button.href} >
            <Button className="w-full cursor-pointer btn-hover hover-effect">{button.text}</Button>
        </Link>
    </div>
  )
}

export default PricingCard