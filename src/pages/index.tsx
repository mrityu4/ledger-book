import { SignInButton,SignOutButton, useUser } from "@clerk/nextjs";
import {api} from '../utils/trpc'

export default function Home() {
  const user=useUser();
  const {data} = api.example.getAll.useQuery();
  console.log(data);


  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    > 
      {!user.isSignedIn && <SignInButton />}
      {!!user.isSignedIn && <SignOutButton />}
    </main>
  )
}
