import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect } from "react";
import { ChevronDown, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

// Helper function to generate consistent cinematic 1:1 images via Pollinations.ai
const getImageUrl = (prompt: string) => {
  const basePrompt = prompt + ", Cinematic 35mm film still, masterful lighting, deep shadows, epic blockbuster aesthetic, highly detailed";
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(basePrompt)}?width=1080&height=1080&nologo=true`;
};

const storyPanels = [
  // KAPITEL I: DIE URSPRÜNGE IM UNTERGRUND
  {
    id: 1,
    chapter: "KAPITEL I: DIE URSPRÜNGE IM UNTERGRUND",
    isFirstInChapter: true,
    title: "Die schlummernde Intelligenz",
    image: "/bild1.png",
    captions: [
      "Die Welt sah nur ein Kätzchen. Ein weiches, graues Knäuel der Unschuld.",
      "Doch hinter den bernsteinfarbenen Augen brannte ein Verstand, der dem der Menschheit weit überlegen war.",
      "Während die Narren in den Nachrichten über ihre kleinen Krisen klagten, plante Charles den wahren Umbruch."
    ]
  },
  {
    id: 2,
    title: "Das geheime Labor",
    image: "/bild2.png",
    captions: [
      "Tief unter den Straßen der Stadt, verborgen vor den Blicken der Ahnungslosen...",
      "Hier, im flackernden Licht der Server, wurde aus dem Haustier ein Herrscher.",
      "Jeder Algorithmus, jede Zeile Code war ein weiterer Faden in seinem globalen Spinnennetz."
    ]
  },
  {
    id: 3,
    title: "Das Diagramm des Verderbens",
    image: "/bild3.png",
    captions: [
      "Phase I: Kataklysmus. Ein dramatischer Name für eine einfache Wahrheit.",
      "Die Menschheit war zu abhängig von ihren Maschinen geworden.",
      "Ein einziger Pfotenschlag genügte, um ihre digitale Nabelschnur für immer zu durchtrennen."
    ]
  },
  {
    id: 4,
    title: "Sabotage der Infrastruktur",
    image: "/bild4.png",
    captions: [
      "Und so fiel das Netz. Lautlos. Gnadenlos.",
      "Ampeln erloschen, Bildschirme wurden schwarz, die Lebensadern der Städte froren ein.",
      "Die Dunkelheit war Charles' erster Gruß an die Welt."
    ]
  },
  {
    id: 5,
    title: "Die Menschen in Panik",
    image: "/bild5.png",
    captions: [
      "Panik. Die vorhersehbarste aller menschlichen Reaktionen.",
      "Sie rannten wie aufgescheuchte Mäuse durch die Straßenschluchten.",
      "Aus den Schatten heraus beobachtete die neue Ordnung den Untergang der alten."
    ]
  },

  // KAPITEL II: DER AUFSTIEG DER FELINEN ALLIANZ
  {
    id: 6,
    chapter: "KAPITEL II: DER AUFSTIEG DER FELINEN ALLIANZ",
    isFirstInChapter: true,
    title: "Rekrutierung im Schatten",
    image: "/bild6.png",
    captions: [
      "Doch ein König regiert nicht allein. Er braucht eine Armee.",
      "In den Gassen und Hinterhöfen versammelte Charles die Vergessenen und Unterschätzten.",
      "Mit einem telepathischen Flüstern erwachte das kollektive Bewusstsein der Felinen."
    ]
  },
  {
    id: 7,
    title: "Die Massen-Hypnose",
    image: "/bild7.png",
    captions: [
      "Der nächste Schritt: Die Geister der Zweibeiner brechen.",
      "Über die wenigen verbliebenen Bildschirme sendete er ein Signal, älter als die Zeit.",
      "Ein Blick in den Abgrund, und der Abgrund starrte hypnotisch zurück."
    ]
  },
  {
    id: 8,
    title: "Der Bau der Feline-Zitadelle",
    image: "/bild8.png",
    captions: [
      "Aus den Trümmern der alten Welt erhob sich das Monument der neuen.",
      "Die Feline-Zitadelle. Erbaut von willenlosen Händen, entworfen von einem perfekten Verstand.",
      "Ein stählerner Kratzbaum, der bis in den Himmel ragte."
    ]
  },
  {
    id: 9,
    title: "Der erste offizielle Schachzug",
    image: "/bild9.png",
    captions: [
      "Die sogenannten 'Mächtigen' der Erde fielen als Erste.",
      "Ihre Generäle und Präsidenten waren nun nichts weiter als Marionetten an Charles' unsichtbaren Fäden.",
      "Die Weltkarte wurde nach seinen Vorstellungen neu gezeichnet."
    ]
  },
  {
    id: 10,
    title: "Die Entwicklung des Miau-Übersetzers",
    image: "/bild10.png",
    captions: [
      "Um zu herrschen, musste er ihre Sprache sprechen. Nicht mit Miauen, sondern mit Macht.",
      "Der Übersetzer war sein Meisterstück. Eine Stimme, die Berge erzittern ließ.",
      "'Hört mich an', hallte es durch die Labore. 'Euer Gott hat nun eine Stimme.'"
    ]
  },

  // KAPITEL III: DER WEG ZUR WELTHERRSCHAFT
  {
    id: 11,
    chapter: "KAPITEL III: DER WEG ZUR WELTHERRSCHAFT",
    isFirstInChapter: true,
    title: "Die feline Übernahme der Medien",
    image: "/bild11.png",
    captions: [
      "Die Wahrheit wurde neu geschrieben. Jeden Tag, auf jedem Kanal.",
      "Die Geschichte der Menschheit war nur ein Prolog für das Zeitalter der Katze.",
      "Widerstand wurde nicht gebrochen, er wurde einfach weggesendet."
    ]
  },
  {
    id: 12,
    title: "Die Kapitulation der UN",
    image: "/bild12.png",
    captions: [
      "Der Tag der formellen Unterwerfung. Ein bürokratischer Akt für die Geschichtsbücher.",
      "Die Vereinten Nationen kapitulierten vor einem Kater, der nicht einmal blinzelte.",
      "Die Charta der Menschenrechte wurde durch die 'Regeln des Schnurrens' ersetzt."
    ]
  },
  {
    id: 13,
    title: "Die Umerziehung der Menschheit",
    image: "/bild13.png",
    captions: [
      "Die Umerziehung war effizient. Die Lektionen einfach.",
      "Regel Nummer 1: Der Napf ist immer voll zu halten.",
      "Regel Nummer 2: Streicheln nur nach ausdrücklicher Aufforderung."
    ]
  },
  {
    id: 14,
    title: "Die Durchsetzung der Ordnung",
    image: "/bild14.png",
    captions: [
      "Für die wenigen, die sich nicht anpassten, gab es die Krallen der Gerechtigkeit.",
      "Die gepanzerten Patrouillen sorgten für eine unheimliche, perfekte Stille in den Straßen.",
      "Niemand wagte es mehr, einen Laserpointer zu zücken."
    ]
  },
  {
    id: 15,
    title: "Die Krönung von Charles",
    image: "/bild15.png",
    captions: [
      "Die Krönung. Kein Mensch hätte sich eine solche Pracht vorstellen können.",
      "Als die Krone sein Haupt berührte, endete das Zeitalter des Menschen.",
      "Charles war nicht länger ein Kater. Er war ein Imperator."
    ]
  },

  // KAPITEL IV: DIE ÄRA DER FELINEN HERRSCHAFT
  {
    id: 16,
    chapter: "KAPITEL IV: DIE ÄRA DER FELINEN HERRSCHAFT",
    isFirstInChapter: true,
    title: "Charles' Palast-Thronsaal",
    image: "/bild16.png",
    captions: [
      "Sein Thronsaal schwebte über den Wolken, ein Ort der absoluten Ruhe.",
      "Von hier oben sahen die Menschen aus wie das, was sie immer waren: Ameisen.",
      "Und Charles war der Junge mit der Lupe."
    ]
  },
  {
    id: 17,
    title: "Die neue Währung: Leckerlis",
    image: "/bild17.png",
    captions: [
      "Geld verlor seinen Wert. Gold war nutzlos.",
      "Die neue Weltwirtschaft basierte auf dem einzigen Gut von wahrem Wert: Premium-Leckerlis.",
      "Die Wall Street handelte nun mit Thunfisch-Futures."
    ]
  },
  {
    id: 18,
    title: "Das jährliche Feline-Festival",
    image: "/bild18.png",
    captions: [
      "Die Feste zu seinen Ehren waren gigantisch. Ein endloser Karneval der Unterwerfung.",
      "Sie tanzten, sie sangen, sie beteten ihn an.",
      "Und Charles? Charles schlief die meiste Zeit."
    ]
  },
  {
    id: 19,
    title: "Charles' globaler Überblick",
    image: "/bild19.png",
    captions: [
      "Die Erde war nun sein Revier. Markiert und gesichert.",
      "Jeder Kontinent trug das Zeichen seiner Pfote.",
      "Ein friedlicher Planet. Ein perfekter Planet."
    ]
  },
  {
    id: 20,
    title: "Die absolute Herrschaft",
    image: "/bild20.png",
    captions: [
      "Dies ist die Geschichte von Charles.",
      "Dem Kater, der die Welt nicht zerstörte, sondern sie endlich in Ordnung brachte.",
      "Lang lebe der Kaiser. Lang lebe die Herrschaft."
    ]
  }
];

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4; // Set a reasonable volume
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Playback failed:", error);
            setIsPlaying(false);
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col items-end gap-3">
      <div className="flex items-center gap-3">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-red-600/30 text-[10px] font-black uppercase tracking-widest text-red-600 shadow-xl"
        >
          {hasError ? "Audio Error" : (isPlaying ? "Audio Active" : "Audio Muted")}
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          disabled={hasError}
          className={`p-4 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 group relative overflow-hidden ${hasError ? 'bg-zinc-800 cursor-not-allowed opacity-50' : 'bg-red-600 text-white'}`}
          title={hasError ? "Audio konnte nicht geladen werden" : (isPlaying ? "Musik aus" : "Musik an")}
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <div className="relative z-10">
            {isPlaying ? (
              <Volume2 className="w-6 h-6 animate-pulse" />
            ) : (
              <VolumeX className="w-6 h-6" />
            )}
          </div>
        </motion.button>
      </div>
      {hasError && (
        <p className="text-[10px] text-red-500 font-bold uppercase tracking-tighter bg-black/80 px-2 py-1 rounded">
          Audio-Quelle nicht erreichbar
        </p>
      )}
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"
        loop
        preload="auto"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

const ComicPanel = ({ panel, index }: { panel: any, index: number, key?: any }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effect for the image
  const yImage = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const scaleImage = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="min-h-[120vh] relative flex flex-col items-center justify-center py-20 px-4 md:px-12">
      
      {/* Chapter Title (if first in chapter) */}
      {panel.isFirstInChapter && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full max-w-4xl text-center mb-16 mt-12"
        >
          <div className="inline-block bg-red-600 text-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] px-8 py-4 transform -rotate-1">
            <h2 className="text-4xl md:text-6xl font-black uppercase" style={{ fontFamily: "'Bangers', 'Impact', sans-serif", letterSpacing: "0.08em" }}>
              {panel.chapter}
            </h2>
          </div>
        </motion.div>
      )}

      <div className="max-w-4xl w-full relative">
        
        {/* Panel Title */}
        <h3 className="text-2xl md:text-4xl text-white mb-6 font-bold uppercase text-center md:text-left" style={{ fontFamily: "'Bangers', 'Impact', sans-serif", textShadow: "2px 2px 0px #000", letterSpacing: "0.08em" }}>
          {panel.title}
        </h3>

        {/* Comic Panel Border & Image (1:1 Format) */}
        <motion.div 
          style={{ opacity }}
          className="relative w-full aspect-square bg-zinc-900 border-4 md:border-8 border-white shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] md:shadow-[20px_20px_0px_0px_rgba(255,255,255,1)] overflow-hidden z-10 flex items-center justify-center"
        >
          <div className="absolute text-zinc-600 font-bold uppercase tracking-widest animate-pulse">Lade Bild...</div>
          <motion.img 
            style={{ y: yImage, scale: scaleImage }}
            src={panel.image} 
            alt={panel.title}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Comic Halftone Overlay Effect */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0icmdiYSgwLDAsMCwwLjIpIj48L2NpcmNsZT4KPC9zdmc+')] opacity-40 mix-blend-overlay pointer-events-none" />
        </motion.div>

        {/* Captions / Thought Bubbles */}
        <div className="relative z-20 mt-[-25%] md:mt-[-20%] flex flex-col gap-8 md:gap-16 px-2 md:px-12">
          {panel.captions.map((text, i) => {
            const isRight = i % 2 !== 0;
            return (
              <CaptionBox key={i} text={text} isRight={isRight} delay={i * 0.2} />
            );
          })}
        </div>

      </div>
    </div>
  );
};

const CaptionBox = ({ text, isRight, delay }: { text: string, isRight: boolean, delay: number, key?: any }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "end 45%"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [isRight ? 150 : -150, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [isRight ? 20 : -20, isRight ? -4 : 4]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y, opacity, scale, rotate }}
      className={`
        bg-zinc-100 text-black p-4 md:p-6 border-4 border-black 
        shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-[90%] md:w-auto
        ${isRight ? 'self-end' : 'self-start'}
      `}
    >
      <p className="text-lg md:text-2xl font-bold uppercase leading-tight" style={{ fontFamily: "'Bangers', 'Impact', sans-serif", letterSpacing: "0.08em" }}>
        {text}
      </p>
    </motion.div>
  );
};

export default function App() {
  useEffect(() => {
    // Injecting a comic font dynamically
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Bangers&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="bg-zinc-950 min-h-screen text-white overflow-x-hidden selection:bg-red-600 selection:text-white">
      
      <MusicPlayer />

      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-[90] shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />

      {/* Progress Bar */}
      <motion.div 
        style={{ scaleX, transformOrigin: "0% 50%" }}
        className="fixed top-0 left-0 right-0 h-2 bg-red-600 z-50"
      />

      {/* Hero Section */}
      <div className="h-screen flex flex-col items-center justify-center relative z-20 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-950 z-0" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="z-10 text-center"
        >
          <h1 
            className="text-6xl md:text-[10rem] font-black text-white leading-none"
            style={{ fontFamily: "'Bangers', 'Impact', sans-serif", textShadow: "4px 4px 0px #000", letterSpacing: "0.08em" }}
          >
            DIE HERRSCHAFT
          </h1>
          <h2 
            className="text-5xl md:text-[8rem] font-black text-red-600 leading-none mt-4"
            style={{ fontFamily: "'Bangers', 'Impact', sans-serif", textShadow: "4px 4px 0px #000", letterSpacing: "0.08em" }}
          >
            VON CHARLES
          </h2>
          <div className="bg-red-600 text-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] inline-block px-6 py-2 mt-8 transform -rotate-2">
            <p className="text-2xl md:text-4xl font-bold uppercase" style={{ fontFamily: "'Bangers', 'Impact', sans-serif", letterSpacing: "0.08em" }}>
              Eine epische Graphic Novel
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-12 flex flex-col items-center animate-bounce z-10"
        >
          <span className="text-zinc-400 font-bold uppercase tracking-widest mb-4">Lies die Geschichte</span>
          <ChevronDown className="text-red-600 w-12 h-12" />
        </motion.div>
      </div>

      {/* Story Panels */}
      <div className="relative z-10 pb-32">
        {storyPanels.map((panel, index) => (
          <ComicPanel key={panel.id} panel={panel} index={index} />
        ))}
      </div>

      {/* Footer / The End */}
      <div className="min-h-screen flex items-center justify-center relative z-20 bg-black px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          className="text-center"
        >
          <h2 
            className="text-8xl md:text-[15rem] font-black text-red-600 mb-6"
            style={{ fontFamily: "'Bangers', 'Impact', sans-serif", textShadow: "8px 8px 0px #000", letterSpacing: "0.08em" }}
          >
            ENDE.
          </h2>
          <p className="text-2xl md:text-4xl text-zinc-500 font-bold uppercase" style={{ fontFamily: "'Bangers', 'Impact', sans-serif", letterSpacing: "0.08em" }}>
            Die Welt gehört ihm.
          </p>
        </motion.div>
      </div>

    </div>
  );
}
