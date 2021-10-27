import React, { useRef, useState, useEffect } from "react";
import './App.css';
import { MdPauseCircleFilled, MdPlayCircleFilled } from 'react-icons/md'
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi'

function App() {
  const gallery = ['/images/dev-table.jpg', '/images/flower-open.jpg', '/images/pink-creamy-bg.jpg', '/images/spotify-dev-bg.jpg']
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(true)

  function checkCount() {
    const previousCount = count
    if (previousCount > gallery.length - 2)
      setCount(0)
  }

  const callback = () => {
    //Can read new state and props
    setCount(count + 1)
    checkCount()
  }

  function useInterval(callback, delay) {
    //create my reference object
    const savedCallback = useRef()

    useEffect(() => {
      //after every render save the newest callback our reference object
      savedCallback.current = callback
    })

    useEffect(() => {
      function tick() {
        //call the latest timer 
        savedCallback.current();
      }

      /*Using delay instead of isRunning because useEffect won't trigger a re-render when a boolean changes
      Whereas delay here is a parameter which isn't a boolean, and changes depending on isRunning state. 
       */
      if (delay !== null) {
        let timer = setInterval(tick, delay)
        return () => clearInterval(timer)
      }
    }, [delay])
  }

  useInterval(callback, isRunning ? 5000 : null)
  const currentImg = gallery[count]

  return (
    <div className="container">
      <header className="title-area">
        <h1 className="title">Carousel App in React</h1>
      </header>
      <main>
        <section className="carousel">
          <img className="slide" src={currentImg} alt="slide" />
          {isRunning ?
            <MdPauseCircleFilled
              className="pause"
              onClick={() => setIsRunning(!isRunning)}
            />
            : <MdPlayCircleFilled
              className="pause"
              onClick={() => setIsRunning(!isRunning)}
            />
          }

          <div className="np-btn-container">
            <BiLeftArrow
              className="next-btn"
              onClick={() => {
                setCount(() => count - 1)
                if (count <= 0)
                  setCount(gallery.length - 1)

              }}
            />
            <BiRightArrow
              className="prev-btn"
              onClick={() => {
                setCount(() => count + 1)
                checkCount()
              }}
            />
          </div>
        </section>
      </main>
    </div>
  );
}







export default App;
