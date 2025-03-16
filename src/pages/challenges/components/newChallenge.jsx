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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedLevel, setSelectedLevel] = useState('Legend');

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
      <div className='flex flex-col space-y-3'>
        <LeftInfo
          title='Date'
          subtitle='Scale line subtract content group effect.'
        />
        <div className='flex items-center space-x-4'>
          <ButtonSelector>
            <input
              type='date'
              className='border-none bg-transparent outline-none text-center'
              value={startDate.toISOString().split('T')[0]}
              onChange={e => setStartDate(new Date(e.target.value))}
            />
          </ButtonSelector>
          <ButtonSelector>
            <input
              type='date'
              className='border-none bg-transparent outline-none text-center'
              value={endDate.toISOString().split('T')[0]}
              min={startDate.toISOString().split('T')[0]}
              onChange={e => setEndDate(new Date(e.target.value))}
            />
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
              className='border-none bg-transpearent outline-none text-center'
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
              key={x}
              className={`cursor-pointer rounded-lg w-[120px] flex items-center justify-center p-2 ${
                selectedLevel === x ? 'bg-[#F7F7F8]' : 'bg-white'
              }`}
              onClick={() => setSelectedLevel(x)}
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
  const [expandedCategory, setExpandedCategory] = useState('Legends');

  const toggleCategory = category => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  const categories = ['Legends', 'Champs', 'Pro', 'Rookies'];

  const users = [
    {
      id: 1,
      name: 'Alice',
      rating: 4.5,
      avatar: 'https://i.pravatar.cc/150?img=1',
      category: 'Legends',
    },
    {
      id: 2,
      name: 'Bob',
      rating: 3.8,
      avatar: 'https://i.pravatar.cc/150?img=2',
      category: 'Legends',
    },
    {
      id: 3,
      name: 'Charlie',
      rating: 4.9,
      avatar: 'https://i.pravatar.cc/150?img=3',
      category: 'Legends',
    },
    {
      id: 4,
      name: 'David',
      rating: 4.2,
      avatar: 'https://i.pravatar.cc/150?img=4',
      category: 'Legends',
    },
    {
      id: 5,
      name: 'Emma',
      rating: 4.7,
      avatar: 'https://i.pravatar.cc/150?img=5',
      category: 'Legends',
    },
    {
      id: 6,
      name: 'David',
      rating: 4.7,
      avatar: 'https://i.pravatar.cc/150?img=2',
      category: 'Champs',
    },
    {
      id: 7,
      name: 'Charlie',
      rating: 4.7,
      avatar: 'https://i.pravatar.cc/150?img=5',
      category: 'Champs',
    },
    {
      id: 8,
      name: 'Emma',
      rating: 4.7,
      avatar: 'https://i.pravatar.cc/150?img=1',
      category: 'Pro',
    },
    {
      id: 9,
      name: 'Charlie',
      rating: 4.7,
      avatar: 'https://i.pravatar.cc/150?img=2',
      category: 'Pro',
    },
    {
      id: 10,
      name: 'David',
      rating: 4.7,
      avatar: 'https://i.pravatar.cc/150?img=3',
      category: 'Pro',
    },
    {
      id: 11,
      name: 'Emma',
      rating: 4.7,
      avatar: 'https://i.pravatar.cc/150?img=2',
      category: 'Rookies',
    },
    {
      id: 12,
      name: 'David',
      rating: 4.7,
      avatar: 'https://i.pravatar.cc/150?img=3',
      category: 'Rookies',
    },
    {
      id: 13,
      name: 'Charlie',
      rating: 4.7,
      avatar: 'https://i.pravatar.cc/150?img=4',
      category: 'Rookies',
    },
  ];

  return (
    <>
      <LeftInfo title={title} subtitle={subtitle} />
      <div className='relative'>
        <SearchBar placeholder='Search participant...' />
      </div>
      <div className='flex flex-col space-y-2'>
        {categories.map(category => (
          <div key={category}>
            <div
              className='flex justify-between items-center px-4 py-3 bg-[#F7F7F8] rounded-lg cursor-pointer'
              onClick={() => toggleCategory(category)}
            >
              <span className='font-medium'>{category}</span>
              <SVG
                icon={expandedCategory === category ? downward : forward}
                className='w-4 h-4'
              />
            </div>
            {expandedCategory === category && (
              <div className='grid grid-cols-2 gap-4 mt-2'>
                {users
                  .filter(user => user.category === category)
                  .map(user => (
                    <div
                      key={user.id}
                      className='flex items-center space-x-3 p-2'
                    >
                      <input
                        type='checkbox'
                        className='form-checkbox h-5 w-5 rounded border-gray-300'
                      />
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className='w-10 h-10 rounded-full object-cover'
                      />
                      <div>
                        <p className='font-medium text-sm'>{user.name}</p>
                        <p className='text-gray-500 text-sm'>
                          {user.rating.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
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
