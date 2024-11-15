"use client";

import { useState, useEffect } from 'react';

export default function IndexFooter() {
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <>
            <footer className="relative bg-blueGray-200 pt-8 pb-6">
                <div className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20" style={{ transform: "translateZ(0)" }}>
                    <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                        <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100" />
                    </svg>
                </div>
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap text-center lg:text-left">
                        <div className="w-full lg:w-6/12 px-4">
                            <h4 className="text-3xl font-semibold">Dados Centralizados no paciente!</h4>
                            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
                                Seus laudos, exames ao seu alcance.
                            </h5>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="flex flex-wrap items-top mb-6">
                                <div className="w-full lg:w-4/12 px-4 ml-auto">
                                    <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Links Úteis</span>
                                    <ul className="list-unstyled">
                                        <li>
                                            <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#" aria-label="About Us">
                                                Sobre nós
                                            </a>
                                        </li>
                                        <li>
                                            <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#" aria-label="Contact">
                                                Contato
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Recursos</span>
                                    <ul className="list-unstyled">
                                        <li>
                                            <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#" aria-label="Terms and Conditions">
                                                Termos e Condições
                                            </a>
                                        </li>
                                        <li>
                                            <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="#" aria-label="Privacy Policy">
                                                Política de Privacidade
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-blueGray-300"/>
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                            <div className="text-sm text-blueGray-500 font-semibold py-1">
                                Copyright © {currentYear} Projeto Integrador{" "}
                                <a href="#" className="text-blueGray-500 hover:text-blueGray-800">Grupo 14</a>.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
