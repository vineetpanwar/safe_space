import { motion } from 'framer-motion';

export default function Help() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-tl from-purple-500 to-pink-600 p-10">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 text-center"
            >
                <motion.h1
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-4xl font-bold text-gray-800"
                >
                    Help
                </motion.h1>
                <motion.p
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-4 text-lg text-gray-600"
                >
                    Here is how you can interact with our chatbot effectively.
                </motion.p>
            </motion.div>
        </main>
    );
}
