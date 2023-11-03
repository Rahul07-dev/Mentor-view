import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div>
            <header className="sticky dark:bg-[#0c0a09d7] top-0 backdrop-blur-lg border-b dark:border-zinc-800 border-zinc-200 bg-opacity-30 z-30">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 -mb-px">
                        <div className="flex"></div>
                        <div className="flex items-center space-x-3">
                            <Link to='/' class="inline-flex items-center justify-center h-9 px-6 font-medium tracking-wide text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600 focus:shadow-outline focus:outline-none">
                                Back to Home
                            </Link>

                        </div>

                    </div>
                </div>
            </header>
        </div>
    )
}
export default Header