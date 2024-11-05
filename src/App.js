// custom styles
import "./styles/utility.css";
import "./styles/App.css";

import { Router } from "routes/Router";
import { useRef, useState } from "react";

function App() {
  const [play, setPlay] = useState(false);
  const audioRef = useRef(null);

  const toggleSound = () => {
    setPlay((prevPlay) => {
      if (!prevPlay) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      return !prevPlay;
    });
  };
  return <>
    <Router />
    <div style={{ position: 'fixed', bottom: '60px', right: '10px', display: 'flex', gap: '10px' }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          onClick={toggleSound}
        >
          <img src={play ? '/assets/icon/pu.svg' : '/assets/icon/play.svg'} />
        </button>
        <audio ref={audioRef} src="./assets/tune/tone.mp3" /> {/* Use ref here */}
      </div>
  </>;

}

export default App;
