// import { useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { database } from "/src/firebaseConfig";
// import { ref, push } from "firebase/database";
// import Navbar from "../navBar/NavBar";
// import Footer from "../footer/Footer";

// // جلب مفتاح Google Gemini API من متغيرات البيئة
// const genAI = new GoogleGenerativeAI("AIzaSyBJyntscA6thfETnoWWvcpdQtpuf3nOeJ4");

// const Contact = () => {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [messages, setMessages] = useState([{ role: "system", content: "Hello! How can I assist you today?" }]);
//   const [input, setInput] = useState("");
//   const [formData, setFormData] = useState({ name: "", email: "", message: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await push(ref(database, "contactMessages"), formData);
//       alert("Message sent successfully!");
//       setFormData({ name: "", email: "", message: "" });
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const handleChatSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const newMessages = [...messages, { role: "user", content: input }];
//     setMessages(newMessages);
//     setInput("");

//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//       const result = await model.generateContent(input);

//       const aiReply = result.response.candidates[0].content.parts[0].text;
//       setMessages([...newMessages, { role: "assistant", content: aiReply }]);
//     } catch (error) {
//       console.error("Error fetching AI response:", error);
//     }
//   };

//   return (
//     <div className="bg-[#EDEADE] min-h-screen">
//       <Navbar />
//       <div className="min-h-screen flex flex-col items-center py-20 px-5">
//         {/* نموذج الاتصال */}
//         <div className="w-full max-w-4xl space-y-8">
//           <div className="bg-[#C2B8A3] p-6 rounded-lg shadow-md text-[#FAF9F6]">
//             <h2 className="text-2xl font-bold text-center mb-4">📩 Contact Us</h2>
//             <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
//               <label className="text-lg font-semibold">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="✍️ Your Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="p-3 border-2 border-[#B3A890] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A49B89] text-black"
//                 required
//               />
//               <label className="text-lg font-semibold">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="📧 Your Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="p-3 border-2 border-[#B3A890] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A49B89] text-black"
//                 required
//               />
//               <label className="text-lg font-semibold">Message</label>
//               <textarea
//                 name="message"
//                 rows="4"
//                 placeholder="📝 Write your message..."
//                 value={formData.message}
//                 onChange={handleChange}
//                 className="p-3 border-2 border-[#B3A890] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A49B89] text-black"
//                 required
//               ></textarea>
//               <button className="bg-[#B3A890] text-white py-3 rounded-lg text-lg font-bold hover:bg-[#9C9278] transition duration-300">
//                 Send Message
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* خريطة الموقع */}
//         <div className="w-full mt-8">
//           <iframe
//             src="https://maps.google.com/maps?q=your-location&output=embed"
//             className="w-full h-96 rounded-lg shadow-lg"
//             title="Our Location"
//           ></iframe>
//         </div>
//       </div>

//       {/* زر فتح الشات بوت */}
//       <div onClick={() => setIsChatOpen(!isChatOpen)} className="fixed bottom-10 right-10 bg-[#A59B87] p-4 rounded-full shadow-lg cursor-pointer transition duration-300 hover:bg-[#7C7363]">
//         <span className="text-[#F5F1E8] text-xl">🤖</span>
//       </div>

//       {/* صندوق الشات بوت */}
//       {isChatOpen && (
//         <div className="fixed bottom-20 right-10 w-96 bg-[#EAE6DA] rounded-lg shadow-md z-50 p-4">
//           <div className="flex justify-between items-center border-b pb-2 mb-2">
//             <h3 className="text-lg font-bold text-[#5C5346]">AI Chatbot</h3>
//             <button onClick={() => setIsChatOpen(false)} className="text-[#5C5346] text-2xl font-bold p-2 transition duration-300 hover:text-[#3F3A32]">
//               ✖
//             </button>
//           </div>
//           <div className="h-64 overflow-y-auto bg-gray-100 p-2 rounded-md">
//             {messages.map((msg, index) => (
//               <div key={index} className={`p-2 my-1 rounded-md ${msg.role === "user" ? "bg-blue-200 self-end" : "bg-gray-300 self-start"}`}>
//                 {msg.content}
//               </div>
//             ))}
//           </div>
//           <form onSubmit={handleChatSubmit} className="flex mt-2">
//             <input
//               type="text"
//               className="flex-grow p-2 border rounded-md"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type your message..."
//             />
//             <button type="submit" className="ml-2 p-2 bg-[#A59B87] text-white rounded-md">Send</button>
//           </form>
//         </div>
//       )}
//       <Footer />
//     </div>
//   );
// };

// export default Contact;


import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { database } from "/src/firebaseConfig";
import { ref, push } from "firebase/database";
import Navbar from "../navBar/NavBar";
import Footer from "../footer/Footer";

const genAI = new GoogleGenerativeAI("AIzaSyBJyntscA6thfETnoWWvcpdQtpuf3nOeJ4");

const Contact = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "system", content: "Hello! How can I assist you today?" }]);
  const [input, setInput] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await push(ref(database, "contactMessages"), formData);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(input);

      const aiReply = result.response.candidates[0].content.parts[0].text;
      setMessages([...newMessages, { role: "assistant", content: aiReply }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <div className="bg-[#F4F4F4] min-h-screen">
      <Navbar />
      <div className="min-h-screen flex flex-col items-center py-20 px-5">
        {/* Contact Form */}
        <div className="w-full max-w-4xl space-y-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-center text-[#333] mb-6">📩 Contact Us</h2>
            <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
              <label className="text-lg font-semibold text-[#555]">Name</label>
              <input
                type="text"
                name="name"
                placeholder="✍️ Your Name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 border-2 border-[#ddd] rounded-lg focus:outline-none focus:border-[#A59B87] text-[#333]"
                required
              />
              <label className="text-lg font-semibold text-[#555]">Email</label>
              <input
                type="email"
                name="email"
                placeholder="📧 Your Email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 border-2 border-[#ddd] rounded-lg focus:outline-none focus:border-[#A59B87] text-[#333]"
                required
              />
              <label className="text-lg font-semibold text-[#555]">Message</label>
              <textarea
                name="message"
                rows="4"
                placeholder="📝 Write your message..."
                value={formData.message}
                onChange={handleChange}
                className="p-3 border-2 border-[#ddd] rounded-lg focus:outline-none focus:border-[#A59B87] text-[#333]"
                required
              ></textarea>
              <button className="bg-[#A59B87] text-white py-3 rounded-lg text-lg font-bold hover:bg-[#8C8270] transition duration-300">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Location Map */}
        <div className="w-full mt-12">
          <iframe
            src="https://maps.google.com/maps?q=your-location&output=embed"
            className="w-full h-96 rounded-xl shadow-lg"
            title="Our Location"
          ></iframe>
        </div>
      </div>

      {/* Chatbot Button */}
      <div onClick={() => setIsChatOpen(!isChatOpen)} className="fixed bottom-10 right-10 bg-[#A59B87] p-4 rounded-full shadow-lg cursor-pointer transition duration-300 hover:bg-[#8C8270]">
        <span className="text-white text-2xl">🤖</span>
      </div>

      {/* Chatbot Box */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-10 w-96 bg-white rounded-xl shadow-lg z-50 p-4">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h3 className="text-lg font-bold text-[#333]">AI Chatbot</h3>
            <button onClick={() => setIsChatOpen(false)} className="text-[#333] text-2xl font-bold p-2 transition duration-300 hover:text-[#555]">
              ✖
            </button>
          </div>
          <div className="h-64 overflow-y-auto bg-gray-50 p-3 rounded-md">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 my-1 rounded-md ${msg.role === "user" ? "bg-blue-100 self-end" : "bg-gray-200 self-start"}`}>
                {msg.content}
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className="flex mt-2">
            <input
              type="text"
              className="flex-grow p-2 border rounded-md"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit" className="ml-2 p-2 bg-[#A59B87] text-white rounded-md hover:bg-[#8C8270]">Send</button>
          </form>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Contact;