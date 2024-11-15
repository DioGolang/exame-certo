import Image from "next/image";

export default function IndexContent(){
    return(
        <main className='w-full mx-auto flex flex-col'>
            <section className='flex flex-col md:flex-row justify-center items-center gap-4 mt-2'>
                {/* Card 1 */}
                <div
                    className="flex flex-col w-full md:w-1/3 items-center bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition ease-in-out duration-300">
                    <div className="flex flex-col justify-between p-6 leading-normal text-center">
                        <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Centralização de Exames
                        </h5>
                        <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                            Gerencie todos os seus exames médicos em um único lugar, de forma prática e segura.
                        </p>
                        {/*<Image src="/path-to-your-image1.jpg" alt="Feature 1" width={100} height={100}*/}
                        {/*       className="rounded-full"/>*/}
                    </div>
                </div>

                {/* Card 2 */}
                <div
                    className="flex flex-col w-full md:w-1/3 items-center bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition ease-in-out duration-300">
                    <div className="flex flex-col justify-between p-6 leading-normal text-center">
                        <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Acompanhamento Gráfico
                        </h5>
                        <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                            Visualize tendências e análises detalhadas da sua saúde ao longo do tempo.
                        </p>
                        {/*<Image src="/path-to-your-image2.jpg" alt="Feature 2" width={100} height={100}*/}
                        {/*       className="rounded-full"/>*/}
                    </div>
                </div>

                {/* Card 3 */}
                <div
                    className="flex flex-col w-full md:w-1/3 items-center bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition ease-in-out duration-300">
                    <div className="flex flex-col justify-between p-6 leading-normal text-center">
                        <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Segurança Garantida
                        </h5>
                        <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                            Dados protegidos com autenticação segura e criptografia avançada.
                        </p>
                        {/*<Image src="/path-to-your-image3.jpg" alt="Feature 3" width={100} height={100}*/}
                        {/*       className="rounded-full"/>*/}
                    </div>
                </div>
            </section>
            <section className="flex justify-center items-center h-24 bg-gray-100 dark:bg-gray-900 mt-2">
                <div className="text-center">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Já está pronto para começar?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Crie sua conta gratuitamente e aproveite todos os benefícios do Exame Certo.
                    </p>
                </div>
            </section>
            <section
                className="flex flex-col md:flex-row justify-between items-center h-auto bg-cyan-950 text-white py-8 px-4 mt-2">
                {/* Info Section */}
                <div className="md:w-1/2 mb-4 md:mb-0 text-center md:text-left">
                    <h3 className="text-xl font-bold">Entre em contato conosco</h3>
                    <p className="mt-2">
                        Precisa de ajuda? Estamos disponíveis para responder suas dúvidas e ouvir seu feedback.
                    </p>
                </div>
                {/* Call to Action */}
                <div className="md:w-1/2 flex flex-col items-center md:items-end">
                    <a
                        href="/contact"
                        className="bg-white text-cyan-950 font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition duration-300"
                    >
                        Fale Conosco
                    </a>
                </div>
            </section>
        </main>
    )
}