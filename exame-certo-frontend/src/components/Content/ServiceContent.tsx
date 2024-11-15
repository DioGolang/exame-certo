export default function ServiceContent() {
    return (
        <main className="w-full mx-auto flex flex-col items-center p-6">
            <h1 className="text-3xl font-semibold text-center text-gray-900 mb-8">
                Our Services
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-xl">
                <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Service 1</h3>
                    <p className="text-gray-600 mb-4">
                        A brief description of the service. Explain the benefits and features that make this service stand out.
                    </p>
                    <a
                        href="#"
                        className="text-blue-600 hover:text-blue-800 transition duration-200"
                    >
                        Learn More
                    </a>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Service 2</h3>
                    <p className="text-gray-600 mb-4">
                        A brief description of the service. Highlight what makes this option a great choice for users.
                    </p>
                    <a
                        href="#"
                        className="text-blue-600 hover:text-blue-800 transition duration-200"
                    >
                        Learn More
                    </a>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Service 3</h3>
                    <p className="text-gray-600 mb-4">
                        A brief description of the service. Provide a clear explanation of the unique value proposition.
                    </p>
                    <a
                        href="#"
                        className="text-blue-600 hover:text-blue-800 transition duration-200"
                    >
                        Learn More
                    </a>
                </div>

                {/* Você pode adicionar mais "service cards" aqui seguindo o mesmo modelo */}
            </div>
        </main>
    );
}
