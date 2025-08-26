"use client";


export default function GlobalError ({error, reset}: {error: Error, reset: () => void}) {

    return (
        <html>
            <body>
                <div className="flex flex-col items-center justify-center h-screen text-center">
                <h1 className="text-3xl font-bold mb-4">Unexpected Error</h1>
                <p className="mb-6">{error.message}</p>
                <button
                    onClick={() => reset()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Try again
                </button>
                </div>
            </body>
        </html>
    )
}