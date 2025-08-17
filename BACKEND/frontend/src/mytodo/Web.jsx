// App.js or Web.js
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Today1 from './Today1';
import Todo from './Todo';
import Addlist from './Addlist';
import Affirmation from './Affirmation';
import AllTasks from './All1';
import Footer from './Footer'; // ← Import footer

export default function Web() {
    return (
        <div >
            <Routes>
                <Route path="/" element={<Navigate to="/signup" replace />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Today1" element={<Today1 />} />
                <Route path="/Todo" element={<Todo />} />
                <Route path="/All1" element={<AllTasks />} />
                <Route path="/Addlist" element={<Addlist />} />
                <Route path="/Affirmation" element={<Affirmation />} />
            </Routes>

            <Footer /> {/* ← Footer shows on every page */}
        </div>
    );
}
