import React from 'react'
import { useAuth} from '../../context/AuthContext'
import LoginForm from '../components/LoginForm/LoginForm';

function Employee() {
    const { isLogged, isAdmin } = useAuth();

    if (isLogged) {
        if (isAdmin) {
            return (
                <div>
                    Employee page
                </div>
            );
        } else {
            return (
                <div>
                    You are not authorized to view this page
                </div>
            );
        }
    } else {
        return (
            <div>
                <LoginForm />
            </div>
        );
    }
}

export default Employee;