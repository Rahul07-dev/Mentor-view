import { Link, useLocation,useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from 'axios';
import toast from "react-hot-toast";

const Dashboard = () => {
    const location = useLocation();
    const { pathname } = location;
    const { mentor_id } = useParams();
    const [addStudentModal, setAddStudentModal] = useState(false);
    const [assignStudentsArray, setSssignStudentsArray] = useState([]);
    const [marksAssignedStudents, setmarksAssignedStudents] = useState([]);
    const [marksNotAssignedStudents, setNotMarksAssignedStudents] = useState([]);
    const [unassignStudentsArray, setunassignStudentsArray] = useState([]);
    const [assignNewStudents, setAssignNewStudents] = useState([]);
    const [filter, setFilter] = useState("0");
    const [replace, setReplace] = useState(false);
    const [replacableStudentId, setreplacableStudentId] = useState(-1);
    const [deleteableStudent, setdeleteableStudent] = useState();

    const [disbableAdd, setdisableAdd] = useState(false)
    const [disbableDelete, setdisableDelete] = useState(false)
    
    useEffect(() => {
        console.log("djahgljadhgla", marksAssignedStudents);
    }, [marksAssignedStudents]);
    
    // const first = useRef(second)
    const fetchStudents = async () => {
        console.log(mentor_id);
        const response = await axios.post('http://localhost:5000/api/mentor/get_assigned_students',{mentor_id:mentor_id});
        const arr = response.data.students;
        console.log(arr);
        setSssignStudentsArray(arr);
        let updatedList = arr.filter(item => item.viva != null);
        console.log("assign student",assignStudentsArray);
        setmarksAssignedStudents(updatedList);
        updatedList = arr.filter(item => item.viva == null);
        setNotMarksAssignedStudents(updatedList);
        // console.log("not assigned",marksNotAssignedStudents);
        // con
        // console.log("assigned", marksAssignedStudents);

    };
    const assignStudentCheckBoxHandler = (e)=>{
        let s_id = e.target.name;
        s_id = parseInt(s_id);
        const check = e.target.checked;
        let updatedList;
        if(check){
            updatedList = [...assignNewStudents, s_id];
        }else{
            updatedList = assignNewStudents.filter(item => item !== s_id);
        }
        setAssignNewStudents(updatedList);
    }
    const addNewStudents  = async ()=>{
        const len = assignNewStudents.length + assignStudentsArray.length;
        if(len>=3 && len<=4){
            console.log(assignNewStudents);
            const response = await axios.post('http://localhost:5000/api/mentor/add_students', { student_list: assignNewStudents, mentor_id: mentor_id });
        }else{
            alert("You have to add min 3 students and max 4 students");
        }
        fetchStudents();
        fetchUnassignedStudents();
        setAddStudentModal(false)
    }
    const replaceStudentFunc  = async ()=>{
        fetchStudents();
        const response = await axios.post('http://localhost:5000/api/mentor/rep_student', { ns_id: replacableStudentId, ds_id: deleteableStudent, m_id: mentor_id });
        // if (response)
        // {
            console.log(response)
            setAddStudentModal(false);
            fetchStudents();
            setReplace(false);
            fetchUnassignedStudents();
            setAddStudentModal(false);
        // }
    }
    const deleteStudent = async(s_id)=>{
        const len = assignStudentsArray.length;
        if(len==3){
            setReplace(true);
            setAddStudentModal(true);
            setdeleteableStudent(s_id);
        }else{
            const response = await axios.post('http://localhost:5000/api/mentor/del_student', { s_id: s_id });
            fetchStudents();
            fetchUnassignedStudents();
        }
    }
    const handleFilter = (e)=>{

       if (e.target.children[0].selected){
          setFilter(0)
       } else if (e.target.children[1].selected){
           setFilter(1)
       } else{
        setFilter(2)
       }
    //    setFilter(e.target.value);
    }
    const replaceStudentRadioHandler  = (e)=>{
        setreplacableStudentId(e.target.value);
    }
    const fetchUnassignedStudents = async () => {
        const response = await axios.get('http://localhost:5000/api/mentor/get_unassigned_students');
        const arr = response.data.students;
        // console.log(arr);
        setunassignStudentsArray(arr);
    };

    const lock = () => {
        setdisableDelete(true)
    }
    const handleLock = async () => {
        try {
            lock()
            if (marksNotAssignedStudents.length == 0){
                const response = await axios.post("http://localhost:5000/api/mentor/locked",{m_id:mentor_id});
                alert("You have successfully Locked the group")
            } else {
                alert("You can not lock the group")
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchStudents();
        fetchUnassignedStudents();
    }, []);

    return (
        <div className="flex font-inter h-screen overflow-hidden">
            {/* <Sidebar /> */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header />
                <section className='px-4 relative bg-[#F1F5F9] dark:bg-[#0c0a09] sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">

                        <div className="mb-4 sm:mb-0">
                            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-200 font-bold">Group</h1>
                        </div>
                        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                            <div className="flex flex-1 flex-col">

                                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Filter</label>
                                <select onChange={handleFilter} value={filter} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="0" key="0">All students</option>
                                    <option value="1" key="1">Assigned Marks</option>
                                    <option value="2" key="2">Not Marks Assigned</option>
                                </select>
                            </div>

                        </div>
                        {disbableDelete ? (
                            <button disabled class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                                Add
                            </button>
                        ) : (
                                <button class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                                    Add
                                </button>
                        )}
                       
                    </div>
                    <div className="dark:bg-[#151515] rounded-[28px]">
                        {/* <PickRandomTable /> */}
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full  divide-y  divide-zinc-500 border-2 border-zinc-600  dark:divide-[#151515]">
                                <thead className="text-xs uppercase text-[#8C8C8C] ">
                                    <tr>
                                        <th className="px-10 border-r-2 border-zinc-600  first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                            <div className="font-semibold text-center">Roll NO</div>
                                        </th>
                                        <th className="px-10 border-r-2 border-zinc-600  first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                            <div className="font-semibold text-center">Name</div>
                                        </th>
                                        <th className="px-10 border-r-2 border-zinc-600  first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                            <div className="font-semibold text-center">Marks</div>
                                        </th>
                                        <th className="px-10 border-r-2 border-zinc-600  first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                                            <div className="font-semibold text-center">Delete</div>
                                        </th>

                                    </tr>
                                </thead>
                                {filter == "0" && (
                                    assignStudentsArray.map((student) => (
                                        <tbody className="text-[13px] ">
                                            <tr className='border-[#151515]'>
                                                <td className="px-10 border-r-2 border-zinc-600  first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                                                    <div className='flex justify-center text-lg font-medium items-center'>{student.s_id}</div>
                                                </td>
                                                <td className="px-10 border-r-2 border-zinc-600  first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                                                    <div className='flex justify-center text-lg font-medium items-center'>{student.s_name}</div>
                                                </td>
                                                <td className="px-10  border-r-2 border-zinc-600 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-800  flex justify-center items-center">
                                                        <Link to={`/student/${student.s_id}`} class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                                                            View
                                                        </Link>
                                                    </div>
                                                </td>
                                                {disbableDelete ? (
                                                    <td className="px-10  py-4 whitespace-nowrap">
                                                        <div className="font-medium text-gray-800  flex justify-center items-center">
                                                            <button disabled to="/Student1" class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-red-600 border border-red-700 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" data-rounded="rounded-md" data-primary="red-600" data-primary-reset="{}">
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                ) : (
                                                        <td className="px-10  py-4 whitespace-nowrap">
                                                            <div className="font-medium text-gray-800  flex justify-center items-center">
                                                                <button disabled onClick={() => { deleteStudent(student.s_id) }} to="/Student1" class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-red-600 border border-red-700 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" data-rounded="rounded-md" data-primary="red-600" data-primary-reset="{}">
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                )}
                                                
                                            </tr>
                                        </tbody>
                                    ))
                                )}
                                {filter == "1" && (
                                    marksAssignedStudents.map((student) => (
                                        <tbody className="text-[13px] ">
                                            <tr className='border-[#151515]'>
                                                <td className="px-10 border-r-2 border-zinc-600  first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                                                    <div className='flex justify-center text-lg font-medium items-center'>{student.s_id}</div>
                                                </td>
                                                <td className="px-10 border-r-2 border-zinc-600  first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                                                    <div className='flex justify-center text-lg font-medium items-center'>{student.s_name}</div>
                                                </td>
                                                <td className="px-10  border-r-2 border-zinc-600 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-800  flex justify-center items-center">
                                                        <Link to={`/student/${student.s_id}`} class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                                                            View
                                                        </Link>
                                                    </div>
                                                </td>
                                                {disbableDelete ? (
                                                    <td className="px-10  py-4 whitespace-nowrap">
                                                        <div className="font-medium text-gray-800  flex justify-center items-center">
                                                            <button disabled to="/Student1" class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-red-600 border border-red-700 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" data-rounded="rounded-md" data-primary="red-600" data-primary-reset="{}">
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                ) : (
                                                    <td className="px-10  py-4 whitespace-nowrap">
                                                        <div className="font-medium text-gray-800  flex justify-center items-center">
                                                                <button disabled onClick={() => { deleteStudent(student.s_id) }} to="/Student1" class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-red-600 border border-red-700 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" data-rounded="rounded-md" data-primary="red-600" data-primary-reset="{}">
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                )}
                                            </tr>
                                        </tbody>
                                    ))
                                )}
                                {filter == "2" && (
                                    marksNotAssignedStudents.map((student) => (
                                        <tbody className="text-[13px] ">
                                            <tr className='border-[#151515]'>
                                                <td className="px-10 border-r-2 border-zinc-600  first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                                                    <div className='flex justify-center text-lg font-medium items-center'>{student.s_id}</div>
                                                </td>
                                                <td className="px-10 border-r-2 border-zinc-600  first:pl-5 last:pr-5 py-4 whitespace-nowrap">
                                                    <div className='flex justify-center text-lg font-medium items-center'>{student.s_name}</div>
                                                </td>
                                                <td className="px-10  border-r-2 border-zinc-600 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-800  flex justify-center items-center">
                                                        <Link to={`/student/${student.s_id}`} class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                                                            View
                                                        </Link>
                                                    </div>
                                                </td>
                                                {disbableDelete ? (
                                                    <td className="px-10  py-4 whitespace-nowrap">
                                                        <div className="font-medium text-gray-800  flex justify-center items-center">
                                                            <button to="/Student1" class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-red-600 border border-red-700 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" data-rounded="rounded-md" data-primary="red-600" data-primary-reset="{}">
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                ) : (
                                                    <td className="px-10  py-4 whitespace-nowrap">
                                                        <div className="font-medium text-gray-800  flex justify-center items-center">
                                                            <button onClick={() => { deleteStudent(student.s_id) }} to="/Student1" class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-red-600 border border-red-700 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" data-rounded="rounded-md" data-primary="red-600" data-primary-reset="{}">
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                )}
                                            </tr>
                                        </tbody>
                                    ))
                                )}
                            </table>

                        </div>
                    </div>
                    <div className="mt-4 flex justify-center items-center">
                        <button onClick={() => handleLock()} class="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" data-rounded="rounded-md" data-primary="blue-600" data-primary-reset="{}">
                            Lock
                        </button>
                    </div>
                </section>
            </div>

            {addStudentModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative 2xl:mt-0 mt-36 2xl:mb-0 md:mt-36 mb-8 mx-auto 2xl:w-[600px] md:w-[600px] w-[300px]">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-xl font-semibold">
                                        Add Student Form
                                    </h3>

                                </div>
                                <div className="relative p-10  flex items-center justify-center flex-col">
                                    <form>
                                    {replace==false?
                                    <div className="flex flex-1 flex-col">                                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">All Students</label>
                                                {unassignStudentsArray.map((stud) => (
                                                    <label>
                                                        <input
                                                            name={stud.s_id}
                                                            type="checkbox"
                                                            // checked={isChecked}
                                                            onChange={assignStudentCheckBoxHandler}
                                                        />
                                                        {stud.s_id} - {stud.s_name}
                                                    </label>
                                                    /* <option key={stud.s_id} value="US">{stud.s_name}</option> */

                                                ))}
                                            </div>
                                            : <div className="flex flex-1 flex-col">                                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">All Students</label>
                                                {unassignStudentsArray.map((stud) => (
                                                    <label>
                                                        <input
                                                            value={stud.s_id}
                                                            name = "replaceStudent"
                                                            type="radio"
                                                            // checked={isChecked}
                                                            onChange={replaceStudentRadioHandler}
                                                        />
                                                        {stud.s_id} - {stud.s_name}
                                                    </label>
                                                    /* <option key={stud.s_id} value="US">{stud.s_name}</option> */

                                                ))}
                                            </div>
                                    }
                                        
                                        <div className="flex items-center justify-start mt-8">
                                            {replace==false
                                                ? <button
                                                    onClick={addNewStudents}
                                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button">
                                                    Add
                                                </button>
                                            : <button
                                                    onClick={replaceStudentFunc}
                                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button">
                                                    Replace
                                                </button>
                                            }
                                            
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setAddStudentModal(false)}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    )
}
export default Dashboard