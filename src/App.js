import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import Header from './components/Header';
import Expense from './components/Expense';
import Income from './components/Income';
import LoginPage from './components/LoginPage';
import {AuthProvider} from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import UpdateTile from './components/UpdateTile';
import AddData from './components/AddData';
import Settings from './components/Settings';
import SignUp from './components/SignUp';
// import Table from './components/Table'

function App() {
  return (
    <BrowserRouter>

      <AuthProvider>
    
          <Header />

          <Routes>
            <Route path = '/' exact element = {<PrivateRoute/>} >
                <Route path = '/' exact element = {<HomePage/>} />
            </Route>
            <Route path = '/expenses' exact element = {<PrivateRoute/>} >
                <Route path = '/expenses' exact element = {<Expense/>} />
            </Route>

            <Route path = '/income' exact element = {<PrivateRoute/>} >  
                <Route path = '/income' exact element = {<Income/>} />
            </Route>

            <Route path = '/update/:id' exact element = {<PrivateRoute/>} >  
                <Route path = '/update/:id' exact element = {<UpdateTile></UpdateTile>} />
            </Route>

            <Route path = '/add' exact element = {<PrivateRoute/>} >  
                <Route path = '/add' exact element = { <AddData/>} />
            </Route>

            <Route path = '/login' exact element = {<LoginPage/>} />

            <Route path = '/signup' exact element = {<SignUp/>} />
            
            <Route path = '/settings' exact element = {<PrivateRoute/>} >  
                <Route path = '/settings' exact element = { <Settings/>} />
            </Route>
            
          </Routes>
      </AuthProvider>
      
    </BrowserRouter>
  );
}

export default App;


