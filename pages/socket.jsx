
// var io = require('socket.io-client');
import { io } from 'socket.io-client';
import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';

// export const getStaticProps = async() => {

//     let res = await axios.get('http://localhost:5001/point',{

//     })

//    return {  
//     props: {
//         pointData : res.data
//     },
//     revalidate: 40,
//    }
// }
const socket = io('http://localhost:5000')



const Queue = () => {

  const inputRef = useRef(null);
  // const [count, setCount] = useState(0);
  const [point, setPoint] = useState('');
  const [intervalId, setIntervalId] = useState(null);

  const startInterval = () => {
    
    const id = setInterval(() => {
      socket.emit('refreshPoint');
    }, 5000);
    setIntervalId(id);
  };
  
  useEffect(() => {
    console.log('use effect called')
    if (!intervalId) {
      console.log('interval start')
      startInterval();
    }
    socket.on('updatedPoint', (point) => {
      console.log('Received updated point:', point);
      setPoint(point);
    });
    
    return () => {
      console.log('socket closed')
      socket.off('updatedPoint');
      clearInterval(intervalId);
      console.log('clear interval', intervalId)
    };
  }, [intervalId, point]);
  
  const handleJoinQueue = () => {
    if(socket){
      socket.emit('queue', 'new user joined');
    }
    
  };

  return (
    <div>
      <h1>Queue</h1>

      <button onClick={handleJoinQueue}>Join Queue</button>
      {/* <button onClick={handlePoint}>Get Points</button> */}
      <div id="point" ref={inputRef}> this is point {point}</div>
    </div>
  );
};

export default Queue;