import {Routes as MyRoutes, Route} from 'react-router-dom';
import AppProtection from './AppProtection';
import Register from '../Auth/Register';
import Chat from '../Pages/Chat/Chat';
import Login from '../Auth/Login';
import Users from '../Pages/Users/Users';

const Routes = () => {
    return(
        <MyRoutes>
            {/* ONBOARDING */}
            <Route path='/' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>

            {/* PROTECTED ROUTES */}
            <Route element={<AppProtection/>}>
                <Route path='/chat'>
                    <Route index element={<Users/>}/>
                    <Route path=':id' element={<Chat/>}/>
                </Route>
            </Route>
            
        </MyRoutes>
    )
}

export default Routes;