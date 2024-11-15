export default function Login() {
    const siteName = process.env.SITE_NAME
    return (
        <>
            <div className='flex flex-col md:flex-row w-100'>
                <section className="flex-1 w-100 md:w-32 bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <a href="#"
                           className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            {siteName}
                        </a>
                        <div
                            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Faça login em sua conta
                                </h1>
                                <form className="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label htmlFor="email"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Email
                                        </label>
                                        <input type="email" name="email" id="email"
                                               className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               placeholder="name@company.com" required/>
                                    </div>
                                    <div>
                                        <label htmlFor="password"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" placeholder="••••••••"
                                               className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                               required/>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input id="remember" aria-describedby="remember" type="checkbox"
                                                       className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                       required/>
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                                    Remember me
                                                </label>
                                            </div>
                                        </div>
                                        <a href="#"
                                           className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                                            esqueceu a senha?
                                        </a>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-blue-700 hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-blue-700 dark:focus:ring-primary">
                                        Entrar
                                    </button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Não tem uma conta ainda?
                                        <a href="#"
                                           className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                            Inscrever-se
                                        </a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='flex-1 w-100 md:w-64 relative bg-cover bg-center bg-no-repeat h-screen opacity-70'
                         style={{backgroundImage: "url('/img/casal-feliz.jpg')"}}>

                    <div className='flex flex-col justify-center items-center h-screen'>
                        <div className='bg-slate-900 opacity-75 p-8 rounded-lg text-center'>
                            <p className='text-4xl text-white text-shadow-md'>
                                Sua saúde em foco. Acesse seus laudos, tire suas dúvidas e mantenha-se informado.
                            </p>
                            <p className='text-4xl mt-5 text-white text-shadow-md'>
                                Seu bem-estar em suas mãos. Acompanhe seus resultados.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}