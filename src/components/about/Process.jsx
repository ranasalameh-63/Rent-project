import { motion } from 'framer-motion';
import "./about.css"


function Process() {
  return (
    <section className="bg-gradient-to-r from-[#F2EFE7]-500 to-white-0 py-16">
  <h2 className="text-center text-4xl font-bold mb-10 colorss">Our Process</h2>
  <div className="relative flex flex-wrap justify-center items-center space-x-16 space-y-8 md:flex-row md:space-x-16 md:space-y-0 flex-col">

    <motion.img
      src="https://img.freepik.com/free-vector/isometric-outline-time-management-concept_52683-55536.jpg"
      alt="Step 1"
      className="w-40 rounded-lg shadow-lg step floating-image"
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ yoyo: Infinity, duration: 2 }}
    />
    <motion.div
      className="flex flex-col items-center space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="text-blue-600 text-3xl arrow">&rarr;</div>
      <p className="text-gray-700 arrow">Plan Tasks</p>
    </motion.div>

    <motion.img
      src="https://img.freepik.com/free-vector/woman-thinking-concept-illustration_114360-7991.jpg"
      alt="Step 2"
      className="w-40 rounded-lg shadow-lg step floating-image"
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ yoyo: Infinity, duration: 2, delay: 0.2 }}
    />
    <motion.div
      className="flex flex-col items-center space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="text-blue-600 text-3xl arrow">&rarr;</div>
      <p className="text-gray-700 arrow">Track Progress</p>
    </motion.div>

    <motion.img
      src="https://img.freepik.com/free-vector/product-quality-concept-illustration_114360-7581.jpg"
      alt="Step 3"
      className="w-40 rounded-lg shadow-lg step floating-image"
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ yoyo: Infinity, duration: 2, delay: 0.4 }}
    />
    <motion.div
      className="flex flex-col items-center content-center space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
    >
      <div className="text-blue-600 text-3xl arrow">&rarr;</div>
      <p className="text-gray-700 arrow">Achieve Goals</p>
    </motion.div>

    <motion.img
      src="https://img.freepik.com/free-vector/blue-star-check-mark_78370-4478.jpg?t=st=1738415306~exp=1738418906~hmac=3d16381087195b0d52eb99fa27755d9713e7f16ed71f681e465e473e61006fca&w=826"
      alt="Step 4"
      className="w-40 rounded-lg shadow-lg step floating-image"
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ yoyo: Infinity, duration: 2, delay: 0.4 }}
    />
  </div>
</section>



  )
}

export default Process