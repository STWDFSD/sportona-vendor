import React, { useEffect, useState } from 'react';

function GetCurrentAddress() {
  const [add, setAdd] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;

      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url)
        .then(res => res.json())
        .then(data => setAdd(data.address));
    });
  }, []);

  return (
    <div className='flex items-center space-x-2'>
      <p>
        {add.city ||
          add?.state ||
          add?.state_district ||
          add.county ||
          'London UK'}
      </p>
      <p>{add.country}</p>
    </div>
  );
}

export default GetCurrentAddress;
