import React, { useEffect, useState, useRef } from "react";
import { Player } from "./Player";



//create your first component
const Home = () => {
	const [songs, setSongs] = useState([]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSong, setCurrentSong] = useState();
	const [loop, setLoop] = useState(false);
	const [shuffle, setShuffle] = useState(false);
	const audioElem = useRef();

	useEffect(() => {
		getSongs();
	}, []);

	useEffect(() => {
		isPlaying ? audioElem.current.play() : audioElem.current.pause();
	}, [isPlaying]);

	const getSongs = async () => {
		try {
			const resp = await fetch(
				"https://playground.4geeks.com/apis/fake/sound/all"
			);
			const data = await resp.json();
			setSongs(await data);
		} catch (error) {
			console.error("error----> ", error);
		}
	};

	const onPlaying = () => {
		const duration = audioElem.current.duration;
		const current = audioElem.current.currentTime;
		setCurrentSong({
			...currentSong,
			progress: (current / duration) * 100,
			length: duration,
			current: current,
		});
	};

	const getSongIndex = () => {
		const aux = songs.sound.filter((el) => el.id === currentSong.id);
		return songs.sound.indexOf(aux[0]);
	};

	const next = () => {
		shuffle
			? random()
			: songs.sound.length === getSongIndex() + 1
				? setCurrentSong(songs.sound[0])
				: setCurrentSong(songs.sound[getSongIndex() + 1]) &&
				console.log(audioElem);
		setIsPlaying(true);
	};

	const prev = () => {   
		0 === getSongIndex()
			? setCurrentSong(songs.sound[songs.sound.length - 1])
			: setCurrentSong(songs.sound[getSongIndex() - 1]);
		setIsPlaying(true);
	};

	const handleSelectedSong = (i) => {
		setCurrentSong(songs.sound[i]);
		setIsPlaying(true);
	};

	const random = () => {
		setCurrentSong(songs.sound[Math.floor(Math.random() * songs.sound.length)]);
		setIsPlaying(true);
	};

	return (
		<div className="App bg-dark overflow-hidden">
			<div className="d-flex  align-items-center row">
				<div className="container overflow-y-auto playlist mr-3 col-sm-12 col-md-2 col-lg-2">
					<ul className="list-group ">
						{songs &&
							songs.sound?.map((el, i) => (
								<li className={`list-group-item item text-white border border-primary-subtle rounded-0 ${el.name == currentSong?.name ? "active" : ""}`} key={i} onClick={() => handleSelectedSong(i)}>

									{el.name}
								</li>
							))}
					</ul>
				</div>
				<div className="container col-sm-12 col-md-8 col-lg-8">
					<audio
						hidden
						src={
							currentSong &&
							"https://playground.4geeks.com/apis/fake/sound/" + currentSong.url
						}
						ref={audioElem}
						onTimeUpdate={onPlaying}
						onEnded={next}
						loop={loop}
						autoPlay
					/>

					<Player
						songs={songs}
						setSongs={setSongs}
						isPlaying={isPlaying}
						setIsPlaying={setIsPlaying}
						audioElem={audioElem}
						currentSong={currentSong}
						loop={loop}
						setLoop={setLoop}
						next={next}
						prev={prev}
						random={random}
						setShuffle={setShuffle}
						shuffle={shuffle}
					/>
				</div>
			</div>
		</div>
	);
}

export default Home;
