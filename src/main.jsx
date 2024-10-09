import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './home';
import Contact from './Contact';
import Profile from './profile';
import Addlisting from './add-listing';
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from './components/ui/sonner';
import SearchByCategory from './search/[category]';
import SearchByOptions from './search';
import ListingDetail from './listing-details/[id]';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/contact",
    element: <Contact/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
  {
    path: "/add-listing",
    element: <Addlisting/>,
  },
  {
    path: '/search',
    element: <SearchByOptions/>
  },
  {
    path: '/search/:category',
    element: <SearchByCategory/>
  },
  {
    path: '/listing-details/:id',
    element: <ListingDetail/>
  },
]);

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
  <>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
      <Toaster/>
    </ClerkProvider>
    </>
)
