import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <SignIn />
    </div>
  );
}
