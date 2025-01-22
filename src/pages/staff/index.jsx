import React, { useEffect, useState } from 'react';
import StaffHeader from './components/staffHeader';
import DateRangeComponent from 'components/dateRange';
import TrainerCard from './components/trainerCard';
import Loader from 'components/loader'; // Import a loader component or create one
import dots from 'media/svgs/dots.svg';
import SVG from 'components/renderSvg';
import Modal from 'components/modal';
import InfoSection from './components/InfoSection';
import useCoaches from 'hooks/useCoaches';
import { useSelector } from 'react-redux';
import useCurrentUser from 'hooks/useCurrentUser';
import { doc } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import Feedback from './components/Feedback';

const Staff = () => {
  const [isShow, setIsShow] = useState(false);
  const [trainer, setTrainer] = useState();
  const [userFeedback, setUserFeedback] = useState({
    show: false,
    user: null,
  });
  const { fetchCoachesByVendorRef, error, loading } = useCoaches();
  const [allTrainers, setAllTrainers] = useState([]);

  const { user } = useCurrentUser();
  const currentVenderData = useSelector(state => state.vender.venderData);
  const coachesCollectionRef = `countries/${currentVenderData?.code}/coaches`;

  useEffect(() => {
    const fetchData = async () => {
      const vendorRef = doc(
        db,
        `countries/${currentVenderData?.code}/vendors/${user?.uid}`
      );
      if (user) {
        try {
          const result = await fetchCoachesByVendorRef(
            vendorRef,
            coachesCollectionRef
          );
          if (result.success && result.data?.length) {
            setAllTrainers(result.data);
          } else if (!result.success) {
            console.warn(result.message);
          }
        } catch (error) {
          console.error('Error fetching coaches:', error);
        }
      }
    };

    fetchData();
  }, [user]);

  const toggle = trainer => {
    setTrainer(trainer);
    setIsShow(prev => !prev);
  };

  return (
    <>
      <div className=''>
        {userFeedback?.show ? (
          <Feedback data={userFeedback} setUserFeedback={setUserFeedback} />
        ) : (
          <>
            <StaffHeader />
            <div className='grid grid-cols-12 gap-3 p-2'>
              {/* Trainer Cards Section */}
              <div className='col-span-12 xl:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6'>
                {loading ? (
                  <Loader /> // Render the loader when loading
                ) : (
                  allTrainers.map((trainer, index) => (
                    <TrainerCard
                      {...trainer}
                      key={index}
                      toggle={() => toggle(trainer)}
                      setUserFeedback={setUserFeedback}
                    />
                  ))
                )}
              </div>

              {/* Sidebar Section */}
              <div className='col-span-12 xl:col-span-3 mt-4 md:mt-0'>
                <DateRangeComponent />

                {/* Vacancies Info Box */}
                <div className='border border-solid border-gray-300 rounded-md p-4 mt-4'>
                  <div className='flex justify-between items-center'>
                    <p className='font-semibold'>Your Vacancies</p>
                    <SVG icon={dots} />
                  </div>

                  <div className='flex flex-wrap space-x-4 py-2'>
                    <p>Total 7 Vacancies</p>
                    <p>33 Applicants</p>
                  </div>

                  <div className='my-2 flex flex-wrap'>
                    <p className='p-1 bg-[#F0FAFF] rounded-md text-sm'>
                      BaseBall
                    </p>
                  </div>

                  <hr className='my-2' />

                  <p className='py-2 text-sm text-blue-600 cursor-pointer'>
                    View and approve applicants
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Modal isOpen={isShow} onClose={() => toggle()}>
        <InfoSection trainer={trainer} />
      </Modal>
    </>
  );
};

export default Staff;
