import {createContext, useContext, useEffect, useState} from "react";

const sfxCache: { [key: string]: HTMLAudioElement } = {};
const SettingsContext = createContext({
    soundEnabled: true,
    // setSoundEnabled:undefined,
});
export const SettingsProvider = ({children}: any) => {
    const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
    // @ts-ignore
    return (<SettingsContext.Provider value={{soundEnabled, setSoundEnabled,}}>
        {children}
    </SettingsContext.Provider>)
}
export const useSettings = () => {
    const {
        soundEnabled,
        setSoundEnabled,
    } = useContext<{ soundEnabled: boolean, setSoundEnabled?: any }>(SettingsContext);
    const toggleSound = () => {
        const newSetting: boolean = !soundEnabled;
        setSoundEnabled(newSetting);
    };
    return {
        soundEnabled,
        toggleSound,
    }

}

function useSound(url: string, {soundEnabled}: { soundEnabled: boolean, volume: number, interrupt?: boolean }) {
    try {
        sfxCache[url] = new Audio(url);
        return [() => sfxCache[url].play()];
    } catch (e) {
        return [() => {
        }];
    }
}

export function useSfx() {
    const {soundEnabled} = useSettings();

    const [playBoop] = useSound(
        'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1593395252/jason.af/sfx/boop.mp3',
        {
            soundEnabled,
            volume: 0.5,
        },
    );

    const [playPop] = useSound(
        'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1593395252/jason.af/sfx/pop.mp3',
        {
            soundEnabled,
            volume: 0.5,
        },
    );

    const [playClick] = useSound(
        '/click.mp3',
        {
            soundEnabled,
            volume: 0.5,
        },
    );

    const [playAirhorn] = useSound(
        'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1593395252/jason.af/sfx/airhorn.mp3',
        {
            soundEnabled,
            volume: 0.5,
            interrupt: true,
        },
    );

    const [playPowerUp] = useSound(
        'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1593395252/jason.af/sfx/power-up.mp3',
        {
            soundEnabled,
            volume: 0.5,
        },
    );

    const [playPowerDown] = useSound(
        'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1593395253/jason.af/sfx/power-down.mp3',
        {
            soundEnabled,
            volume: 0.5,
        },
    );

    const [playHooray] = useSound(
        'https://res.cloudinary.com/jlengstorf/video/upload/q_auto/v1593395252/jason.af/sfx/hooray.mp3',
        {
            soundEnabled,
            volume: 0.5,
        },
    );

    return {
        playAirhorn,
        playBoop,
        playClick,
        playHooray,
        playPop,
        playPowerUp,
        playPowerDown,
    };
}
