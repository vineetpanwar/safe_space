import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-tr from-green-300 via-blue-500 to-purple-600 p-10">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 text-center"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7 }}
          className="text-6xl font-bold text-gray-800"
        >
          Welcome to Safe Space Chatbot!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4 text-lg text-gray-600"
        >
          Interact with our chatbot for mental health support and guidance.
        </motion.p>
        <div className="flex justify-center gap-4 mt-8">
          {["/chat", "/about", "/help"].map((path, index) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={path}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 + index * 0.2 }}
            >
              <Link href={path as keyof typeof Link}>
                <a className={`inline-block px-6 py-3 text-white font-medium text-sm leading-tight uppercase rounded shadow-md transition duration-150 ease-in-out ${path === '/chat' ? 'bg-blue-500 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800' : path === '/about' ? 'bg-yellow-500 hover:bg-yellow-700 focus:bg-yellow-700 active:bg-yellow-800' : 'bg-red-500 hover:bg-red-700 focus:bg-red-700 active:bg-red-800'}`}>
                  {path === '/chat' ? 'Start Chatting' : path === '/about' ? 'Learn More' : 'Get Help'}
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
