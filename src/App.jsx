import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import React from 'react'
import { useTranslation } from 'react-i18next'
import NavBar from './components/NavBar'
import AddUser from './components/AddUser'
import ContactList from './components/ContactList'
import EditUser from './components/EditUser'
import Page_404 from './components/Page_404'
import './Tailwind.css'
import './i18n'
import { ToastContainer, toast } from 'react-toastify'

function App() {

	const {l, i18n } = useTranslation();
	const [theme, setTheme] = useState('light')

	// storing data for dark and light mode
	useEffect(() => {
		const storedTheme = localStorage.getItem('theme');
		if(storedTheme){
			setTheme(storedTheme);
			document.documentElement.classList.add(storedTheme)
		}
	}, []);

	// defining toggele switch for dark and light theme
	const toggleSwitch = () =>{
		const newTheme = (theme === "light") ? "dark" : "light";
		setTheme(newTheme);
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(newTheme);
		localStorage.setItem('theme', newTheme);
	};

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};

	const toaster = (type, data) =>{
		const theme = localStorage.getItem('theme');
		toast[type](data, {
			position: "top-right",
			autoClose: 7000,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: theme,
		});
	}
	
	return (
		<BrowserRouter>
			<div className={`App ${theme}`}>
				<NavBar switch={{toggleSwitch}} l={l} changeLanguage={changeLanguage}/>
				<div className="bg">
					<Routes>
						<Route path='/' element={<ContactList switch={{toaster}}/>}/>
						<Route path='AddUser' element={<AddUser switch={{toaster}} />}/>
						<Route path='EditUser/:id' element={<EditUser switch={{toaster}} />}/>
						<Route path="*" element={<Page_404 />} />
					</Routes>
				</div>
			</div>
			<ToastContainer/>
		</BrowserRouter>
	)
}

export default App
