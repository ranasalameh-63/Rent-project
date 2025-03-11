import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  AdminDash,
  SellerDash,
  Rentals,
  PropertyDetails,
  Checkout,
  Wishlist,
  UserProfile,
  About,
  Contact,
  PageNotFound,
  BecomeOwnerProfile,
  SellerObjection,
} from "./components";
function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <PageNotFound />
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/Register',
      element: <Register />,
    },
    {
      path: '/AdminDash',
      element: <AdminDash />,
    },
    {
      path: '/SellerDash',
      element: <SellerDash />,
    },
    {
      path: '/Rentals',
      element: <Rentals />,
    },
    {
      path: '/PropertyDetails/:id',
      element: <PropertyDetails />,
    },
    {
      path: '/Checkout',
      element: <Checkout />,
    },
    {
      path: '/Wishlist',
      element: <Wishlist />,
    },
    {
      path: '/UserProfile',
      element: <UserProfile />,
    },
    {
      path: '/About',
      element: <About />,
    },
    {
      path: '/support',
      element: <Contact />,
    },
    {
      path: '/BecomeOwnerProfile',
      element: <BecomeOwnerProfile />,
    },
    {
      path: '/sellerObjection',
      element: <SellerObjection />,
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
