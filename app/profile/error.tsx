"use client";


export default function ProfileError({error, reset}: {error:Error, reset: () => void}) {

    return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong in Profile!</h2>
        <p className="mb-6 text-gray-600">{error.message}</p>
        <button
            onClick={() => reset()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
            Try again
        </button>
    </div>
    )
}