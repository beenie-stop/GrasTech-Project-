import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';

// Components
import Register from './components/register';
import SignIn from './components/signin';
import Today1 from './components/today';
import Affirmation from './components/affirmation';
import AllTasks from './components/all';
import Footer from './components/footer';
import Todo from './components/todo';
import Addlist from './components/addlist';

export default function App() {
    return (
      <BrowserRouter>
              <div>
            <Routes>
             
                <Route path="/" element={<Navigate to="/signin" replace />} />

            
                <Route path="/register" element={<Register/>} />   
                <Route path="/signin" element={<SignIn />} />     

               
                <Route path="/today" element={<Today1 />} />
                <Route path="/todo" element={<Todo />} />
                <Route path="/all" element={<AllTasks />} />
                 <Route path="/addlist" element={<Addlist />} />  
                <Route path="/affirmation" element={<Affirmation />} />
            </Routes>

            <Footer />
        </div>
        </BrowserRouter>

    );
}
