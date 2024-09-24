import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <div className="container item-center mx-auto p-4">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  );
};

export default SignInPage;
