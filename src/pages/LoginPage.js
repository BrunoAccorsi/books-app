import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '@/Context/AuthContext';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    setError('');
    e.preventDefault();

    try {
      const response = await axios.post(
        '/login',
        {
          username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const token = response.data.token;
      login(token);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center align-middle">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle>Sign in or Create an Account</CardTitle>
          <CardDescription>Log in to have admin access.</CardDescription>
          {error && <p className="text-red-600">{error}</p>}
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">User name</Label>
                <Input
                  id="name"
                  placeholder="johndoe@example.com"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 justify-center">
          <Button variant="link" className="w-full">
            Forgot Password?
          </Button>

          <Button className="w-full" onClick={handleSubmit}>
            Sign in
          </Button>
          <Button variant="link" className="w-full">
            Are you new here? Create an account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
