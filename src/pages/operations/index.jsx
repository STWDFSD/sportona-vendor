import React, { useEffect, useState } from 'react';
import DetailCard from './components/DetailCard';
import LeftCard from './components/leftCard';
import Holidays from './components/holidays';
import SideModal from 'components/modal/SideModal';
import AddNote from './components/addNote';
import editnote from 'media/svgs/editnote.svg';
import user from 'media/svgs/user.svg';
import EditDetails from './components/EditDetails';
import Button from 'components/button';
import useCurrentUser from 'hooks/useCurrentUser';
import useDocument from 'hooks/useDocument';
import toast from 'react-hot-toast';
import TrainingHall from './components/trainingHall';
import Events from './components/events';
import Expenses from './components/expences';
import AddHolidayForm from './components/form/AddHolidayForm';
import AddEventsForm from './components/form/AddEventsForm';
import AddExpenseForm from './components/form/AddExpenseForm';
import beach from 'media/svgs/beach.svg';
import victory from 'media/svgs/victory.svg';
import expence from 'media/svgs/expence.svg';
import useVendor from 'hooks/useVendor';
import { useSelector } from 'react-redux';

const Operations = () => {
  const { user: currentUser } = useCurrentUser();
  const [showform, setShowForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [note, setNote] = useState('');
  const [currentVender, setCurrentVender] = useState({});
  const [isOpen, setIsOpen] = useState({
    open: false,
    data: '',
  });
  const [isOpen2, setIsOpen2] = useState({
    open: false,
    data: '',
  });

  const { fetchVenderById } = useVendor();
  const currentVenderData = useSelector(state => state.vender.venderData);

  const handleAddnote = async () => {
    // const resp = await updateDocument(currentUser.uid, {
    //   note: note,
    // });
    // if (resp.success) {
    //   toast.success('Success:Note Added Successfully');
    //   setNote('');
    //   fetchcurrentUser();
    //   setIsOpen({ open: false, data: '' });
    // } else {
    //   toast.error('Error:an error occure!');
    // }
  };

  const fetchcurrentUser = async () => {
    const venderData = await fetchVenderById(
      `countries/${currentVenderData.code}/vendors`,
      currentVenderData?.code
    );
    setCurrentVender(venderData);
  };

  useEffect(() => {
    if (currentUser?.uid) {
      fetchcurrentUser();
    }
  }, [currentUser]);

  const handleOpenNote = note => {
    setIsOpen({ open: true, data: 'addnote' });
    setNote(note);
  };

  const getTitle = () => {
    if (isOpen2?.data === 'holiday') {
      return 'Holidays';
    }
    if (isOpen2?.data === 'event') {
      return 'Events';
    }
    if (isOpen2?.data === 'expense') {
      return 'Expenses';
    }
  };
  const handleShowForm = () => {
    setShowForm(true);
  };
  const handleShowEventsForm = () => {
    setShowEventForm(true);
  };

  const onClick = () => {
    if (isOpen2?.data === 'holiday') {
      if (showform) {
        handleSaveHoliday();
      } else {
        handleShowForm();
      }
    }
    if (isOpen2?.data === 'event') {
      if (showEventForm) {
        handleSaveEvents();
      } else {
        handleShowEventsForm();
      }
    }
    if (isOpen2?.data === 'expense') {
      handleSaveExpenses();
    }
  };

  const getBtnText = () => {
    if (isOpen2?.data === 'holiday') {
      return showform ? 'Save' : 'Add New Holiday';
    }
    if (isOpen2?.data === 'event') {
      return showEventForm ? 'Save' : 'Add New Event';
    }
    if (isOpen2?.data === 'expense') {
      return 'Save';
    }
  };

  const handleSaveHoliday = () => {
    alert('saves');
  };
  const handleSaveEvents = () => {
    alert('event saved');
  };

  const handleSaveExpenses = () => {
    alert('expenses');
  };
  return (
    <>
      <div className='grid sm:grid-cols-1 lg:grid-cols-2 gap-5 p-5'>
        <div className='col-span-1'>
          <DetailCard setIsOpen={setIsOpen} data={currentVender} />
        </div>
        <div className='col-span-1 flex flex-col space-y-6'>
          <LeftCard
            title='Currently Open'
            subTitle='3 hrs 22mins left to closure'
            setIsOpen={setIsOpen}
          />
          <LeftCard
            title='Profile Note'
            subTitle={currentVender?.note || 'None'}
            note={true}
            onClick={handleOpenNote}
          />
        </div>
      </div>
      <div className='mt-6 px-5 py-2'>
        <TrainingHall />
      </div>
      <div className='grid lg:grid-cols-3 xs:grid-cols-1 gap-4 px-5'>
        <div className='col-span-1'>
          <Holidays setIsOpen2={setIsOpen2} />
        </div>
        <div className='col-span-1'>
          <Events setIsOpen2={setIsOpen2} />
        </div>
        <div className='col-span-1'>
          <Expenses setIsOpen2={setIsOpen2} />
        </div>
      </div>
      <SideModal
        isOpen={isOpen.open}
        onClose={() => setIsOpen({ open: false, data: '' })}
        title={isOpen.data === 'addnote' ? 'Profile Note' : 'Edit details'}
        icon={isOpen.data === 'addnote' ? editnote : user}
        footer={
          <div
            className=' flex justify-center items-end
          '
          >
            <Button
              title='Save'
              variant={'success'}
              className=' w-full bg-black'
              onClick={handleAddnote}
              disabled={note === ''}
            ></Button>
          </div>
        }
      >
        {isOpen.data === 'addnote' && <AddNote setNote={setNote} note={note} />}
        {isOpen.data === 'editdetails' && <EditDetails />}
      </SideModal>

      <SideModal
        isOpen={isOpen2.open}
        onClose={() => {
          setIsOpen2({ open: false, data: '' });
          setShowForm(false);
          setShowEventForm(false);
        }}
        title={getTitle()}
        icon={
          isOpen2.data === 'holiday'
            ? beach
            : isOpen2.data === 'event'
              ? victory
              : expence
        }
        footer={
          <div
            className=' flex justify-center items-end
          '
          >
            <Button
              title={getBtnText()}
              variant={'success'}
              className=' w-full bg-black'
              onClick={onClick}
              isplus={
                isOpen2?.data !== 'expense' && !showform && !showEventForm
              }
              iconRight={true}
            ></Button>
          </div>
        }
      >
        {isOpen2.data === 'holiday' && <AddHolidayForm showform={showform} />}
        {isOpen2.data === 'event' && (
          <AddEventsForm showEventForm={showEventForm} />
        )}
        {isOpen2.data === 'expense' && <AddExpenseForm />}
      </SideModal>
    </>
  );
};

export default Operations;
