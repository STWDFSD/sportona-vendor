import React, { useState } from 'react';
import ChartSection from './components/chartSection';
import HomeHeader from './components/HomeHeader';
import ActionSection from 'components/actionSection';
import beach from 'media/svgs/beach.svg';

import ongoingIcon from 'media/svgs/trending-up.svg';
import newSubIcon from 'media/svgs/newSub.svg';
import trendIcon from 'media/svgs/trend-alert.svg';
import skull from 'media/svgs/smallskull.svg';
import Services from 'pages/setup/pages/services';
import Business from 'pages/setup/pages/business';
import offersIcon from 'media/svgs/offersIcon.svg';
import leaderboard from 'media/svgs/leaderboard.svg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isOpen, setIsOpen] = useState({
    show: false,
    data: '',
  });

  const { venderData } = useSelector(state => state.vender);
  const { services } = venderData;

  const navigate = useNavigate();

  const holidays = [
    { date: '15 Sept', event: 'Valentines Day' },
    { date: '16 Sept', event: 'No Schedule' },
    { date: '15 Sept', event: 'No Schedule' },
  ];

  const subscriptions = [
    { expiraydate: '5 days left', name: 'Clark Kertzmann' },
    { expiraydate: '5 days left', name: 'Clark Kertzmann' },
    { expiraydate: '5 days left', name: 'Clark Kertzmann' },
  ];
  const subscribers = [
    { day: 'Today', name: 'Clark Kertzmann' },
    { day: 'Today', name: 'Clark Kertzmann' },
    { day: 'Today', name: 'Clark Kertzmann' },
  ];

  const offers = [
    { money: '134 < 300', name: 'Clark Kertzmann' },
    { money: '134 < 300', name: 'Clark Kertzmann' },
    { money: '134 < 300', name: 'Clark Kertzmann' },
  ];
  const trends = [
    { no: '#1', name: 'Best baseball practices' },
    { no: '#2', name: 'Best basketball practices' },
    { no: '#3', name: 'Best football practices' },
    { no: '#4', name: 'Best cricket practices' },
    { no: '#5', name: 'Best hockey practices' },
  ];

  const engagment = [
    { time: '1 hour 38 mins left', name: 'Batch 1' },
    { time: '1 hour 38 mins left', name: 'Batch 1' },
    { time: '1 hour 38 mins left', name: 'Batch 1' },
  ];

  const handleMoreClick = () => {
    navigate('/services'); // replace with the correct route for your service page
  };
  return (
    <>
      <div className='pb-2'>
        <HomeHeader setIsOpen={setIsOpen} />
        <ChartSection />
        <div className='p-2 grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 xs:grid-cols-1  gap-2'>
          <div className='col-span-1 flex flex-wrap gap-y-3 w-full'>
            <ActionSection
              title='Staff Upcoming Holiday'
              icon={beach}
            ></ActionSection>
            <ActionSection
              title='Expiring Subscriptions'
              icon={skull}
            ></ActionSection>
          </div>
          <div className='col-span-1 flex flex-wrap gap-y-3'>
            <ActionSection
              title='Ongoing Services'
              icon={ongoingIcon}
              onClick={handleMoreClick}
              height='h-[210px]'
            >
              {services?.length ? (
                <>
                  {services.slice(0, 3).map((x, index) => (
                    <div
                      key={index}
                      className='border border-1 border-solid px-2 py-1 rounded-[4px] mt-3'
                    >
                      {x?.name}
                    </div>
                  ))}

                  {services.length > 3 && (
                    <div
                      className='text-blue-500 flex justify-center cursor-pointer mt-3'
                      onClick={handleMoreClick}
                    >
                      {services.length - 3} more
                    </div>
                  )}
                </>
              ) : (
                <p className='p-3'>No Service</p>
              )}
            </ActionSection>
          </div>
          <div className='col-span-1 flex flex-wrap gap-y-3'>
            <ActionSection
              title='New Subscribers'
              icon={newSubIcon}
            ></ActionSection>
            <ActionSection title='Offers' icon={offersIcon}></ActionSection>
          </div>
          <div className='col-span-1  flex flex-wrap gap-y-3'>
            <ActionSection
              title='Trend Alerts'
              icon={trendIcon}
            ></ActionSection>
            <ActionSection
              title='Upcoming Engagement'
              icon={leaderboard}
            ></ActionSection>
          </div>
        </div>
      </div>

      <Services
        isOpen={isOpen?.show && isOpen.data == 'New Service'}
        onClose={() =>
          setIsOpen({
            show: false,
            data: '',
          })
        }
      />
      {isOpen?.show && (
        <Business
          isOpen={isOpen?.show && isOpen.data == 'New Batch'}
          onClose={() =>
            setIsOpen({
              show: false,
              data: '',
            })
          }
        />
      )}
    </>
  );
};

export default Home;
