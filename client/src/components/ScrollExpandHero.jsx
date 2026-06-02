import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Add your video files to /public/videos/ folder and update the paths below
const sampleMediaContent = {
  video: {
    // Replace with your own video URL or local path (e.g., '/videos/your-video.mp4')
    src: '/fur-vid.mp4',
    // Poster image shown before video plays (e.g., '/images/video-poster.jpg')
    poster: 'green-fur-back.png',
    // Background image — place file in client/public/green-fur-back.png
    background: 'green-fur-back.png',
    title: 'Luxury Furniture Collections',
    date: 'Premium Experience',
    scrollToExpand: 'Scroll to Expand',
    
  },
  image: {
    src: 'https://i.pinimg.com/1200x/a4/7e/a6/a47ea6bb9ee86949175ebf79d3c8c67a.jpg',
    background:
      'https://i.pinimg.com/1200x/cc/f3/cc/ccf3cca01bf44692f9d16491e6d30c85.jpg',
    title: 'Dynamic Image Showcase',
    date: 'Underwater Adventure',
    scrollToExpand: 'Scroll to Expand Demo',
  },
};

function ScrollExpandMedia({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  description,
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartY(0);
    };

    const handleScroll = () => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div ref={sectionRef} className="transition-colors duration-700 ease-in-out overflow-hidden relative bg-[#100b06]">
      <section className="relative flex flex-col items-center justify-start min-h-[100vh]">
        <div className="relative w-full flex flex-col items-center min-h-[100vh]">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress * 0.65 }}
            transition={{ duration: 0.15 }}
          >
            <img
              src={bgImageSrc}
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#2a1e16]/30 to-black/90" />
          </motion.div>

          <div className="container mx-auto relative z-10 flex flex-col items-center justify-center w-full h-[100vh] px-4">
            <div
              className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] border border-white/10 bg-[#1e1710]/70 shadow-[0_35px_120px_-40px_rgba(0,0,0,0.55)]"
              style={{
                width: `${mediaWidth}px`,
                height: `${mediaHeight}px`,
                maxWidth: '95vw',
                maxHeight: '85vh',
              }}
            >
              {mediaType === 'video' ? (
                <div className="relative w-full h-full pointer-events-none">
                  <video
                    src={mediaSrc}
                    poster={posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover rounded-xl"
                    controls={false}
                    disablePictureInPicture
                    disableRemotePlayback
                  />
                  <div className="absolute inset-0 rounded-xl bg-black/30" />
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={mediaSrc}
                    alt={title || 'Media content'}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/50 rounded-xl"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              )}

              <div className="absolute inset-x-0 bottom-4 flex flex-col items-center text-center z-10 px-4">
                {date && (
                  <p
                    className="text-2xl text-white/80"
                    style={{ transform: `translateX(-${textTranslateX}vw)` }}
                  >
                    {date}
                  </p>
                )}
                {scrollToExpand && (
                  <p
                    className="text-white/80 font-medium text-center"
                    style={{ transform: `translateX(${textTranslateX}vw)` }}
                  >
                    {scrollToExpand}
                  </p>
                )}
              </div>
            </div>

            <div className={`flex flex-col items-center text-center gap-4 w-full relative z-10 transition-none ${textBlend ? 'mix-blend-difference' : 'mix-blend-normal'}`}>
            
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-semibold uppercase tracking-[0.08em] text-white drop-shadow-[0_18px_50px_rgba(0,0,0,0.4)]"
                style={{ transform: `translateX(-${textTranslateX}vw)` }}
              >
                {firstWord}
              </motion.h2>
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-semibold uppercase tracking-[0.08em] text-white text-center drop-shadow-[0_18px_50px_rgba(0,0,0,0.4)]"
                style={{ transform: `translateX(${textTranslateX}vw)` }}
              >
                {restOfTitle}
              </motion.h2>
              {description && (
                <motion.p
                  className="max-w-3xl text-sm md:text-base text-white/75 leading-relaxed px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {description}
                </motion.p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ScrollExpandHero() {
  const mediaType = 'video';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);
    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        description={currentMedia.about?.overview}
      />
    </div>
  );
}
