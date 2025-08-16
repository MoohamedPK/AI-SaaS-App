import { PricingPlan } from "@/ts.definitions/types";
import { Button } from "../ui/button";
import Link from "next/link";

const PricingCard = ({ content }: { content: PricingPlan }) => {
  const { title, description, price, features, button } = content;

  return (
    <div className="p-6 sm:p-8 border-2 space-y-6 sm:space-y-8 rounded-lg bg-color border-white/30 shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="text-center space-y-2 sm:space-y-3">
        <h3 className="accent-color text-xl sm:text-2xl font-bold">{title}</h3>
        <span className="text-lg sm:text-[1.5rem] text-white font-semibold">${price}/mnt</span>
        <p className="text-sm sm:text-base text-white/70">{description}</p>
      </div>

      {/* Features */}
      <ul className="space-y-3 sm:space-y-4">
        {features.map((feat, index) => (
          <li key={index} className="flex items-center space-x-3 sm:space-x-4">
            <feat.icon size={18} className="text-purple-500" />
            <p className="text-sm sm:text-base">{feat.text}</p>
          </li>
        ))}
      </ul>

      {/* Button */}
      <Link href={button.href}>
        <Button className="w-full mt-4 cursor-pointer btn-hover hover-effect text-sm sm:text-base">
          {button.text}
        </Button>
      </Link>
    </div>
  );
};

export default PricingCard;
