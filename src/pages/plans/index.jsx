import SVG from 'components/renderSvg';
import React, { useState } from 'react';
import escape from 'media/svgs/escape.svg';
import minus from 'media/svgs/minus-circle.svg';
import logo from 'media/pngs/logo.png';
import { useNavigate } from 'react-router-dom';
import freeIcon from 'media/svgs/freeplanIcon.svg';
import paidIcon from 'media/svgs/paidplanIcon.svg';
import paypal from 'media/svgs/p.svg';

const Plans = () => {
  return (
    <div className='w-full'>
      <Head />
      <Content />
      <ToggleButtonGroup />
      <PlanCard />
    </div>
  );
};

export default Plans;

const Head = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='p-4 flex items-center justify-between '>
        <div className='flex items-center space-x-4'>
          <div
            className='bg-white border  border-gray-400 rounded-md border-solid cursor-pointer w-[88px] flex items-center justify-center space-x-2 py-1'
            onClick={() => navigate(-1)}
          >
            <SVG icon={escape} />
            <p>ECS</p>
          </div>
          <div className='flex items-center space-x-2'>
            <SVG icon={minus} />
            <p className='text-red-600'>Your trial has been expired</p>
          </div>
        </div>

        <div className='flex items-center space-x-2'>
          <SVG icon={paypal} />
          <p>test@gmail.com</p>
          <div
            className='bg-white border  border-gray-400 rounded-md border-solid cursor-pointer w-[88px] flex items-center justify-center space-x-2 py-1'
            onClick={() => navigate(-1)}
          >
            <p>Change</p>
          </div>
        </div>
      </div>
    </>
  );
};

const Content = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full py-5 space-y-2'>
      <img src={logo} alt='logo' className='w-[50px] h-[50px]' />
      <p className='text-[24px] font-medium'>
        Sportona{' '}
        <span className='text-[#4316CA] text-[24px] font-medium'>
          Membership
        </span>
      </p>
      <p className='text-primary text-[18px]'>
        Choose the subscription plan that suits your business
      </p>
      <p className='text-primary text-[18px]'>
        You may switch plans at anytime as you desire.
      </p>
    </div>
  );
};
const ToggleButtonGroup = () => {
  const [active, setActive] = useState('monthly');

  return (
    <div className='flex items-center mx-auto w-64 h-10 rounded-[9px] bg-[#EBEBEF] overflow-hidden'>
      {/* Monthly Button */}
      <button
        onClick={() => setActive('monthly')}
        className={`transition-all duration-300 text-[13px] flex-1 h-[99%]  ${
          active === 'monthly'
            ? 'w-3/4 bg-white text-primary'
            : 'w-1/4 text-[#6C6C89]'
        } flex items-center justify-center `}
      >
        Monthly
      </button>

      {/* Yearly Button */}
      <button
        onClick={() => setActive('yearly')}
        className={`transition-all duration-300 h-[99%] text-[13px] flex-1 ${
          active === 'yearly'
            ? 'w-3/4 bg-white text-primary'
            : 'w-1/4 text-[#6C6C89]'
        } flex items-center justify-center `}
      >
        Yearly
      </button>
    </div>
  );
};

const dataX = [
  {
    title: 'Starter',
    text: 'Free',
    description:
      'Absolutely free for businesses to build their first digital presence.',
    features: [
      'One User for Business',
      'Manage Business Info',
      'Display types of services',
      'Display hours of operations',
      'Receive news on local opportunities',
      'Tips on improving sales',
      'Email Technical Support',
    ],
  },
  {
    title: 'Pro',
    text: '$400',
    description:
      'Businesses who are serious about building a steady stream of subscriptions.',
    features: [
      '3 User accounts for business',
      'Sell your services online',
      'Create promotion campaigns',
      'Access to School students',
      'Accept customer offers',
      'Corporate Discounts Enabled',
      'Competition Enabled',
      'Financial Record Tracker',
      'Manage subscriptions',
    ],
  },
  {
    title: 'Elite',
    text: '$700',
    description:
      'Be a market leader with the most powerful tools at your disposal.',
    features: [
      '5 User accounts for business',
      'AI Trend Recommendation',
      'Customizable Finance Reports',
      'Custom widget dashboards',
      'Social Media Insights feed',
      'Marketing automations',
      'Custom Payment Cycles',
      'Detailed Staff Management',
      'Enhanced discount system',
      'Instant Online Technical Support',
    ],
  },
];
const getStyles = type => {
  if (type === 'Starter') {
    return 'bg-[#F7F7F8] ';
  }
  if (type === 'Pro') {
    return 'bg-white shadow-custom';
  }
  if (type === 'Elite') {
    return 'bg-white shadow-custom2';
  }
};

const getByTitle = type => {
  if (type === 'Starter') {
    return 'Downgrade';
  }
  if (type === 'Pro') {
    return 'Current Subscription';
  }
  if (type === 'Elite') {
    return 'Upgrade';
  }
};

const getClasses = type => {
  if (type === 'Starter') {
    return 'bg-primary text-white ';
  }
  if (type === 'Pro') {
    return 'bg-[#C6B6F7] text-white';
  }
  if (type === 'Elite') {
    return 'bg-[#7047EB] text-white';
  }
};
const PlanCard = () => {
  return (
    <div className='bg-white rounded-[32px] border border-solid border-gray-300 mx-[72px] my-[32px] p-8 flex items-start space-x-6'>
      {dataX?.map((data, index) => (
        <div key={index} className='flex flex-col flex-1'>
          <div
            className={`p-6 h-[158px] rounded-[20px] ${getStyles(data?.title)}`}
          >
            <p className='text-primary'>{data?.title}</p>
            <p className='text-[30px] font-medium'>
              {data?.text}{' '}
              <span className='text-[#6C6C89] text-[20px]'>/ year</span>
            </p>
            <p className='text-primary text-[14px]'>{data?.description}</p>
          </div>
          <div className='mt-4'>
            {data?.features.map((x, i) => (
              <div key={i} className='flex items-center space-x-4 pb-2'>
                <SVG icon={data.title === 'Starter' ? freeIcon : paidIcon} />
                <p>{x}</p>
              </div>
            ))}
          </div>
          <button className={`mt-4 rounded-md py-2 ${getClasses(data?.title)}`}>
            {getByTitle(data?.title)}
          </button>
        </div>
      ))}
    </div>
  );
};
