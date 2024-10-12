import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StarRating from './components/StarRating';

function App() {
	

	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/star-rating" element={<StarRating />}  />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;