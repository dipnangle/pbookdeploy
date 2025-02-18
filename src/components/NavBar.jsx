import { changeLanguage } from 'i18next';
import React, {useState , useEffect} from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';

function NavBar(props) {
	const { t } = useTranslation();
	// getting the theme
	const savedTheme = localStorage.getItem('theme');
	return (
		<>
		<header className="navbar w-screen">
			<nav className="flex justify-between">
				{/* Header Logo And Name */}
				<Link to="/" className="flex items-center space-x-3 lg:pr-16 pr-6">
					<svg className="w-9 dark:fill-white fill-[#111C44]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"/><g strokeLinecap="round" strokeLinejoin="round"/><g><path d="M14.93 2.5v5.9c0 .44-.52.66-.84.37l-1.75-1.61a.496.496 0 0 0-.68 0l-1.75 1.6c-.32.3-.84.07-.84-.36V2.5c0-.28.22-.5.5-.5h4.86c.28 0 .5.22.5.5"/><path d="M16.98 2.059c-.29-.04-.55.21-.55.5v6.02c0 .76-.45 1.45-1.15 1.76-.7.3-1.51.17-2.07-.35l-.87-.8a.496.496 0 0 0-.68 0l-.87.8c-.36.34-.83.51-1.3.51a1.9 1.9 0 0 1-.77-.16c-.7-.31-1.15-1-1.15-1.76v-6.02c0-.29-.26-.54-.55-.5-2.8.35-4.02 2.24-4.02 4.94v10c0 3 1.5 5 5 5h8c3.5 0 5-2 5-5v-10c0-2.7-1.22-4.59-4.02-4.94m.52 16.69H9c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h8.5c.41 0 .75.34.75.75s-.34.75-.75.75m0-4h-4.25c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4.25c.41 0 .75.34.75.75s-.34.75-.75.75"/></g></svg>
					<h2 className="font-normal text-2xl leading-6 text-gray-800 dark:text-white">{t('personal_network')}</h2>
				</Link>
				<div className="flex space-x-5 justify-center items-center pl-2">
					<ul className="flex space-x-4">
                        <li>
                            <Link to="/">{t('contactlist')}</Link>
                        </li>
                        <li>
                            <Link to="Adduser">{t('add_contact')}</Link>
                        </li>
                    </ul>
					{/* toggle switch for the darka and light mode */}
					<button onClick={props.switch.toggleSwitch} className='p-2 border border-gray-300 dark:border-[#f4f4f5] rounded-full dark:hover:border-blue-500'>
						{savedTheme === 'light' ? 
						(<svg className="w-5 h-5 fill-black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"/><g strokeLinecap="round" strokeLinejoin="round"/><path d="M21.529 15.93c-.16-.27-.61-.69-1.73-.49-.62.11-1.25.16-1.88.13a8.4 8.4 0 0 1-5.91-2.82c-1.3-1.45-2.1-3.34-2.11-5.38 0-1.14.22-2.24.67-3.28.44-1.01.13-1.54-.09-1.76-.23-.23-.77-.55-1.83-.11-4.09 1.72-6.62 5.82-6.32 10.21.3 4.13 3.2 7.66 7.04 8.99a10 10 0 0 0 2.89.55c.16.01.32.02.48.02 3.35 0 6.49-1.58 8.47-4.27.67-.93.49-1.52.32-1.79"/></svg>) 
						:
						(<svg className="w-5 h-5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"/><g strokeLinecap="round" strokeLinejoin="round"/><path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14m0 3.96c-.55 0-1-.41-1-.96v-.08c0-.55.45-1 1-1s1 .45 1 1-.45 1.04-1 1.04m7.14-2.82c-.26 0-.51-.1-.71-.29l-.13-.13a.996.996 0 1 1 1.41-1.41l.13.13a.996.996 0 0 1-.7 1.7m-14.28 0c-.26 0-.51-.1-.71-.29a.996.996 0 0 1 0-1.41l.13-.13a.996.996 0 1 1 1.41 1.41l-.13.13c-.19.19-.45.29-.7.29M22 13h-.08c-.55 0-1-.45-1-1s.45-1 1-1 1.04.45 1.04 1-.41 1-.96 1M2.08 13H2c-.55 0-1-.45-1-1s.45-1 1-1 1.04.45 1.04 1-.41 1-.96 1m16.93-7.01c-.26 0-.51-.1-.71-.29a.996.996 0 0 1 0-1.41l.13-.13a.996.996 0 1 1 1.41 1.41l-.13.13c-.19.19-.44.29-.7.29m-14.02 0c-.26 0-.51-.1-.71-.29l-.13-.14a.996.996 0 1 1 1.41-1.41l.13.13c.39.39.39 1.02 0 1.41-.19.2-.45.3-.7.3M12 3.04c-.55 0-1-.41-1-.96V2c0-.55.45-1 1-1s1 .45 1 1-.45 1.04-1 1.04"/></svg>)
						}
					</button>
					<div className="relative">
						<select onChange={(e) => props.changeLanguage(e.target.value)} className="inputSelect">
							<option value="br">EN</option>
							<option value="ger">GER</option>
							<option value="fr">Fre</option>
							<option value="hindi">Hindi</option>
						</select>
					</div>
					<a target='_blank' href="https://github.com/dipnangle">	
						<svg width="30" height="30" viewBox="0 0 73 73" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"/><g strokeLinecap="round" strokeLinejoin="round"/><g transform="translate(2 2)" fill="none"><rect stroke="#000" strokeWidth="2" fill="#000" x="-1" y="-1" width="71" height="71" rx="14"/><path d="M58.307 21.428q-3.617-6.195-9.812-9.812Q42.299 8.001 34.96 8q-7.337 0-13.533 3.616t-9.812 9.812T8 34.961q0 8.812 5.143 15.85 5.143 7.04 13.287 9.742.948.175 1.405-.246.456-.421.456-1.052l-.018-1.896a314 314 0 0 1-.018-3.124l-.807.14q-.772.14-1.949.123a15 15 0 0 1-2.44-.246 5.45 5.45 0 0 1-2.351-1.053 4.45 4.45 0 0 1-1.545-2.158l-.35-.808q-.352-.807-1.107-1.79-.754-.984-1.527-1.334l-.245-.176a2.6 2.6 0 0 1-.457-.422 2 2 0 0 1-.315-.491q-.106-.246.175-.405.281-.157 1.018-.157l.702.105q.702.14 1.738.843a5.7 5.7 0 0 1 1.702 1.825q.808 1.439 1.949 2.194 1.14.755 2.299.755 1.158 0 2-.175a7 7 0 0 0 1.58-.527q.317-2.353 1.72-3.616-2-.211-3.598-.632-1.596-.422-3.3-1.37t-2.826-2.352-1.842-3.686-.72-5.266q0-4.248 2.774-7.232-1.3-3.195.245-7.161 1.019-.316 3.02.473 2 .79 2.93 1.352t1.493.948a25 25 0 0 1 6.74-.912q3.476 0 6.741.912l1.334-.842q1.369-.843 3.23-1.545t2.844-.386q1.58 3.968.28 7.161 2.774 2.984 2.774 7.232 0 2.984-.72 5.283t-1.86 3.687-2.844 2.334q-1.703.948-3.3 1.37-1.597.421-3.598.632 1.825 1.58 1.825 4.985v7.407q0 .631.44 1.052.438.42 1.386.246 8.145-2.703 13.288-9.742 5.142-7.038 5.142-15.85-.001-7.335-3.616-13.532" fill="#FFF"/></g></svg>
					</a>
					<a className='!ml-2' target='_blank' href="www.linkedin.com/in/dipesh-nangle-69419613a">
						<svg viewBox="0 0 48 48" width="35" height="35" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"/><g strokeLinecap="round" strokeLinejoin="round"/><circle cx="24" cy="24" r="20" fill="#0077B5"/><path fillRule="evenodd" clipRule="evenodd" d="M18.775 14.284c0 1.245-.948 2.253-2.43 2.253-1.426 0-2.374-1.008-2.344-2.253-.03-1.306.918-2.284 2.372-2.284s2.373.978 2.402 2.284M14.12 32.819V18.316h4.507v14.502zm8.12-9.874c0-1.81-.06-3.352-.12-4.627h3.915l.208 1.987h.09c.592-.92 2.075-2.312 4.477-2.312 2.965 0 5.19 1.957 5.19 6.226v8.602h-4.508v-8.037c0-1.87-.652-3.144-2.283-3.144-1.246 0-1.987.86-2.283 1.69-.119.297-.178.711-.178 1.127v8.364h-4.507z" fill="#fff"/></svg>
					</a>
				</div>
			</nav>
		</header>
		</>
	)
}

export default NavBar
