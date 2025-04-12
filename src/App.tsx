import { useState, useEffect } from "react";

// Define the Emoji interface
interface Emoji {
  id: number;
  symbol: string;
  left: number;
  top: number;
}

function App() {
   const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
   });
   const [emojis, setEmojis] = useState<Emoji[]>([]);

   // Function to handle click on "seni seviyorum" text
   const handleLoveClick = () => {
      // Array of love-related emojis
      const loveEmojis = ['❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️', '❤️',];

      // Generate 5-10 random emojis
      const emojiCount = Math.floor(Math.random() * 6) + 5;
      const newEmojis: Emoji[] = [];

      for (let i = 0; i < emojiCount; i++) {
         // Generate random position around the text
         const left = 45 + Math.random() * 10; // 45-55% from left
         const top = 80 + Math.random() * 5; // 80-85% from top

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
      const music = new Audio("/music.wav");

      window.addEventListener("click", () => {
         music.play();
      });
   }, []);

   useEffect(() => {
      const targetDate = new Date("2025-04-19T06:00:00");

      const calculateTimeLeft = () => {
         const now = new Date();
         const difference = targetDate.getTime() - now.getTime();

         if (difference > 0) {
            setTimeLeft({
               days: Math.floor(difference / (1000 * 60 * 60 * 24)),
               hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
               minutes: Math.floor((difference / (1000 * 60)) % 60),
               seconds: Math.floor((difference / 1000) % 60),
            });
         } else {
            setTimeLeft({
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

   // Define the keyframes and animation style
   const emojiAnimationStyle = `
      @keyframes floatUp {
         0% {
            transform: translateY(0) scale(1);
            opacity: 1;
         }
         100% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0;
         }
      }
      .emoji-animation {
         animation: floatUp 3s ease-out forwards;
      }
   `;

   return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white p-8 fixed top-0 left-0 w-screen h-screen overflow-hidden select-none">
         <style>{emojiAnimationStyle}</style>
         <div className="grid grid-cols-3 items-center gap-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 min-w-[200px] transition-transform duration-300 col-span-3 flex items-center justify-center flex-col gap-2">
               <span
                  className="text-5xl md:text-6xl font-bold block text-white "
                  translate="no"
               >
                  {timeLeft.days}
               </span>
               <span
                  className="text-xl text-gray-300 uppercase tracking-wider mt-2 block"
                  translate="no"
               >
                  Gün
               </span>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 transition-transform duration-300 flex items-center justify-center flex-col gap-2">
               <span
                  className="text-4xl md:text-5xl font-bold block text-white"
                  translate="no"
               >
                  {timeLeft.hours}
               </span>
               <span
                  className="text-lg text-gray-300 uppercase tracking-wider mt-2 block"
                  translate="no"
               >
                  Saat
               </span>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 transition-transform duration-300 flex items-center justify-center flex-col gap-2">
               <span
                  className="text-4xl md:text-5xl font-bold block text-white"
                  translate="no"
               >
                  {timeLeft.minutes}
               </span>
               <span
                  className="text-lg text-gray-300 uppercase tracking-wider mt-2 block"
                  translate="no"
               >
                  Dakika
               </span>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 transition-transform duration-300 flex items-center justify-center flex-col gap-2">
               <span className="text-4xl md:text-5xl font-bold block text-white">
                  {timeLeft.seconds}
               </span>
               <span
                  className="text-lg text-gray-300 uppercase tracking-wider mt-2 block"
                  translate="no"
               >
                  Saniye
               </span>
            </div>

            <div
               className="fixed bottom-5 left-1/2 -translate-x-1/2 text-gray-300 cursor-pointer"
               translate="no"
               onClick={handleLoveClick}
            >
               seni seviyorum
            </div>
            {emojis.map((emoji) => (
               <div
                  key={emoji.id}
                  className="fixed pointer-events-none emoji-animation"
                  style={{
                     left: `${emoji.left}%`,
                     top: `${emoji.top}%`,
                     fontSize: '24px',
                  }}
               >
                  {emoji.symbol}
               </div>
            ))}
         </div>
      </div>
   );
}

export default App;
