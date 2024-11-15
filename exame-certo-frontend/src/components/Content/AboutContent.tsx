export default function AboutContent() {
    return (
        <main className="w-full mx-auto flex flex-col items-center p-6">
            <h1 className="text-3xl font-semibold text-center text-gray-900 mb-8">
                About Us
            </h1>

            <div className="max-w-screen-lg text-center mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                    Somos uma equipe de pessoas apaixonadas e dedicadas a oferecer as melhores soluções para nossos clientes. Nossa missão é fornecer serviços de alta qualidade que superem as expectativas e ajudem nossos clientes a atingir seus objetivos.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-screen-xl">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Nossa Missão</h3>
                    <p className="text-gray-600">
                        Nossa missão é fornecer soluções inovadoras e eficazes que impulsionem o sucesso e criem valor para nossos clientes. Nós nos esforçamos para causar um impacto duradouro em cada projeto que assumimos.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Nossa Visão</h3>
                    <p className="text-gray-600">
                        Imaginamos um mundo onde a tecnologia capacita as pessoas a atingirem o seu pleno potencial, transformando empresas e comunidades através da inovação e do crescimento sustentáveis.

                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Nossos Valores</h3>
                    <p className="text-gray-600">
                        Valorizamos integridade, inovação e colaboração. Acreditamos na promoção de um ambiente de confiança e respeito enquanto trabalhamos juntos para resolver problemas complexos e alcançar resultados extraordinários.
                    </p>
                </div>
            </div>
        </main>
    );
}
