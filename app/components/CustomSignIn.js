import { useState } from 'react';
import { useSignIn } from '@clerk/clerk-react';

const CustomSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, setSession } = useSignIn(); // Use Clerk's useSignIn hook

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const signInResult = await signIn.create({
        identifier: email,
        password,
      });

      if (signInResult.status === 'complete') {
        setSession(signInResult.createdSessionId); // Set session if sign-in is complete
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="custom-signin-container">
      <h1>Sign In</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSignIn}>
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
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default CustomSignIn;
