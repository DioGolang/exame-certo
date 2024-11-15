export default function ContactContent() {
    return (
        <main className="w-full mx-auto flex flex-col items-center p-6">
            <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">
                Contact Us
            </h1>

            <form className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg space-y-6">
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-lg font-medium text-gray-900">Name</label>
                    <input
                        id="name"
                        type="text"
                        className="p-4 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-900 placeholder-gray-600 transition-all duration-200"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email" className="text-lg font-medium text-gray-900">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="p-4 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-900 placeholder-gray-600 transition-all duration-200"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="message" className="text-lg font-medium text-gray-900">Message</label>
                    <textarea
                        id="message"
                        className="p-4 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-900 placeholder-gray-600 transition-all duration-200"
                        rows={6}
                        placeholder="Enter your message"
                        required
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200"
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </main>
    );
}
