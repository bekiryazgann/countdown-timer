import { useState, useEffect } from 'react'

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date('2025-03-28T11:07:00')

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white p-8 fixed top-0 left-0 w-screen h-screen overflow-hidden">
      <div className="grid grid-cols-3 items-center gap-2">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 min-w-[200px] transition-transform duration-300 col-span-3 flex items-center justify-center flex-col gap-2">
            <span className="text-5xl md:text-6xl font-bold block text-white " translate='no'>
              {timeLeft.days}
            </span>
            <span className="text-xl text-gray-300 uppercase tracking-wider mt-2 block" translate='no'>
              Gün
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 transition-transform duration-300 flex items-center justify-center flex-col gap-2">
            <span className="text-4xl md:text-5xl font-bold block text-white" translate='no'>
              {timeLeft.hours}
            </span>
            <span className="text-lg text-gray-300 uppercase tracking-wider mt-2 block" translate='no'>
              Saat
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 transition-transform duration-300 flex items-center justify-center flex-col gap-2">
            <span className="text-4xl md:text-5xl font-bold block text-white" translate='no'>
              {timeLeft.minutes}
            </span>
            <span className="text-lg text-gray-300 uppercase tracking-wider mt-2 block" translate='no'>
              Dakika
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 transition-transform duration-300 flex items-center justify-center flex-col gap-2">
            <span className="text-4xl md:text-5xl font-bold block text-white">
              {timeLeft.seconds}
            </span>
            <span className="text-lg text-gray-300 uppercase tracking-wider mt-2 block" translate='no'>
              Saniye
            </span>
          </div>

        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 text-gray-300" translate='no'>seni seviyorum</div>
      </div>
    </div>
  )
}

export default App
