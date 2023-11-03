import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Assign = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const { student_id } = useParams();
    // const [assign, setAssign] = useState(true)
    const [readOnly, setReadOnly] = useState(true);
    const [viva, setViva] = useState(null);
    const [execution, setExecution] = useState(null);
    const [ideation, setIdeation] = useState(null);

    const handleInput = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        if(name=="viva"){
            setViva(val);
        }
        if (name =="ideation"){
            setIdeation(val);
        }
        if(name=="execution"){
            setExecution(val);
        }
    }

    const goBack = () => {
        navigate(-1) // This will go back to the previous page or route.
    };
    const fetchMarks = async () => {
        console.log(student_id);
        const response = await axios.post('http://localhost:5000/api/student/getMarks', { student_id: student_id });
        const arr = response.data.students;
        setViva(arr[0].viva);
        setExecution(arr[0].execution);
        setIdeation(arr[0].ideation);
    };
    const saveChanges = async()=>{
        const response = await axios.post('http://localhost:5000/api/student/editMarks', { student_id: student_id, viva:viva,ideation:ideation,execution:execution });
        goBack()
        // alert("changes are made successfully");
        alert("Changes are made successfully")
        setReadOnly(true);
    }
    
    useEffect(()=>{
        fetchMarks();
    },[])

    return (
        <div className="flex font-inter h-screen overflow-hidden">
            {/* <Sidebar /> */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header />
                <section className='px-4 relative bg-[#F1F5F9] dark:bg-[#0c0a09] sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
                    <div className="sm:flex flex-col sm:items-center mb-8">

                        <div className="mb-4 sm:mb-0">
                            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-200 font-bold">Assign Marks to Student</h1>
                        </div>
                        <div className="grid grid-flow-col mt-10 sm:auto-cols-max justify-start sm:justify-end gap-2">
                            <div className="flex flex-col">

                                <div className="mt-10">
                                    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                        <div class="mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                            Ideation
                                            </label>
                                            <input readOnly={readOnly} value={ideation} onChange={handleInput} name="ideation" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Subject1" />
                                        </div>
                                        <div class="mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                Execution
                                            </label>
                                            <input readOnly={readOnly} value={execution} onChange={handleInput} name="execution" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Subject2" />
                                        </div>
                                        <div class="mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                                                Viva
                                            </label>
                                            <input readOnly={readOnly} value={viva} onChange={handleInput} name="viva" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Subject3" />
                                        </div>
                                    </form>

                                </div>
                                <div className="mt-6">

                                    <button onClick={saveChanges} class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-green-600 border rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                                       Save
                                    </button>
                                    <button onClick={goBack} class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-red-600 border rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                                       Cancel
                                    </button>
                                    <button onClick={()=>{setReadOnly(false)}} class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-gray-600 border rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                                       Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}
export default Assign