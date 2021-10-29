import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth';
import { useEffect, useState } from 'react';

const Login = ({ setUser, setUserEmail, setLoggedOut, auth, signOut }) => {

    // Setting up user states for authentication
    const [regEmail, setRegEmail] = useState('');
    const [regPass, setRegPass] = useState('');

    const [passShown, setPassShown] = useState({ reg: false, login: false });

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPass, setLoginPass] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [userError, setUserError] = useState('');

    // ===========================================
    // Setting user states when the current user changes
    // ===========================================
    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setUser(currentUser.uid);
            setUserEmail(currentUser.email);
        }
    });
    ;

    // ===========================================
    // Registering User
    // ===========================================
    const userReg = async () => {

        try {
            setErrorMessage('');
            setUserError('');
            await createUserWithEmailAndPassword(auth, regEmail, regPass);
            setLoggedOut(false);
        } catch (error) {
            setErrorMessage(error.message);
            setUser('');
        }
    };

    // ===========================================
    // Logging user in
    // ===========================================
    const userLogin = async () => {
        try {
            setErrorMessage('');
            setUserError('');
            await signInWithEmailAndPassword(auth, loginEmail, loginPass);
            setLoggedOut(false);
        } catch (error) {
            setErrorMessage(error.message);
            setUser('');
        }
    };

    // ===========================================
    // Displaying and hiding the passwords
    // ===========================================
    const showPass = (pass) => {
        if (pass === "login") {
            setPassShown({ reg: passShown.reg, login: !passShown.login });
        } else {
            setPassShown({ reg: !passShown.reg, login: passShown.login });
        }
    }

    // ===========================================
    // Handling errors since the prevent default does not play nice with async / await functions
    // ===========================================
    useEffect(() => {
        if (errorMessage.includes('wrong-password')) {
            setUserError('Incorrect username or password.');
        }
        else if (errorMessage.includes('internal-error')) {
            setUserError('Please enter both username and password.');
        }
        else if (errorMessage.includes('invalid-email')) {
            setUserError('Invalid Email');
        }
        else if (errorMessage.includes('email-already-in-use')) {
            setUserError('Email address already in use.');
        }
        else if (errorMessage.includes('Password should be at least 6 characters')) {
            setUserError('Password should be at least 6 characters.');
        } else {
            setUserError(errorMessage);
        }
    }, [errorMessage]);

    // Main Return
    return (
        <div className="login-screen">
            <form className="reg-form">

                <h3>Sign Up</h3>
                <div className="input-container">
                    <label htmlFor="reg-email">Email: </label>
                    <input type="email" name="reg-email" id="reg-email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required={true} />
                </div>

                <div className="input-container">
                    <label htmlFor="reg-password">Password: </label>
                    <input type={passShown.reg ? "text" : "password"} name="reg-password" id="reg-password" value={regPass} onChange={(e) => setRegPass(e.target.value)} required={true} />
                </div>
                <div className="check-container">
                    <input type="checkbox" name="reg-show-pass" id="reg-show-pass" onChange={() => showPass("reg")} value={passShown.login ? "checked" : ""} />
                    <label htmlFor="reg-show-pass">Show Password</label>
                </div>

                <button className="reg-button" type="button" onClick={userReg}>Register</button>
            </form>
            <form className="login-form">

                <h3>Login</h3>

                <div className="input-container">
                    <label htmlFor="login-email">Email: </label>
                    <input type="email" name="login-email" id="login-email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required={true} />
                </div>

                <div className="input-container">
                    <label htmlFor="login-password">Password: </label>
                    <input type={passShown.login ? "text" : "password"} name="login-password" id="login-password" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} required={true} />
                </div>

                <div className="check-container">
                    <input type="checkbox" name="login-show-pass" id="login-show-pass" onChange={() => showPass("login")} value={passShown.login ? "checked" : ""} />
                    <label htmlFor="login-show-pass">Show Password</label>
                </div>

                <button className="login-button" type="button" onClick={userLogin} >Login</button>

            </form>

            {
                userError !== '' ?
                    <p className="error-message">{userError}</p>
                    : null
            }





        </div>
    );
};

export default Login;