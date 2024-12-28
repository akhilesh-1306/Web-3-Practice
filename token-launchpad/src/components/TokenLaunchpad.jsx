const TokenLaunchpad = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h1 className="text-2xl font-bold">Solana Token Launchpad</h1>
            <input
                className="inputText border border-gray-300 rounded-lg p-2 w-64"
                type="text"
                placeholder="Name"
            />
            <input
                className="inputText border border-gray-300 rounded-lg p-2 w-64"
                type="text"
                placeholder="Symbol"
            />
            <input
                className="inputText border border-gray-300 rounded-lg p-2 w-64"
                type="text"
                placeholder="Image URL"
            />
            <input
                className="inputText border border-gray-300 rounded-lg p-2 w-64"
                type="text"
                placeholder="Initial Supply"
            />
            <button className="btn bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
                Create a token
            </button>
        </div>

    )
}

export default TokenLaunchpad;