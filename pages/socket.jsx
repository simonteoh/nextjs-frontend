
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
  const [point, setPoint] = useState('');

  useEffect(() => {
    console.log('use effect called')
    socket.on('updatedPoint', (point) => {
      console.log('Received updated point:', point);
      setPoint(point);
    });
    
    return () => {
      console.log('socket closed')
      socket.off('updatedPoint');
    };
  }, [point]);
  
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