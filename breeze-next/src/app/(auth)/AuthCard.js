const AuthCard = ({ logo, children }) => (
    <div className="min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <div>{logo}</div>

        <div className="w-96 sm:max-w-md mt-6 px-6 py-4 bg-whblaite shadow-md overflow-hidden sm:rounded-lg">
            {children}
        </div>
    </div>
)

export default AuthCard
