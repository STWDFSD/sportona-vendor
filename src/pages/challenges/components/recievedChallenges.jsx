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
              className={`flex items-center p-3 mb-4 ${
                selectedChallenge?.id === challenge?.id
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
              className={`flex items-center p-3 mb-4 ${
                selectedChallenge?.id === challenge?.id
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
      <SearchBar />
      <div className='flex justify-between items-center px-3 bg-[#F7F7F8] py-1 my-3 rounded-[6px]'>
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
          className='flex justify-between items-center px-3 my-2 bg-[#F7F7F8] py-1 rounded-[6px]'
        >
          <span>{x}</span>
          <SVG icon={forward} />
        </div>
      ))}
    </>
  );
};
