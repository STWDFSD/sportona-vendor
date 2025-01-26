import SearchBar from 'components/searchInput';
import React, { useState } from 'react';
import forward from 'media/svgs/forward.svg';
import downward from 'media/svgs/downward.svg';
import SVG from 'components/renderSvg';
import Button from 'components/button';

const challengesData = [
  {
    id: 1,
    type: 'recent',
    service: 'Basketball',
    level: 'Legends',
    location: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    count: '5 participant',
    gamedate: '21 june to 22 june',
    gameType: 'External',
    time: '5 am to 7 am',
    avatar: 'https://via.placeholder.com/50',
    clubName: 'ABC Manchester Org',
    date: '2024-10-01',
    description: 'Match against Club B',
    participants: {
      yourTeam: ['Player 1', 'Player 2'],
      opponentTeam: [
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
      ],
    },
  },

  {
    id: 2,
    type: 'recent',
    service: 'Basketball',
    level: 'Legends',
    location: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    count: '5 participant',
    gamedate: '21 june to 22 june',
    gameType: 'External',
    time: '5 am to 7 am',
    avatar: 'https://via.placeholder.com/50',
    clubName: 'ABC Manchester Org',
    date: '2024-10-01',
    description: 'Match against Club B',
    participants: {
      yourTeam: ['Player 1', 'Player 2'],
      opponentTeam: [
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
      ],
    },
  },
  {
    id: 3,
    type: 'recent',
    service: 'Basketball',
    level: 'Legends',
    location: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    count: '5 participant',
    gamedate: '21 june to 22 june',
    gameType: 'External',
    time: '5 am to 7 am',
    avatar: 'https://via.placeholder.com/50',
    clubName: 'ABC Manchester Org',
    date: '2024-10-01',
    description: 'Match against Club B',
    participants: {
      yourTeam: ['Player 1', 'Player 2'],
      opponentTeam: [
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
      ],
    },
  },
  {
    id: 4,
    type: 'recent',
    service: 'Basketball',
    level: 'Legends',
    location: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    count: '5 participant',
    gamedate: '21 june to 22 june',
    gameType: 'External',
    time: '5 am to 7 am',
    avatar: 'https://via.placeholder.com/50',
    clubName: 'ABC Manchester Org',
    date: '2024-10-01',
    description: 'Match against Club B',
    participants: {
      yourTeam: ['Player 1', 'Player 2'],
      opponentTeam: [
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
      ],
    },
  },
  {
    id: 5,
    type: 'lastMonth',
    service: 'Basketball',
    level: 'Legends',
    location: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    count: '5 participant',
    gamedate: '21 june to 22 june',
    gameType: 'External',
    time: '5 am to 7 am',
    avatar: 'https://via.placeholder.com/50',
    clubName: 'ABC Manchester Org',
    date: '2024-10-01',
    description: 'Match against Club B',
    participants: {
      yourTeam: ['Player 1', 'Player 2'],
      opponentTeam: [
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
      ],
    },
  },
  {
    id: 6,
    type: 'lastMonth',
    service: 'Basketball',
    level: 'Legends',
    location: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    count: '5 participant',
    gamedate: '21 june to 22 june',
    gameType: 'External',
    time: '5 am to 7 am',
    avatar: 'https://via.placeholder.com/50',
    clubName: 'ABC Manchester Org',
    date: '2024-10-01',
    description: 'Match against Club B',
    participants: {
      yourTeam: ['Player 1', 'Player 2'],
      opponentTeam: [
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
      ],
    },
  },
  // Add more challenges here
];

const ChallengesRecieved = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  return (
    <div className='flex h-[80vh] p-3'>
      {/* Left Side: Challenges List */}
      <div className='w-1/4 bg-white p-4 overflow-y-auto'>
        <h2 className='font-medium text-[16px] mb-4'>Recent</h2>
        {challengesData
          .filter(challenge => challenge.type === 'recent')
          .map(challenge => (
            <div
              key={challenge.id}
              onClick={() => setSelectedChallenge(challenge)}
              className={`flex items-center p-3 mb-4 ${selectedChallenge?.id === challenge?.id
                ? 'bg-[#EBEBEF]'
                : 'bg-white'
                } rounded-[10px] cursor-pointer`}
            >
              <img
                src={challenge.avatar}
                alt={challenge.clubName}
                className='w-12 h-12 rounded-full mr-4'
              />
              <div>
                <h3 className='font-bold'>{challenge.clubName}</h3>
                <p className='text-gray-500'>{challenge.date}</p>
              </div>
            </div>
          ))}

        <h2 className='font-medium text-[16px] mb-4'>Last Month</h2>
        {challengesData
          .filter(challenge => challenge.type === 'lastMonth')
          .map(challenge => (
            <div
              key={challenge.id}
              onClick={() => setSelectedChallenge(challenge)}
              className={`flex items-center p-3 mb-4 ${selectedChallenge?.id === challenge?.id
                ? 'bg-[#EBEBEF]'
                : 'bg-white'
                } rounded-[10px] cursor-pointer`}
            >
              <img
                src={challenge.avatar}
                alt={challenge.clubName}
                className='w-12 h-12 rounded-full mr-4'
              />
              <div>
                <h3 className='font-bold'>{challenge.clubName}</h3>
                <p className='text-gray-500'>{challenge.date}</p>
              </div>
            </div>
          ))}
      </div>

      {/* Right Side: Challenge Details */}
      <div className='w-3/4 p-2 border border-solid border-1 rounded-[8px] overflow-auto max-h-[95vh]'>
        {selectedChallenge ? (
          <div className='bg-white p-6'>
            {/* <h2 className='font-bold text-2xl mb-4'>
              {selectedChallenge.description}
            </h2> */}
            <div className='flex items-center space-x-4 flex-wrap'>
              <div className='mb-4 bg-gray-100 rounded-[4px] p-1'>
                <span className=''>{selectedChallenge.gameType}</span>
              </div>
              <div className='mb-4 bg-teal-100 rounded-[4px] p-1'>
                <span className=''>{selectedChallenge.service}</span>
              </div>
              <div className='mb-4 bg-orange-100 rounded-[4px] p-1'>
                <span className=''>{selectedChallenge.level}</span>
              </div>
            </div>
            <div className='flex items-center space-x-4 flex-wrap'>
              <div className='mb-4 '>
                <span className='text-primary font-medium'>
                  {selectedChallenge.location}
                </span>
              </div>
              <div className='mb-4 '>
                <span className='text-primary font-medium'>
                  {selectedChallenge.gamedate}
                </span>
              </div>
              <div className='mb-4 '>
                <span className='text-primary font-medium'>
                  {selectedChallenge.time}
                </span>
              </div>
            </div>

            <div className='mb-6'>
              <h3 className='text-secondary text-16px[] mb-2'>
                Opponents Participants
              </h3>
              <ul className='list-disc pl-5 grid grid-cols-2 gap-2'>
                {selectedChallenge.participants.opponentTeam.map(
                  participant => (
                    <li
                      key={participant.id}
                      className='flex items-center mb-2 col-span-1'
                    >
                      <img
                        src={participant.avatar}
                        alt={participant.name}
                        className='w-8 h-8 rounded-full mr-3'
                      />
                      <div className='flex flex-col'>
                        <span className='font-medium mr-2'>
                          {participant.name}
                        </span>
                        <span className='text-sm text-gray-500'>
                          {participant.rating}
                        </span>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>
            <hr />
            <div className='mb-6 mt-3'>
              <h3 className='text-secondary text-[16px] mb-2'>
                Your Participants
              </h3>
            </div>

            <TeamParticipant />

            <div className='flex items-center space-x-3'>
              <Button title='Accept' variant='secondary' />
              <Button title='Decline' variant='danger' />
            </div>
          </div>
        ) : (
          <p className='text-gray-500'>Select a challenge to view details</p>
        )}
      </div>
    </div>
  );
};

export default ChallengesRecieved;

const TeamParticipant = ({ title, subtitle }) => {
  const [expandedCategory, setExpandedCategory] = useState('Legends');

  const toggleCategory = (category) => {
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
      category: 'Legends'
    },
    {
      id: 2,
      name: 'Bob',
      rating: 3.8,
      avatar: 'https://i.pravatar.cc/150?img=2',
      category: 'Legends'
    },
    {
      id: 3,
      name: 'Charlie',
      rating: 4.9,
      avatar: 'https://i.pravatar.cc/150?img=3',
      category: 'Legends'
    },
    {
      id: 4,
      name: 'David',
      rating: 4.2,
      avatar: 'https://i.pravatar.cc/150?img=4',
      category: 'Legends'
    },
    {
      id: 5,
      name: 'Emma',
      rating: 4.7,
      avatar: 'https://i.pravatar.cc/150?img=5',
      category: 'Legends'
    },
    {
      id: 6,
      name: 'David',
      rating: 4.7,
      avatar: 'https://i.pravatar.cc/150?img=2',
      category: 'Champs'
    },
    {
      id: 7,
      name: 'Charlie',
      rating: 4.7,
      avatar: 'https://i.pravatar.cc/150?img=5',
      category: 'Champs'
    },
    {
      id: 8,
      name: 'Emma',
      rating: 4.7,
      avatar: 'https://i.pravatar.cc/150?img=1',
      category: 'Pro'
    },
    {
      id: 9,
      name: 'Charlie',
      rating: 4.7,
      avatar: 'https://i.pravatar.cc/150?img=2',
      category: 'Pro'
    },
    {
      id: 10,
      name: 'David',
      rating: 4.7,
      avatar: 'https://i.pravatar.cc/150?img=3',
      category: 'Pro'
    },
    {
      id: 11,
      name: 'Emma',
      rating: 4.7,
      avatar: 'https://i.pravatar.cc/150?img=2',
      category: 'Rookies'
    },
    {
      id: 12,
      name: 'David',
      rating: 4.7,
      avatar: 'https://i.pravatar.cc/150?img=3',
      category: 'Rookies'
    },
    {
      id: 13,
      name: 'Charlie',
      rating: 4.7,
      avatar: 'https://i.pravatar.cc/150?img=4',
      category: 'Rookies'
    },
  ];


  return (
    <>
      <div className="relative">
        <SearchBar placeholder="Search participant..." />
      </div>
      <div className='flex flex-col space-y-2'>
        {categories.map(category => (
          <div key={category}>
            <div
              className='flex justify-between items-center px-4 py-3 bg-[#F7F7F8] rounded-lg cursor-pointer'
              onClick={() => toggleCategory(category)}
            >
              <span className="font-medium">{category}</span>
              <SVG
                icon={expandedCategory === category ? downward : forward}
                className="w-4 h-4"
              />
            </div>
            {expandedCategory === category && (
              <div className='grid grid-cols-2 gap-4 mt-2'>
                {users
                  .filter(user => user.category === category)
                  .map(user => (
                    <div key={user.id} className='flex items-center space-x-3 p-2'>
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
                        <p className='text-gray-500 text-sm'>{user.rating.toLocaleString()}</p>
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
