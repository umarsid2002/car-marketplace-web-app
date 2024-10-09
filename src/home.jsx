import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from './components/ui/button';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Category from './components/Category';
import MostSearchedCar from './components/MostSearchedCar';
import InfoSection from './components/InfoSection';
import Footer from './components/Footer';

const Home = () => {
  return (
    <div>
      {/* Header */}
      <Navbar/>
      {/* Hero */}
      <Hero/>
      {/* Category */}
      <Category/>
      {/* Most Searched Cars */}
      <MostSearchedCar/>
      {/* Most Searched Car */}
      <InfoSection/>
      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default Home