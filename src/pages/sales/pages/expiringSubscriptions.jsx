import SVG from 'components/renderSvg';
import React, { useEffect } from 'react';
import back from 'media/svgs/back.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import Table from 'components/table';
import { subscriptionData } from '../components/data';
import Button from 'components/button';
import sort from 'media/svgs/sort.svg';
import filter from 'media/svgs/filter.svg';
import { httpsCallable } from 'firebase/functions';
import { functions } from 'firebaseConfig';
import ProfileInitials from 'components/profileInitials';
import SportBadge from 'components/sportBadge';
import StatusBadge from 'components/statusBadge';

const columns = [
  { title: 'No', dataIndex: 'no', key: 'no' },
  {
    title: 'Profile',
    dataIndex: 'profile',
    key: 'profile',
    renderCell: (val, row) => <ProfileInitials name={row.name} />,
  },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  {
    title: 'Subscription In',
    dataIndex: 'subscriptionIn',
    key: 'subscriptionIn',
    renderCell: (val) => <SportBadge sport={val} />,
  },
  { title: 'Batch', dataIndex: 'batch', key: 'batch' },
  { title: 'Username', dataIndex: 'username', key: 'username' },
  {
    title: 'Expiry Status',
    dataIndex: 'expriyStatus',
    key: 'expriyStatus',
    renderCell: (val) => <StatusBadge status={val} />,
  },
  { title: 'Action', dataIndex: 'action', key: 'action', type: 'subscription' },
];

const renderCustomCell = (val, row) => {
  return <div className='bg-green-200  rounded-[6px]'>{val}</div>;
};
const renderProfile = (val, row) => {
  return (
    <div className='w-full flex justify-center'>
      <div className='w-8 h-8  rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold'>
        A
      </div>
    </div>
  );
};

const SendEmail = row => {
  console.log(row);
};

const GoBack = () => {
  const navigate = useNavigate();
  return (
    <div className='flex items-center space-x-3'>
      <SVG
        icon={back}
        className='cursor-pointer'
        onClick={() => navigate(-1)}
      />
      <p>Expiring Subscriptions</p>
    </div>
  );
};

const SortIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4h13M3 8h9M3 12h5m8 0l-4-4m4 4l-4 4"
    />
  </svg>
);

const FilterIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
  </svg>
);

const ExpireSubscriptions = () => {
  const location = useLocation();
  const { subscriptionIds } = location.state || { subscriptionIds: [] };
  const getSubscriptionsDetails = httpsCallable(
    functions,
    'getSubscriptionsDetails'
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the function with subscriptionIds
        const response = await getSubscriptionsDetails({ subscriptionIds });

        console.log(response.data); // Log the response data
      } catch (error) {
        console.error('Error fetching subscriptions:', error.message);
      }
    };

    if (subscriptionIds && subscriptionIds.length > 0) {
      fetchData();
    }
  }, [subscriptionIds]);

  const handleRowClick = (row) => {
    // Handle row click if needed
    console.log('Row clicked:', row);
  };

  return (
    <div>
      <GoBack />
      <div className='mt-4 p-2'>
        <div className='my-2 flex justify-between items-center px-2'>
          <div className='flex items-center space-x-2'>
            <p className='font-medium text-primary'>Subscriptions</p>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              title='Sort'
              variant='tool'
              icon={<SortIcon />}
              iconRight
              className="!px-3 !py-1.5 !gap-1"
            />
            <Button
              title='Filter'
              variant='tool'
              icon={<FilterIcon />}
              iconRight
              className="!px-3 !py-1.5 !gap-1"
            />
          </div>
        </div>
        <Table
          columns={columns}
          data={subscriptionData}
          search={false}
          onClick={SendEmail}
          handleRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};

export default ExpireSubscriptions;
