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

const columns = [
  { title: 'No', dataIndex: 'no', key: 'no' },
  {
    title: 'Profile',
    dataIndex: 'profile',
    key: 'profile',
    renderCell: (val, row) => renderProfile(val, row),
  },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  {
    title: 'Subscription In',
    dataIndex: 'subscriptionIn',
    key: 'subscriptionIn',
    renderCell: (val, row) => renderCustomCell(val, row),
  },

  { title: 'Batch', dataIndex: 'batch', key: 'batch' },
  { title: 'UserName', dataIndex: 'username', key: 'username' },
  { title: 'Expiry Status', dataIndex: 'expriyStatus', key: 'expriyStatus' },
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

  return (
    <div>
      <GoBack />
      <div className='mt-4 p-2'>
        <div className='my-2 flex justify-between items-center px-2'>
          <div className='flex items-center space-x-2'>
            <p className='font-medium text-primary '>Subscriptions</p>
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              title='Sort'
              variant={'outline'}
              icon={<SVG icon={sort} />}
              iconRight
            />
            <Button
              title='Filter'
              iconRight
              variant={'outline'}
              icon={<SVG icon={filter} />}
            />
          </div>
        </div>
        <Table
          columns={columns}
          data={subscriptionData}
          search={false}
          onClick={SendEmail}
        />
      </div>
    </div>
  );
};

export default ExpireSubscriptions;
