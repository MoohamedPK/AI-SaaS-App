import Image from "next/image"
import Link from "next/link"


const Links = [{name: "Home", href: "/"}, {name: "Learning Companions", href: "/companion-library"}, {
    name: "My Journey", href: "/profile"
}]

const Navbar = () => {
  return (
    <div className="container flex-between mb-5">
        <div className="logo">
            <Image src={'/public/logo.svg'} alt="logo" width={50} height={50}/>
        </div>

        <ul className="flex-items">
            {Links.map(link => (
                <li key={link.name} className="hover-effect font-semibold">
                    <Link href={link.href}>{link.name}</Link>
                </li>
            ))}
        </ul>

        {/* user Profile */}
    </div>
  )
}

export default Navbar