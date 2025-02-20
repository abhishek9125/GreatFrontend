import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StarRating from './components/StarRating';
import FlightBooker from './components/FlightBooker';
import TransferList from './components/TransferList';
import MemoryGame from './components/Memory Game';
import ProgressBar from './components/ProgressBar';
import PreviousCounter from './components/PreviousCounter';
import PollWidget from './components/PollWidget';
import OverlappingCircles from './components/OverlappingCircles';
import FileExplorer from './components/FileExplorer';
import LRUCache from './components/LRUCache';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/star-rating" element={<StarRating />} />
					<Route path="/flight-booker" element={<FlightBooker />} />
					<Route path="/tranfer-list" element={<TransferList />} />
					<Route path="/memory-game" element={<MemoryGame />} />
					<Route path="/progress-bar" element={<ProgressBar />} />
					<Route path="/use-previous" element={<PreviousCounter />} />
					<Route path="/poll-widget" element={<PollWidget />} />
					<Route path="/overlapping-circles" element={<OverlappingCircles />} />
					<Route path="/file-explorer" element={<FileExplorer />} />
					<Route path="/lru-cache" element={<LRUCache />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;