import Image from 'next/image'
import { Inter } from 'next/font/google'
import { SignInButton,SignOutButton, useUser } from "@clerk/nextjs";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const user=useUser();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    > 
      {!user.isSignedIn && <SignInButton />}
      {!!user.isSignedIn && <SignOutButton />}
    </main>
  )
}
