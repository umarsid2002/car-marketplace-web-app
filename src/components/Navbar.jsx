import { useUser, UserButton, SignInButton } from '@clerk/clerk-react'
import { Button } from './ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const {user, isSignedIn} = useUser()
  return (
    <div className='flex justify-between items-center shadow-sm p-4'>
      <Link to={'/'}><img src="/logo.svg" width={150} height={100} alt="" /></Link>

      <ul className='hidden md:flex gap-16'>
        <Link to={'/'}><li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Home</li></Link>
        <Link to={'/search'}><li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Search</li></Link>
        <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>New</li>
        <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Preowned</li>
      </ul>

      {
        isSignedIn ? 
        <div className='flex items-center gap-5'>
          <UserButton/>
          <Link to={'/profile'}>
          <Button>Submit Listing</Button>
          </Link>
        </div>:
        <SignInButton>
        <Button>Signin</Button>
        </SignInButton>
      }

    </div>
  )
}

export default Navbar