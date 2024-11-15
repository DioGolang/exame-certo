
export default function IndexHeader(){
    return (
        <>
            <header className="relative bg-cover bg-center bg-no-repeat h-screen"
                    style={{ backgroundImage: "url('/img/previdencia-social.jpg')"}}>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-900 opacity-75"></div>

                <div
                    className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
                    <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                        <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
                            Dados Centralizados no paciente, seus laudos e exames

                            <strong className="block font-extrabold text-rose-500">ao seu alcance! </strong>
                        </h1>

                        <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
                            No projeto integrador realizado pelos alunos da Univesp, desenvolvemos este software com o
                            objetivo de centralizar os dados, laudos e exames dos pacientes. </p>

                        <div className="mt-8 flex flex-wrap gap-4 text-center">
                            <a
                                href="#"
                                className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                            >
                                Iniciar Cadastro
                            </a>

                            <a
                                href="#"
                                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                            >
                                Saber mais
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}