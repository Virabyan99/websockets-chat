'use client'

import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button' // Import Shadcn Button

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold">Welcome to WebSocket Chat</h1>

      {session ? (
        <div className="mt-4 flex flex-col items-center gap-4">
          <p className="text-lg">Logged in as {session.user?.name}</p>
          <Link href="/chat">
            <Button className="bg-blue-500 text-white">Go to Chat</Button>
          </Link>
          <button
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
          onClick={() => signIn('github')}
        >
          Sign In with GitHub
        </button>
      )}
    </div>
  )
}