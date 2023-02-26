import React, { SetStateAction, useRef, useState, useEffect } from 'react';
import axios from 'axios'
import { io } from 'socket.io-client';
import { Button } from '@mui/material';

function Index() {
  const socket = io('http://localhost:5000')
  const [point, setPoint] = useState<SetStateAction<number>>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const data = {
    userId: 1,
    total_earned: point
  }
  const handleInputRef = () => {
    const inputValue = inputRef.current?.value;
    console.log(inputValue);
    if (inputValue) {
      setPoint(parseInt(inputValue));
    }
  }

  useEffect(() => {
    const updatePoint = async () => {
      const res = await axios.post('http://localhost:5001/point/edit', { data });
    };

    if (point !== 0) {
      updatePoint();
      socket.emit('refreshPoint', point)
    }
  }, [point]);
  return (
    <div>
      Home page<br></br>

      <Button variant="contained" onClick={handleInputRef}>Update point</Button><br></br>
      <input type="number" ref={inputRef}/>
    </div>
  );
}

export default Index;