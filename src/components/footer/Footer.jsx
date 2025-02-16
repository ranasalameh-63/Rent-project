import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <div>
      <section className="py-10 bg-[#D7D3BF] sm:pt-16 lg:pt-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-16 gap-x-12">
          
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
          <h3 className="font-bold text-3xl">Horizon Villas</h3>
            <p className="text-base leading-relaxed text-[black] mt-7">
            Discover luxurious villas with breathtaking views and world-class amenities. Explore stunning properties, take virtual tours, and book your dream getaway with ease.
            </p>
            
            {/* Social Icons */}
            <ul className="flex items-center space-x-3 mt-9">
              <li>
                <a href="#" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-[#A59D84]">
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-[#A59D84]">
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <p className="text-sm font-bold tracking-widest text-[black] uppercase ">Useful Links</p>
            <ul className="mt-6 space-y-4">
              <li><Link to ="/" className="text-base text-black transition-all duration-200 ">Home</Link></li>
              <li><Link to ="/rentals" className="text-base text-black transition-all duration-200 ">Rentals</Link></li>
              <li><Link to ="/contact" className="text-base text-black transition-all duration-200 ">Support</Link></li>
              <li><Link to ="/about" className="text-base text-black transition-all duration-200 ">About us</Link></li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <p className="text-sm font-bold tracking-widest text-[black] uppercase">Help</p>
            <ul className="mt-6 space-y-4">
              <li><Link to ="/" className="text-base text-black transition-all duration-200 ">Customer Support</Link></li>
              <li><Link to ="/" className="text-base text-black transition-all duration-200 ">Delivery Details</Link></li>
              <li><Link to ="/" className="text-base text-black transition-all duration-200 ">Terms & Conditions</Link></li>
              <li><Link to ="/" className="text-base text-black transition-all duration-200 ">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <p className="text-sm font-semibold tracking-widest text-[black] uppercase">Subscribe to newsletter</p>
            <form action="#" method="POST" className="mt-6">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input type="email" name="email" id="email" placeholder="Enter your email"
                  className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#C1BAA1] "
                />
              </div>
              <button type="submit"
                className="inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold text-white transition-all duration-200 bg-[#A59D84] rounded-md hover:bg-[#C1BAA1]">
                Subscribe
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
    </div>
  )
}
