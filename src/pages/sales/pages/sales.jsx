import LineChart from 'components/chart/linechart';
import React, { useEffect, useState } from 'react';

import PageSection from '../components/pageSection';

import Button from 'components/button';
import SVG from 'components/renderSvg';
import Table from 'components/table';
import skull from 'media/svgs/skull.svg';
import requirement from 'media/svgs/requirement.svg';
import customer from 'media/svgs/customer.svg';
import sort from 'media/svgs/sort.svg';
import filter from 'media/svgs/filter.svg';
import { data } from '../components/data';

import incurred from 'media/svgs/incurred.svg';
import arrowup from 'media/svgs/arrowup.svg';
import { useSelector } from 'react-redux';
import useOffers from 'hooks/useOffers';
import { doc } from 'firebase/firestore';
import { db } from 'firebaseConfig';

const renderProfile = (val, row) => {
  return (
    <div className='w-full flex justify-center'>
      {val ? (
        <img src={val} alt={row?.username} className='size-8 rounded-full' />
      ) : (
        <div className='w-8 h-8  rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold'>
          {row?.username[0]}
        </div>
      )}
    </div>
  );
};

const columns = [
  { title: 'No', dataIndex: 'no', key: 'no' },
  {
    title: 'Profile',
    dataIndex: 'profile',
    renderCell: (val, row) => renderProfile(val, row),
  },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  {
    title: 'Subscription In',
    dataIndex: 'activity',
    renderCell: (val, row) => {
      return (
        <div
          className={`flex mx-auto w-fit justify-center items-center py-1 px-3 gap-2 rounded`}
          style={{
            backgroundColor: '#' + row?.bgColor,
          }}
        >
          <img src={row?.icon} alt={val} className='size-5 rounded-full' />
          {val}
        </div>
      );
    },
    key: 'subscriptionIn',
  },

  { title: 'Batch', dataIndex: 'batch', key: 'batch' },
  { title: 'UserName', dataIndex: 'username', key: 'username' },
  {
    title: 'Subscription Created',
    dataIndex: 'subscriptionCreated',
    renderCell: val => {
      const date = new Date(val);
      const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(date);

      return formattedDate;
    },
    key: 'subscriptionCreated',
  },
  { title: 'Cost', dataIndex: 'cost', key: 'cost' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
];

const Sales = () => {
  const currentVenderData = useSelector(state => state?.vender?.venderData);
  const { code, id } = currentVenderData;
  const baseRef = `countries/${code}`;
  const vendorRef = doc(db, `${baseRef}/vendors/${id}`);
  const collectionName = `${baseRef}/bids`;
  const purchasedServicesCollectionName = `${baseRef}/purchasedServices`;

  const [totalCustomOffers, setTotalCustomOffers] = useState(0);
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionIds, setSubscriptionIds] = useState();

  const { getCustomOffersCount, getAllSubscriptions } = useOffers();
  useEffect(() => {
    const fetchData = async () => {
      const resp = await getCustomOffersCount(vendorRef, collectionName);
      setTotalCustomOffers(resp);
    };

    const fetchSubscriptionsData = async () => {
      const resp = await getAllSubscriptions(
        vendorRef,
        purchasedServicesCollectionName
      );

      const ids = resp?.map(item => item?.subscriptionID);
      setSubscriptionIds(ids);

      const data = resp?.map((item, index) => ({
        no: '#' + (index + 1),
        icon: item.activtyDetails?.icon,
        activity: item?.activtyDetails.nameEn,
        batch: item.batchDetails?.name,
        cost: item?.price?.symbol + item?.price?.price,
        currency: item?.price?.symbol,
        isActive: item.batchDetails?.isActive,
        username: item.userDetails?.username,
        profile: item.userDetails?.photoURL,
        name: item.userDetails?.firstname + ' ' + item.userDetails?.lastname,
        subscriptionCreated: item?.subscriptionCreated,
        status: item?.status,
        bgColor: item?.activtyDetails?.bgColor,
      }));
      setSubscriptions(data);
    };

    fetchData();
    fetchSubscriptionsData();
  }, []);

  return (
    <div>
      <div>
        <div className='p-4 flex flex-col '>
          <div className='flex items-center space-x-2'>
            <SVG icon={incurred} />
            <p className='text-primary font-medium'>Total Subscribers</p>
          </div>
          <div className='flex items-center space-x-4 py-2 flex-wrap '>
            <p className='text-[24px]'>$0</p>
            <div className='bg-[#EEFBF4] rounded-md p-2 w-16 size-10 flex items-center  space-x-1'>
              <SVG icon={arrowup} />
              <span>0%</span>
            </div>
          </div>
          <p className='text-secondary'>since business operation</p>
        </div>
        <LineChart />
      </div>

      <div className='mt-3 grid md:grid-cols-1 lg:grid-cols-3 gap-3 px-2'>
        <PageSection
          title='Customer Offers'
          desc='See the bids placed by customers interested.'
          icon={customer}
          path='/sales/customer-offers'
          total={totalCustomOffers}
        />
        <PageSection
          title='Special Requirements'
          desc='See new special requirements requested by customers'
          icon={requirement}
          path='/sales/special-requirements'
          total={''}
        />
        <PageSection
          title='Expiring Subscriptions'
          desc='List of subscription that is about to be expired.'
          icon={skull}
          path='/sales/expire-subscriptions'
          total={''}
          subscriptionIds={subscriptionIds}
        />
      </div>

      <div className='my-10 flex justify-between items-center px-2'>
        <p className='text-primary font-medium'>Subscriptions</p>
        <div className='flex items-center space-x-2'>
          <div className='flex items-center justify-center space-x-2 border border-solid border-1 rounded-[10px] w-[93px] h-[32px]'>
            <p>Sort</p>
            <SVG icon={sort} />
          </div>

          <div className='flex items-center justify-center  space-x-2 border border-solid border-1 rounded-[10px] w-[93px] h-[32px]'>
            <p>Filter</p>
            <SVG icon={filter} />
          </div>
        </div>
      </div>
      <Table
        data={subscriptions}
        columns={columns}
        search={false}
        handleRowClick={() => console.log('hello')}
      />
    </div>
  );
};

export default Sales;
