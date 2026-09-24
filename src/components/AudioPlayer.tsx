"use client";

import React, { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
    audioUrl: string;
    title: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, title }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        console.log('Audio URL:', audioUrl); // Debug log

        const handleLoadedMetadata = () => {
            console.log('Audio metadata loaded:', audio.duration);
            setDuration(audio.duration);
            setError(null);
        };

        const handleError = (e: Event) => {
            const audioElement = e.target as HTMLAudioElement;
            console.error('Audio error:', {
                error: audioElement.error,
                networkState: audioElement.networkState,
                readyState: audioElement.readyState,
                src: audioElement.src
            });
            setError('Wystąpił błąd podczas ładowania pliku audio');
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        };

        const handleCanPlay = () => {
            console.log('Audio can play');
            setError(null);
        };

        const handleLoadStart = () => {
            console.log('Audio load started');
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('error', handleError);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('canplay', handleCanPlay);
        audio.addEventListener('loadstart', handleLoadStart);

        // Set the audio source
        audio.src = audioUrl;
        audio.load();

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('error', handleError);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('canplay', handleCanPlay);
            audio.removeEventListener('loadstart', handleLoadStart);
        };
    }, [audioUrl]);

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(err => {
                    console.error('Error playing audio:', err);
                    setError('Wystąpił błąd podczas odtwarzania');
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(e.target.value);
        setCurrentTime(time);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="ct-panel" style={{ padding: 20, marginBottom: 32, background: 'var(--panel)' }}>
            <span className="ct-eyebrow">Audio</span>
            <h3 style={{ margin: '6px 0 16px', fontSize: 16, fontWeight: 600 }}>Odsłuchaj wpis w formie dialogu</h3>
            {error && (
                <div className="ct-meta" style={{ color: '#dc2626', textTransform: 'none', marginBottom: 12 }}>{error}</div>
            )}
            <div className="flex items-center gap-4">
                <button
                    onClick={togglePlayPause}
                    className="flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ width: 44, height: 44, flex: 'none', borderRadius: 'var(--radius-pill)', background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer' }}
                    aria-label={isPlaying ? 'Pauza' : 'Odtwórz'}
                    disabled={!!error}
                >
                    {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                </button>
                <div className="flex-1">
                    <input
                        type="range"
                        min={0}
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSliderChange}
                        className="w-full cursor-pointer"
                        style={{ accentColor: 'var(--accent)' }}
                        disabled={!!error}
                    />
                    <div className="ct-meta flex justify-between" style={{ marginTop: 4, color: 'var(--muted-2)' }}>
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
            </div>
            <audio ref={audioRef} preload="metadata" />
        </div>
    );
};

export default AudioPlayer; 