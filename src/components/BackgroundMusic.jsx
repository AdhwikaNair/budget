import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const BackgroundMusic = forwardRef(({ isMuted }, ref) => {
    const audioRef = useRef(null);

    useImperativeHandle(ref, () => ({
        play: () => {
            if (audioRef.current) {
                console.log("Attempting to play background music...");
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.error("Playback failed:", error);
                    });
                }
            }
        },
        pause: () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        }
    }));

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
            audioRef.current.volume = 0.4; // Set a default comfortable volume
        }
    }, [isMuted]);

    return (
        <audio
            ref={audioRef}
            src="/bgmusic2.mp3"
            loop
            preload="auto"
        />
    );
});

export default BackgroundMusic;
