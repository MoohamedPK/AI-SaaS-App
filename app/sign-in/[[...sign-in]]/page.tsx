import { SignIn } from "@clerk/nextjs"

const page = () => {
    return (
        <div className="center-items">
            <SignIn signUpUrl="/sign-up"/>
        </div>
        
    )
}

export default page