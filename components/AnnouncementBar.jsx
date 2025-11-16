import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function AnnouncementBar({ showCountdown = false }) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 39,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Only check localStorage if NOT showing countdown
    // When showing countdown, always show the bar
    if (!showCountdown) {
      const dismissed = localStorage.getItem('announcementDismissed');
      if (dismissed === 'true') {
        setIsDismissed(true);
      }
    }
  }, [showCountdown]);

  useEffect(() => {
    if (!showCountdown) return;

    // Set launch date to 39 days from now
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 39);
    launchDate.setHours(0, 0, 0, 0);

    const updateCountdown = () => {
      const now = new Date();
      const difference = launchDate - now;

      if (difference > 0) {
        setTimeRemaining({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [showCountdown]);

  const handleDismiss = () => {
    setIsDismissed(true);
    // Only save to localStorage if not showing countdown
    if (!showCountdown) {
      localStorage.setItem('announcementDismissed', 'true');
    }
  };

  if (isDismissed) return null;

  return (
    <div className="sticky top-0 z-50 bg-[#EFE9E2] text-heritage py-3 px-4 border-b border-heritage/15">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        {showCountdown ? (
          <div className="flex items-center justify-center gap-3 text-sm md:text-base">
            <span className="font-medium">🚀 Grand Launch In:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-copper bg-copper/10 px-2 py-0.5 rounded border border-copper/30">
                {String(timeRemaining.days).padStart(2, '0')}d
              </span>
              <span className="font-mono font-bold text-heritage">:</span>
              <span className="font-mono font-bold text-copper bg-copper/10 px-2 py-0.5 rounded border border-copper/30">
                {String(timeRemaining.hours).padStart(2, '0')}h
              </span>
              <span className="font-mono font-bold text-heritage">:</span>
              <span className="font-mono font-bold text-copper bg-copper/10 px-2 py-0.5 rounded border border-copper/30">
                {String(timeRemaining.minutes).padStart(2, '0')}m
              </span>
              <span className="font-mono font-bold text-heritage">:</span>
              <span className="font-mono font-bold text-copper bg-copper/10 px-2 py-0.5 rounded border border-copper/30">
                {String(timeRemaining.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        ) : (
          <p className="text-sm md:text-base text-center font-medium">
            ✨ New Collection: Get <span className="font-semibold text-copper px-2 py-0.5 bg-copper/10 rounded-sm border border-copper/30">15% OFF</span> on Heritage Collection
          </p>
        )}
      </div>
    </div>
  );
}

