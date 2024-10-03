import { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';

const CustomSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp, setSession } = useSignUp(); // Use Clerk's useSignUp hook

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const signUpResult = await signUp.create({
        emailAddress: email,
        password,
      });

      if (signUpResult.status === 'complete') {
        setSession(signUpResult.createdSessionId); // Set session if sign-up is complete
      }
    } catch (err) {
      setError('Error during sign-up');
    }
  };

  return (
    <div className="custom-signup-container text-black">
      <h1>Sign Up</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default CustomSignUp;
