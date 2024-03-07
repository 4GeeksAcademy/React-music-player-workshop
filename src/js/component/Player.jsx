import React, { useRef } from "react";
export const Player = ({
    audioElem,
    isPlaying,
    setIsPlaying,
    currentSong,
    setLoop,
    loop,
    next,
    prev,
    random,
    shuffle,
    setShuffle,
}) => {
    const timeStamp = useRef();
    const playPause = () => {
        if (!isPlaying && !currentSong) {
            random();
        } else {
            setIsPlaying(!isPlaying);
        }
    };
    const setTime = (e) => {
        let width = timeStamp.current.clientWidth;
        const offset = e.nativeEvent.offsetX;
        const progress = (offset / width) * 100;
        audioElem.current.currentTime = (progress / 100) * currentSong.length;
    };
    return (
        <div className="container mr-3 rounded border p-2 w-75">
            <div className="card player-wrapper border bg-dark text-white border-primary-subtle">
                <div className="d-flex justify-content-center">
                    <h2 className="my-5">
                        {currentSong && currentSong.name ? currentSong.name : ""}
                    </h2>
                </div>
                <div className="card-body ">
                    <div className="navigation" onClick={setTime} ref={timeStamp}>
                        {currentSong ? (
                            <div
                                className="seekBar"
                                style={{ width: `${currentSong.progress}%` }}
                            ></div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <div className="border mx-1 rounded-5 h-50 px-3 my-5">
                    <span
                        onClick={() => setShuffle(!shuffle)}
                        className={
                            shuffle ? "fa-solid fa-shuffle text-primary" : "fa-solid fa-shuffle text-white"
                        }
                    ></span>
                </div>
                <div className="border mx-1 rounded-5 h-50">
                    <span
                        onClick={prev}
                        className="fa-solid fa-backward text-white mx-3"
                    ></span>
                </div>
                <div className="play border mx-1 rounded-5 p-2 text-white">
                    <span
                        onClick={playPause}
                        className={`mx-3  ${isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play "
                            }`}
                    ></span>
                </div>
                <div className="border mx-1 rounded-5 h-50">
                    <span
                        onClick={next}
                        className="text-white mx-3 fa-solid fa-forward"
                    ></span>
                </div>
                <div className="border mx-1 rounded-5 h-50">
                    {console.log(`mx-3 ${loop ? "fa-solid fa-rotate-left text-success" : "fa-solid fa-rotate-left text-white"
                        }`)}
                    <span
                        onClick={() => setLoop(!loop)}
                        className={` mx-3 ${loop ? "fa-solid fa-rotate-left text-primary" : "fa-solid fa-rotate-left text-white"
                            }`}
                    ></span>
                </div>


            </div>
        </div>
    );
};
