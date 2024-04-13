import { motion } from 'framer-motion';

export default function About() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-500 to-blue-600 p-10">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 text-center"
            >
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-4xl font-bold text-gray-800"
                >
                    About Safe Space Chatbot
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-4 text-lg text-gray-600"
                >
                    This chatbot was developed to provide a supportive environment online.
                </motion.p>
            </motion.div>
        </main>
    );
}
