import Image from "next/image";

export const PageLoaderComponent = ({ height }: { height: string }) => {
    return <div className={`${height} flex flex-col justify-center items-center w-full`}>
        <h1 className="text-4xl text-stone-900">Loading...</h1>
        <p className="text-xl text-stone-500">Thank you for your patience</p>
        <div className="h-20 w-20 flex justify-center items-center animate-spin">
            <Image src="/logo-100x.svg" alt="" height={50} width={50} />
        </div>
    </div>
}