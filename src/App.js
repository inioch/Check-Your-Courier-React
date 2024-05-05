import React, { useState } from "react";
import data from "./assets/restrykcje.json"; // zaimportuj dane z pliku JSON

function App() {
	const [postcode, setPostcode] = useState("");
	const [options, setOptions] = useState([]);
	const [error, setError] = useState("");

	const handleForm = (e) => {
		e.preventDefault();

		// Sprawdź, czy wprowadzony kod pocztowy ma właściwy format (5 cyfr)
		const isValidPostcode = /^\d{5}$/.test(postcode);

		if (isValidPostcode) {
			const filteredOptions = data.filter((item) => item.Postcode === postcode);

			if (filteredOptions.length > 0) {
				setOptions(filteredOptions);
				setError(""); // Wyczyść błąd, jeśli kod pocztowy jest poprawny
			} else {
				setOptions([]); // Wyczyść wyniki, jeśli nie znaleziono pasujących wyników
				setError("Brak pasujących wyników dla wprowadzonego kodu pocztowego.");
			}
		} else {
			setOptions([]); // Wyczyść wyniki, jeśli kod pocztowy jest nieprawidłowy
			setError("Wprowadź poprawny kod pocztowy (5 cyfr).");
		}
	};

	return (
		<div className="min-h-screen bg-white">
			<nav className="sticky yellowDHL py-10 w-full">
				<form
					onSubmit={handleForm}
					className="flex flex-col md:flex-row justify-evenly md:items-center w-full gap-2 items-stretch text-center">
					<h1 className="font-bold uppercase">kod pocztowy / kod kierunkowy</h1>
					<input
						className="text-black p-2 font-bold text-center"
						type="text" // Zmiana typu wejściowego na tekst
						value={postcode}
						onChange={(e) => setPostcode(e.target.value)}
					/>
					<button className="redDHL text-white font-bold hover:bg-red-700 rounded-md py-2 px-4">
						Sprawdź
					</button>
				</form>
			</nav>

			{error && <div className="text-red-500 text-center mt-4">{error}</div>}

			<div className="flex justify-center items-center mt-4">
				<ul className="flex flex-wrap gap-2">
					{options.map((option, index) => (
						<li
							key={index}
							className={`border p-4 ${
								option.Trasa === "KRX1" ? "redDHL" : "yellowDHL text-black"
							} text-center rounded-lg font-bold flex-grow`}>
							<p>{option.City}</p>
							<p> {option.Trasa}</p>
							<p>OF: {option.OF}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
