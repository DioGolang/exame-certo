import Image from "next/image";

export default function IndexContent(){
    return(
        <main className='container mx-auto flex flex-col'>
            <section className='flex flex-col md:flex-row justify-center items-center gap-4'>
                {/* Card 1 */}
                <div
                    className="flex flex-col w-full md:w-1/3 items-center bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition ease-in-out duration-300">
                    <div className="flex flex-col justify-between p-6 leading-normal text-center">
                        <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Feature
                            1</h5>
                        <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">An explanation of how this
                            feature simplifies tasks for users.</p>
                        <Image src="/path-to-your-image1.jpg" alt="Feature 1" width={100} height={100}
                               className="rounded-full"/>
                    </div>
                </div>

                {/* Card 2 */}
                <div
                    className="flex flex-col w-full md:w-1/3 items-center bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition ease-in-out duration-300">
                    <div className="flex flex-col justify-between p-6 leading-normal text-center">
                        <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Feature
                            2</h5>
                        <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">An explanation of how this
                            feature simplifies tasks for users.</p>
                        <Image src="/path-to-your-image2.jpg" alt="Feature 2" width={100} height={100}
                               className="rounded-full"/>
                    </div>
                </div>

                {/* Card 3 */}
                <div
                    className="flex flex-col w-full md:w-1/3 items-center bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition ease-in-out duration-300">
                    <div className="flex flex-col justify-between p-6 leading-normal text-center">
                        <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Feature
                            3</h5>
                        <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">An explanation of how this
                            feature simplifies tasks for users.</p>
                        <Image src="/path-to-your-image3.jpg" alt="Feature 3" width={100} height={100}
                               className="rounded-full"/>
                    </div>
                </div>
            </section>


            <section className='flex justify-center items-center h-24'>
                B
            </section>
            <section className='flex justify-center items-center h-24 bg-cyan-950'>
                C
            </section>
        </main>
    )
}