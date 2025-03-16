import React, { useState } from 'react';
import SelectButton from 'components/button/selectButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpShortWide,
  faArrowDownShortWide,
} from '@fortawesome/free-solid-svg-icons';

const sports = ['Football', 'Swimming'];
const attrs = ['Amaeture'];
const states = ['External Only'];

const Rankings = () => {
  const [traineeFilters, setTraineeFilters] = useState({
    sport: 0,
    attr: 0,
    state: 0,
    dirc: -1,
  });
  const [vendorFilters, setVendorFilters] = useState({ sport: 0, dirc: -1 });

  const trainees = [
    {
      no: 1,
      profile: 'https://i.pravatar.cc/150?img=1',
      name: 'Joanna Lockman',
      username: '@Joanna_Lockman',
      points: 1475,
    },
    {
      no: 2,
      profile: 'https://i.pravatar.cc/150?img=2',
      name: 'Byron Stiedemann',
      username: '@Byron.Stiedemann',
      points: 1399,
    },
    {
      no: 3,
      profile: 'https://i.pravatar.cc/150?img=3',
      name: 'Rachel Haag',
      username: '@Rachel.Haag',
      points: 1350,
    },
    {
      no: 4,
      profile: 'https://i.pravatar.cc/150?img=4',
      name: 'Julio Zulauf',
      username: '@Julioz',
      points: 1333,
    },
    {
      no: 5,
      profile: 'https://i.pravatar.cc/150?img=5',
      name: 'Michele Lemke',
      username: '@MichelL',
      points: 1295,
    },
  ];

  const vendors = [
    {
      no: 1,
      profile: 'https://i.pravatar.cc/150?img=2',
      name: 'Swim Stars',
      username: '@swimstarsnorth',
      points: 2963,
    },
    {
      no: 2,
      profile: 'https://i.pravatar.cc/150?img=3',
      name: 'Aqua Aspire',
      username: '@Aquaaspire',
      points: 2901,
    },
    {
      no: 3,
      profile: 'https://i.pravatar.cc/150?img=5',
      name: 'Bluewave Training',
      username: '@bluewavett',
      points: 2853,
    },
    {
      no: 4,
      profile: 'https://i.pravatar.cc/150?img=4',
      name: 'SwimSmart UK',
      username: '@swimsmartlondon',
      points: 2711,
    },
    {
      no: 5,
      profile: 'https://i.pravatar.cc/150?img=1',
      name: 'OceanEdge CC',
      username: '@OceanEdge',
      points: 2685,
    },
  ];

  const RankingTable = ({ data, title, filters, onFilterChange }) => (
    <div className='mb-8'>
      <h2 className='text-2xl font-medium mb-4'>{title}</h2>

      <div className='flex gap-2 mb-4'>
        {title === 'Trainees' ? (
          <>
            <SelectButton
              options={sports}
              selectedIndex={traineeFilters.sport}
              setSelectedIndex={newVal =>
                setTraineeFilters({ ...traineeFilters, sport: newVal })
              }
            />
            <SelectButton
              width='120px'
              options={attrs}
              selectedIndex={traineeFilters.attr}
              setSelectedIndex={newVal =>
                setTraineeFilters({ ...traineeFilters, attr: newVal })
              }
            />
            <SelectButton
              width='150px'
              options={states}
              selectedIndex={traineeFilters.state}
              setSelectedIndex={newVal =>
                setTraineeFilters({ ...traineeFilters, state: newVal })
              }
            />
            <button
              className='p-2 border rounded-lg hover:bg-gray-50'
              onClick={() =>
                setTraineeFilters({
                  ...traineeFilters,
                  dirc: -1 * traineeFilters.dirc,
                })
              }
            >
              {traineeFilters.dirc === 1 ? (
                <FontAwesomeIcon icon={faArrowUpShortWide} />
              ) : (
                <FontAwesomeIcon icon={faArrowDownShortWide} />
              )}
            </button>
          </>
        ) : (
          <>
            <SelectButton
              options={sports}
              selectedIndex={vendorFilters.sport}
              setSelectedIndex={newVal =>
                setVendorFilters({ ...vendorFilters, sport: newVal })
              }
            />
            <button
              className='p-2 border rounded-lg hover:bg-gray-50'
              onClick={() =>
                setVendorFilters({
                  ...traineeFilters,
                  dirc: -1 * vendorFilters.dirc,
                })
              }
            >
              {vendorFilters.dirc === 1 ? (
                <FontAwesomeIcon icon={faArrowUpShortWide} />
              ) : (
                <FontAwesomeIcon icon={faArrowDownShortWide} />
              )}
            </button>
          </>
        )}
      </div>

      <div className='bg-white rounded-lg overflow-hidden'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-4 text-left text-sm font-medium text-gray-500'>
                No.
              </th>
              <th className='px-6 py-4 text-left text-sm font-medium text-gray-500'>
                Profile
              </th>
              <th className='px-6 py-4 text-left text-sm font-medium text-gray-500'>
                Name
              </th>
              <th className='px-6 py-4 text-left text-sm font-medium text-gray-500'>
                Username
              </th>
              <th className='px-6 py-4 text-left text-sm font-medium text-gray-500'>
                Points
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {data.map(item => (
              <tr key={item.username} className='hover:bg-gray-50'>
                <td className='px-6 py-4'>
                  {item.no === 1
                    ? '🥇'
                    : item.no === 2
                      ? '🥈'
                      : item.no === 3
                        ? '🥉'
                        : `#${item.no}`}
                </td>
                <td className='px-6 py-4'>
                  <img
                    src={item.profile}
                    alt=''
                    className='w-10 h-10 rounded-full object-cover'
                  />
                </td>
                <td className='px-6 py-4'>{item.name}</td>
                <td className='px-6 py-4 text-gray-500'>{item.username}</td>
                <td className='px-6 py-4 font-medium'>{item.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className='p-6 max-w mx-auto'>
      <div className='flex gap-4'>
        <div className='flex-1'>
          <RankingTable
            data={trainees}
            title='Trainees'
            filters={traineeFilters}
            onFilterChange={setTraineeFilters}
          />
        </div>
        <div className='flex-1'>
          <RankingTable
            data={vendors}
            title='Vendors'
            filters={vendorFilters}
            onFilterChange={setVendorFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default Rankings;
