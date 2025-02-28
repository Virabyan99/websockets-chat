import { signIn, useSession } from 'next-auth/react'
import React from 'react'

const AuthModal = () => {
  const { data: session, status } = useSession()

  return (
    <div>
      {status === 'loading' && <div>Loading...</div>}
      {!session && (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-4">You must be signed in to view this page.</p>
          <button
            onClick={() => signIn()}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Sign In
          </button>
        </div>
      )}
    </div>
  )
}

export default AuthModal