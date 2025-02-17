import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';
import Processing from './Processing';

const ContactList = (props) => {
	const { t } = useTranslation()
	const [contacts, set_contacts] = useState([]);
	const [delete_id, set_delete_id] = useState(null);
	const [is_modal_open, set_is_modal_open] = useState(false);
	const [loading, set_loading] = useState(true);

	const confirm_delete = (id) => {
		set_delete_id(id);
		set_is_modal_open (true);
	};

	const cancel_delete = () => {
		set_delete_id(null);
		set_is_modal_open (false);
	};

	const navigate = useNavigate();

	useEffect(() => {
		
		set_loading(true);

		fetch('http://192.168.1.23:5001/api/contacts')
			.then((res) => {
				if (!res.ok) {
					// Handle HTTP errors
					throw new Error(`HTTP error! Status: ${res.status}`);
				}
				return res.json();
			})
			.then((data) => {
				set_contacts(data);
				set_loading(false);
			})
			.catch((error) => {
				console.error('Fetch error:', error.message);
				// Optionally set an error state here
			});
	}, []);

	const delete_contact = async (id) => {

		let request_options = {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		};

		try {

			const response = await fetch(`http://192.168.1.23:5001/api/contacts/delete_contact/${id}`, request_options);

			console.log(response);

			if (response.status === 204) {
				return; // Do nothing for preflight response
			}

			const response_data = await response.json();

			if (response_data.title === "Success") {
				// toaster for successfull deletion
				props.switch.toaster("success", response_data.message);
				set_is_modal_open (false);

				// delete the contact from the list
				set_contacts(prev_contacts => {
					// live update of contacts after deletion
					const updated_contacts = prev_contacts.filter(contact => contact.id !== id);
					return updated_contacts;
				});

			} else {
				// the error to the toaster
				props.switch.toaster("error", response_data.message);
			}
		} catch (error) {
			console.error("Error:", error);
			props.switch.toaster("error", "Something went wrong!");
		}
	}

	return (
		<>
			<div className='content'>
				<div className="mx-8 mt-4 mb-8 w-full">
					<h4 className='heading'>{t('contactlist')}</h4>
					{/* checking there is any data available in JSON or not */}
					{loading ? (
						<Processing/>
					) : contacts.length > 0 ? (
						<table className="border-collapse border rounded-md border-gray-400 w-full">
							<thead className="border border-gray-400 tableheading rounded-lg">
								<tr>
									<th className="w-1/30">{t("id")}</th>
									<th className="w-1/7">{t("name")}</th>
									<th className="w-1/50">{t("gender")}</th>
									<th className="w-1/10">{t("dob")}</th>
									<th className="w-1/30">{t("country_code")}</th>
									<th className="w-1/10">{t("phone_number")}</th>
									<th className="w-1/7">{t("email")}</th>
									<th className="w-48">{t("address")}</th>
									<th className="w-1">{t("edit")}</th>
								</tr>
							</thead>
							<tbody>
								{contacts.map((item) => (
									<tr key={item.id}>
										<td className="table_border">{item.id || "-"}</td>
										<td className="table_border">{item.full_name || "-"}</td>
										<td className="table_border">{item.gender || "-"}</td>
										<td className="table_border">{item.dob || "-"}</td>
										<td className="table_border">{item.contrycode || "-"}</td>
										<td className="table_border">{item.phone_number || "-"}</td>
										<td className="table_border">{item.email || "-"}</td>
										<td className="table_border">{item.address || "-"}</td>
										<td className="table_border items_content_center">
											<button className="flex gap-1" onClick={() => navigate(`/EditUser/${item.id}`)}>
												<svg xmlns="http://www.w3.org/2000/svg" className="settings" width="25" height="25" viewBox="0 0 24 24">
													<path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.49.49 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5" />
												</svg>
											</button>
											<button className="flex gap-1" onClick={() => confirm_delete(item.id)}>
												<svg xmlns="http://www.w3.org/2000/svg" className="delete" width="28" height="28" viewBox="0 0 24 24">
													<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
												</svg>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<div className="banner_w_radius">
							<div className="banner_content">
								<div className="text-2xl flex justify-center mb-4">{t("no_data_available")}</div>
								<Link to="Adduser">
									<button type="button" className="white_button">{t("add_contact")}</button>
								</Link>
							</div>
						</div>
					)}
				</div>
				{delete_id && (
					<ConfirmationModal
						is_open={is_modal_open} 
						on_close={() => cancel_delete()} 
						on_confirm={() => delete_contact(delete_id)} 
						title="Confirm Deletion" 
						message="Are you sure you want to Delete your Contact? All of your data will be permanently removed."
					/>
				)}
			</div>
		</>
	)
}

export default ContactList