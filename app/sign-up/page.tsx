import { SignUp } from "@clerk/nextjs"

const Register = () => {
  return (
    <div className="center-items">
        <SignUp routing="hash" signInUrl="/sign-in"/>
    </div>
  )
}

export default Register