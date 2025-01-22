import ButtonSelector from 'components/buttonSelector';
import Select from 'components/dropdown';
import React, { useState } from 'react';
import NumberInput from './NumberInput';
import Button from 'components/button';
import SearchBar from 'components/searchInput';
import SVG from 'components/renderSvg';
import forward from 'media/svgs/forward.svg';
import downward from 'media/svgs/downward.svg';

const level = ['Legend', 'Champ', 'Pro', 'Rookie'];

const NewChallenge = () => {
  const [type, setType] = useState('internal');
  return (
    <div className='py-4 px-6 w-full flex flex-col space-y-8'>
      <div className='flex flex-col space-y-3'>
        <LeftInfo
          title='Type'
          subtitle='Figma ipsum component variant main layer.'
        />
        <div className='flex items-center justify-between space-x-2 '>
          <div
            className={`${type === 'internal' ? 'bg-[#F7F7F8]' : 'bg-white'} flex-1 cursor-pointer rounded-[8px] text-primary flex justify-center items-start px-8 py-2`}
            onClick={() => setType('internal')}
          >
            Internal
          </div>
          <div
            className={`${type === 'external' ? 'bg-[#F7F7F8]' : 'bg-white'} flex-1 cursor-pointer rounded-[8px] text-primary flex justify-center items-start px-8 py-2`}
            onClick={() => setType('external')}
          >
            External
          </div>
        </div>
      </div>
      {type === 'external' && (
        <div className='flex  flex-col space-y-3'>
          <LeftInfo
            title='Opponent'
            subtitle='Choose the opponent you want to invite'
          />
          <Select name='name' height='40px' className='w-full'></Select>
        </div>
      )}
      <div className='flex  flex-col space-y-3'>
        <LeftInfo
          title='Category'
          subtitle='Scale auto auto plugin pen effect line.'
        />
        <Select name='name' height='40px' className='w-full'></Select>
      </div>

      {type === 'external' && (
        <div className='flex  flex-col space-y-3'>
          <LeftInfo
            title='Venue'
            subtitle='Choose the location and hall for the challenge'
          />
          <Select name='name' height='40px' className='w-full'></Select>
        </div>
      )}
      <div className='flex   flex-col space-y-3'>
        <LeftInfo
          title='Date'
          subtitle='Scale line subtract content group effect.'
        />
        <div className='flex items-center space-x-4'>
          <ButtonSelector>
            <p>21 Date 2021</p>
          </ButtonSelector>
          <ButtonSelector value=''>
            <p>21 Date 2021</p>
          </ButtonSelector>
        </div>
      </div>
      <div
        className='flex 
        flex-col space-y-3'
      >
        <LeftInfo
          title='Time Duration'
          subtitle='Slice subtract outline flows figjam draft.'
        />
        <div className='flex items-center space-x-4'>
          <ButtonSelector value=''>
            <input
              type='time'
              className='border-none bg-transparent outline-none text-center'
              onChange={e => console.log(e.target.value)} // Handle time change
            />
          </ButtonSelector>
          <ButtonSelector value=''>
            <input
              type='time'
              className='border-none bg-transparent outline-none text-center'
              onChange={e => console.log(e.target.value)} // Handle time change
            />
          </ButtonSelector>
        </div>
      </div>

      <div
        className='flex 
        flex-col space-y-3'
      >
        <LeftInfo
          title='Preferred Level'
          subtitle='Pic the participants from your batch to confirm.'
        />
        <div className='flex items-center justify-between space-x-4'>
          {level.map(x => (
            <div
              className='bg-[#F7F7F8]  w-[120px] flex items-center justify-center p-2 '
              onClick={() => {}}
            >
              <p className='text-center'>{x}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        className='flex 
        flex-col space-y-3'
      >
        <LeftInfo
          title='Number of Participants'
          subtitle='Confirm the number of participants for the event each side'
        />

        <NumberInput />
      </div>
      {type === 'internal' && (
        <>
          {' '}
          <div
            className='flex 
        flex-col space-y-3'
          >
            <TeamParticipant
              title='Team A Participants'
              subtitle='Pic the participants from your batch to confirm'
            />
          </div>
          <div
            className='flex 
        flex-col space-y-3'
          >
            <TeamParticipant
              title='Team B Participants'
              subtitle='Pic the participants from your batch to confirm'
            />
          </div>
        </>
      )}

      {type === 'external' && (
        <div
          className='flex 
        flex-col space-y-3'
        >
          <TeamParticipant
            title='Participants'
            subtitle='Pic the participants from your batch to confirm'
          />
        </div>
      )}
      <Button title='Save' variant='success' />
    </div>
  );
};

export default NewChallenge;

const TeamParticipant = ({ title, subtitle }) => {
  const users = [
    {
      id: 1,
      name: 'Alice',
      rating: 4.5,
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 2,
      name: 'Bob',
      rating: 3.8,
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: 3,
      name: 'Charlie',
      rating: 4.9,
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    {
      id: 4,
      name: 'David',
      rating: 4.2,
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    {
      id: 5,
      name: 'Emma',
      rating: 4.7,
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
  ];
  return (
    <>
      <LeftInfo title={title} subtitle={subtitle} />
      <SearchBar />
      <div className='flex justify-between items-center px-3 bg-[#F7F7F8] py-1 rounded-[6px]'>
        <span>Legends</span>
        <SVG icon={downward} />
      </div>
      <div className='grid grid-cols-2 gap-4 p-4'>
        {users.map(user => (
          <div className='col-span-1   p-2 flex items-center space-x-4'>
            <input
              type='checkbox'
              className='form-checkbox h-5 w-5 text-blue-600'
            />
            <img
              src={user.avatar}
              alt={user.name}
              className='w-12 h-12 rounded-full'
            />
            <div>
              <p className='font-semibold'>{user.name}</p>
              <p className='text-sm text-gray-500'>Rating: {user.rating}</p>
            </div>
          </div>
        ))}
      </div>
      {['Champs', 'Pro', 'Rookies'].map(x => (
        <div
          key={x}
          className='flex justify-between items-center px-3 bg-[#F7F7F8] py-1 rounded-[6px]'
        >
          <span>{x}</span>
          <SVG icon={forward} />
        </div>
      ))}
    </>
  );
};

const LeftInfo = ({ title, subtitle }) => {
  return (
    <div className='flex flex-col space-y-1'>
      <p className='font-medium text-primary text-[18px]'>{title}</p>
      <p className='text-secondary text-[18px] '>{subtitle}</p>
    </div>
  );
};
