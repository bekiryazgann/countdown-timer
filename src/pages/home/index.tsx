import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useMusicStore} from "../../store/music.ts";
import PageAnimation from "../../components/page-animation";
import {motion, AnimatePresence} from "framer-motion";

// Define the Emoji interface
interface Emoji {
    id: number;
    symbol: string;
    left: number;
    top: number;
}

export default function HomePage() {
    const isPlaying: boolean = useMusicStore(state => state.isPlaying)
    const setIsPlaying = useMusicStore(state => state.setIsPlaying)

    const music = new Audio("/music.wav");
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [marryTimeLeft, setMarryTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [emojis, setEmojis] = useState<Emoji[]>([]);

    // Function to generate and display emojis
    const generateEmojis = () => {
        // Array of love-related emojis
        const loveEmojis = ['❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️',];

        // Generate 5-10 random emojis
        const emojiCount = Math.floor(Math.random() * 6) + 40;
        const newEmojis: Emoji[] = [];

        for (let i = 0; i < emojiCount; i++) {
            // Generate random position around the text
            const left = 45 + Math.random() * 10; // 45-55% from left
            const top = 90 + Math.random() * 5; // 80-85% from top

            newEmojis.push({
                id: Date.now() + i,
                symbol: loveEmojis[Math.floor(Math.random() * loveEmojis.length)],
                left,
                top
            });
        }

        // Add new emojis to the state
        setEmojis(prev => [...prev, ...newEmojis]);

        // Remove emojis after animation completes
        setTimeout(() => {
            setEmojis(prev => prev.filter(emoji => !newEmojis.some(newEmoji => newEmoji.id === emoji.id)));
        }, 3000);
    };

    useEffect(() => {
        window.addEventListener('click', async () => {
            if (!isPlaying) {
                setIsPlaying(true);
                await music.play();
                generateEmojis();
            }
        })
    }, []);

    // Effect to continuously generate emojis while music is playing
    useEffect(() => {
        let emojiInterval: number | null = null;

        if (isPlaying) {
            // Generate emojis every 2 seconds while music is playing
            emojiInterval = window.setInterval(() => {
                generateEmojis();
            }, 2000);
        }

        // Clean up interval when music stops or component unmounts
        return () => {
            if (emojiInterval !== null) {
                clearInterval(emojiInterval);
            }
        };
    }, [isPlaying]);

    useEffect(() => {
        const targetDate = new Date("2025-05-03T12:20:00");
        const marryDate = new Date("2031-04-19T00:00:00");

        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();
            const marryDifference = marryDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / (1000 * 60)) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
                setMarryTimeLeft({
                    days: Math.floor(marryDifference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((marryDifference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((marryDifference / (1000 * 60)) % 60),
                    seconds: Math.floor((marryDifference / 1000) % 60),
                });
            } else {
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                });
                setMarryTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <PageAnimation>
            <div
                className="min-h-screen flex flex-col justify-center items-center bg-black text-white p-8 fixed top-0 left-0 w-screen h-screen overflow-hidden select-none">
                <div className="grid grid-cols-3 items-center gap-2">
                    <motion.div 
                        className="col-span-3 flex justify-center items-center mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.span
                            className="text-7xl"
                            initial={{ scale: 1 }}
                            animate={{ 
                                scale: [1, 1.3, 1, 1.3, 1, 1, 1, 1, 1],
                            }}
                            transition={{ 
                                duration: 1.8,
                                repeat: Infinity, 
                                repeatType: "loop",
                                ease: "easeInOut"
                            }}
                            style={{ filter: "drop-shadow(0 0 8px rgba(255,0,0,0.5))" }}
                        >
                            ❤️
                        </motion.span>
                    </motion.div>
                    <motion.div 
                        className="bg-white/10 backdrop-blur-lg rounded-xl p-8 min-w-[200px] col-span-3 flex items-center justify-center flex-col gap-2"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.span 
                                key={timeLeft.days}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                                className="text-5xl md:text-6xl font-bold block text-white" 
                                translate="no"
                            >
                                {timeLeft.days}
                            </motion.span>
                        </AnimatePresence>
                        <motion.span 
                            className="text-xl text-gray-300 uppercase tracking-wider mt-2 block" 
                            translate="no"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            Gün
                        </motion.span>
                    </motion.div>
                    <motion.div 
                        className="bg-white/10 backdrop-blur-lg rounded-xl p-8 flex items-center justify-center flex-col gap-2"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.span 
                                key={timeLeft.hours}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                                className="text-4xl md:text-5xl font-bold block text-white" 
                                translate="no"
                            >
                                {timeLeft.hours}
                            </motion.span>
                        </AnimatePresence>
                        <motion.span 
                            className="text-lg text-gray-300 uppercase tracking-wider mt-2 block" 
                            translate="no"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                        >
                            Saat
                        </motion.span>
                    </motion.div>
                    <motion.div 
                        className="bg-white/10 backdrop-blur-lg rounded-xl p-8 flex items-center justify-center flex-col gap-2"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.span 
                                key={timeLeft.minutes}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                                className="text-4xl md:text-5xl font-bold block text-white" 
                                translate="no"
                            >
                                {timeLeft.minutes}
                            </motion.span>
                        </AnimatePresence>
                        <motion.span 
                            className="text-lg text-gray-300 uppercase tracking-wider mt-2 block" 
                            translate="no"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                        >
                            Dakika
                        </motion.span>
                    </motion.div>
                    <motion.div 
                        className="bg-white/10 backdrop-blur-lg rounded-xl p-8 flex items-center justify-center flex-col gap-2"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.span 
                                key={timeLeft.seconds}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                                className="text-4xl md:text-5xl font-bold block text-white"
                            >
                                {timeLeft.seconds}
                            </motion.span>
                        </AnimatePresence>
                        <motion.span 
                            className="text-lg text-gray-300 uppercase tracking-wider mt-2 block" 
                            translate="no"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                        >
                            Saniye
                        </motion.span>
                    </motion.div>
                    <motion.div 
                        className="flex items-center col-span-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <motion.p 
                            className="text-center w-full"
                            whileHover={{ scale: 1.05, color: "#f8fafc" }}
                            transition={{ duration: 0.2 }}
                        > 
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={`${marryTimeLeft.days}-${marryTimeLeft.hours}-${marryTimeLeft.minutes}-${marryTimeLeft.seconds}`}
                                    initial={{ opacity: 0.5, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0.5, y: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <b className="text-white">
                                        {marryTimeLeft.days}
                                    </b> Gün,{" "}
                                    <b className="text-white">
                                        {marryTimeLeft.hours}
                                    </b> Saat,{" "}
                                    <b className="text-white">
                                        {marryTimeLeft.minutes}
                                    </b> Dakika,{" "}
                                    <b className="text-white">
                                        {marryTimeLeft.seconds}
                                    </b> Saniye
                                </motion.span>
                            </AnimatePresence>
                        </motion.p>
                    </motion.div>

                    <div>
                        <motion.div>
                            <Link to="contents"
                                className="fixed bottom-5 left-1/2 -translate-x-1/2 text-gray-300 cursor-pointer"
                                translate="no"
                            >
                                <motion.span
                                    animate={{ 
                                        scale: [
                                            // . (dot)
                                            1, 1.5, 0,
                                            // . (dot)
                                            1, 1.5, 0,
                                            // - (dash - represented as waiting)
                                            1, 1, 1,
                                            // . (dot)
                                            1, 1.5, 0,
                                            // . (dot)
                                            1, 1.5, 0,
                                            // - (dash - represented as waiting)
                                            1, 1, 1,
                                            // . (dot)
                                            1, 1.5, 0,
                                            // . (dot)
                                            1, 1.5, 0,
                                            // - (dash - represented as waiting)
                                            1, 1, 1,
                                            // . (dot)
                                            1, 1.5, 0,
                                            // . (dot)
                                            1, 1.5, 0,
                                            // - (dash - represented as waiting)
                                            1, 1, 1,
                                            // . (dot)
                                            1, 1.5, 0,
                                            // . (dot)
                                            1, 1.5, 0,
                                            // - (dash - represented as waiting)
                                            1, 1, 1
                                        ]
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        ease: "linear",
                                        times: [
                                            // Timing for each step in the animation sequence
                                            // Each dot: scale up (0.02), scale down (0.02), pause (0.02)
                                            // Each dash: three pauses (0.06)
                                            0, 0.02, 0.04, 0.06, 0.08, 0.10, 0.12, 0.14, 0.16, 
                                            0.18, 0.20, 0.22, 0.24, 0.26, 0.28, 0.30, 0.32, 0.34,
                                            0.36, 0.38, 0.40, 0.42, 0.44, 0.46, 0.48, 0.50, 0.52,
                                            0.54, 0.56, 0.58, 0.60, 0.62, 0.64, 0.66, 0.68, 0.70,
                                            0.72, 0.74, 0.76, 0.78, 0.80, 0.82, 0.84, 0.86, 0.88
                                        ]
                                    }}
                                >
                                    seni seviyorum
                                </motion.span>
                            </Link>
                        </motion.div>
                    </div>
                    {emojis.map((emoji) => (
                        <motion.div
                            key={emoji.id}
                            className="fixed pointer-events-none"
                            style={{
                                left: `${emoji.left}%`,
                                top: `${emoji.top}%`,
                                fontSize: '24px',
                            }}
                            initial={{ opacity: 1, y: 0, scale: 1 }}
                            animate={{ 
                                opacity: 0, 
                                y: -100, 
                                scale: [1, 1.5, 2],
                                rotate: Math.random() > 0.5 ? [0, 15, -15, 0] : [0, -15, 15, 0]
                            }}
                            transition={{ 
                                duration: 3,
                                ease: "easeOut",
                                times: [0, 0.3, 0.7, 1],
                                rotate: {
                                    duration: 2,
                                    repeat: 1
                                }
                            }}
                        >
                            {emoji.symbol}
                        </motion.div>
                    ))}
                </div>
            </div>
        </PageAnimation>
    );
}
