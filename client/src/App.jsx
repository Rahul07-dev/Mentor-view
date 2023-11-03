import { Route, Routes } from "react-router-dom"
import Assign from "./components/Assign"
import Dashboard from "./pages/Dashboard"
import Mentors from "./pages/Mentors"

const App = () => {
    return (
        <div>
            <Routes>
                <Route
                    path='/'
                    element={
                        <Mentors />
                    }
                />
                <Route
                    path='/:mentor_id'
                    element={
                        <Dashboard />
                    }
                />
                <Route
                    path='student/:student_id'
                    element={
                        <Assign />
                    }
                />
            </Routes>
        </div>
    )
}
export default App