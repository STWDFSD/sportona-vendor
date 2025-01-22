import Button from 'components/button';
import SelectButton from 'components/button/selectButton';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setChallangeOption } from 'store/slices/challengeSlice';
const options = ['Daily', 'Monthly', 'Yearly'];
const options2 = ['All', 'Single'];
const options3 = ['Internal Only', 'External Only'];

const ChallengeHeader = ({ setModalData }) => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [selectedIndex2, setSelectedIndex2] = useState(1);
  const [selectedIndex3, setSelectedIndex3] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector(state => state.challenges);

  useEffect(() => {
    dispatch(
      setChallangeOption({
        session: options[selectedIndex],
        status: options3[selectedIndex3],
        allorsingle: options2[selectedIndex2],
      })
    );
  }, [selectedIndex, selectedIndex2, selectedIndex3]);

  const handleOpenChallenge = () => {
    if (status === 'External Only') {
      setModalData({ isOpen: true, data: 'external' });
    } else {
      setModalData({ isOpen: true, data: 'internal' });
    }
  };

  return (
    <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center my-4 space-y-4 lg:space-y-0'>
      {/* Select buttons container */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3'>
        <SelectButton
          options={options}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <SelectButton
          options={options2}
          selectedIndex={selectedIndex2}
          setSelectedIndex={setSelectedIndex2}
        />
        <SelectButton
          options={options3}
          selectedIndex={selectedIndex3}
          setSelectedIndex={setSelectedIndex3}
          width='160px'
        />
      </div>

      {/* Buttons container */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3'>
        <Button
          title='New Challenge'
          isplus
          variant='primary'
          onClick={handleOpenChallenge}
        />
        <Button
          title='Challenge Received'
          variant='outline'
          onClick={() => navigate('/challenges/recieve-challenges')}
        />
      </div>
    </div>
  );
};

export default ChallengeHeader;
