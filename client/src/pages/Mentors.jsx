import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from 'axios'



const Mentors = () => {
    const [mentorsArray, setMentorsArray] = useState([]);
    const fetchUser = async () => {
        const response = await axios.get('http://localhost:5000/api/mentor/allMentors');
        const mentors = response.data.mentors;
        setMentorsArray(mentors);
        console.log(mentors);
    };
    useEffect(() => {
        fetchUser();
    },[]);
    return (
        <div className="flex font-inter justify-center flex-col items-center bg-[#f5f5f5] min-h-screen">
            <div className="mt-0">
                <span className="text-5xl font-bold text-zinc-800">Mentors</span>
            </div>
            <div className="mt-10 bg-white shadow-lg p-10">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full  divide-y  divide-zinc-500 border-2 border-zinc-600  dark:divide-[#151515]">
                        <thead className="text-xs uppercase text-[#8C8C8C] ">
                            <tr>
                                <th className="px-10 border-r-2 border-zinc-600  first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div className="font-semibold text-center">Name</div>
                                </th>
                                <th className="px-10 w-1/3 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                    <div className="font-semibold flex items-start">Problem</div>
                                </th>
                            </tr>
                        </thead>
                        {mentorsArray.map((men)=>(
                            <tbody className="text-[13px] ">
                                <tr className='border-[#151515]'>
                                    <td className="px-10 border-r-2 border-zinc-600  first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                                        <div className='flex justify-center text-lg font-medium items-center'>{men.m_name}</div>
                                    </td>
                                    <td className="px-10  py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-800  flex justify-center items-center">
                                            <Link to={"/"+ men.m_id} class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                                                View
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>

                </div>
            </div>

        </div>
    )
}
export default Mentors