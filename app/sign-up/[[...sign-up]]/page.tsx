import { SignUp } from "@clerk/nextjs";

/**
 *  Redirect to /new-user once signed up
 */
export default function SignUpPage() {
  return <SignUp fallbackRedirectUrl="/new-user" />;
}