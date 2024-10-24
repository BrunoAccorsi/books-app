import { Button } from './components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import './global.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-300 p-4 text-gray-800 text-center">
        <h1 className="text-3xl">Book store</h1>
      </header>
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className=" flex items-center justify-center align-middle">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Sign in or Create an Account</CardTitle>
              <CardDescription>Log in to have admin access.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">User name</Label>
                    <Input id="name" placeholder="johndoe@example.com" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 justify-center">
              <Button variant="link" className="w-full">
                Forgot Password?
              </Button>
              <Button className="w-full">Sign in</Button>
              <Button variant="link" className="w-full">
                Are you new here? Create an account
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <footer className="bg-slate-600 p-4 text-white text-center">
        <p>&copy; 2024 My Responsive Website</p>
      </footer>
    </div>
  );
}

export default App; //
