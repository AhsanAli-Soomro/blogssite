import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import React from 'react'

const SubNav = () => {
  return (
    <div>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <div className="">
          <SignInButton />
        </div>
      </SignedOut>

    </div>
  )
}

export default SubNav
