import React, { useState } from 'react';
import SVG from 'components/renderSvg';
import InputField from 'components/inputField';
import back from 'media/svgs/back.svg';
import feedIcon from 'media/svgs/feedbtn.svg';

const Feedback = ({ data, setUserFeedback }) => {
  const [feedbackValue, setFeedbackValue] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);

  const handleAddFeedback = () => {
    if (feedbackValue.trim()) {
      const feedbackData = {
        message: feedbackValue,
        timestamp: new Date(),
      };
      setFeedbacks(prev => [...prev, feedbackData]);
      setFeedbackValue('');
    }
  };

  const GoBack = () => (
    <div className='flex items-center space-x-2'>
      <SVG
        icon={back}
        className='cursor-pointer'
        onClick={() => setUserFeedback({ show: false, data: null })}
      />
      <p>Feedbacks</p>
    </div>
  );

  return (
    <div className='h-[80vh] flex flex-col relative'>
      <GoBack />
      <div className='flex-1 flex flex-col px-[380px] pb-[100px]'>
        <AllFeedbacks feedbacks={feedbacks} />
      </div>
      <div className='pl-[380px] pr-[650px] fixed bottom-4 w-full z-20'>
        <div className='flex items-center space-x-3'>
          <InputField
            placeholder='Enter Feedback'
            onChange={e => setFeedbackValue(e.target.value)}
            value={feedbackValue}
          />
          <SVG
            icon={feedIcon}
            className='cursor-pointer mt-[-20px]'
            onClick={handleAddFeedback}
          />
        </div>
      </div>
    </div>
  );
};

export default Feedback;

const AllFeedbacks = ({ feedbacks }) => {
  const formatTimestamp = timestamp => {
    const feedbackDate = new Date(timestamp);
    const today = new Date();
    const isToday = feedbackDate.toDateString() === today.toDateString();
    if (isToday) {
      return `Today, ${feedbackDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    }
    return feedbackDate.toLocaleDateString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='flex-1 flex flex-col py-4 space-y-3 overflow-y-auto'>
      {feedbacks?.length ? (
        feedbacks.map((feedback, index) => (
          <>
            <span className='text-xs text-center text-gray-500'>
              {formatTimestamp(feedback.timestamp)}
            </span>

            <div
              key={index}
              className='p-3 bg-gray-200 rounded-lg shadow-sm flex flex-col space-y-1'
            >
              <p>{feedback.message}</p>
            </div>
          </>
        ))
      ) : (
        <p className='text-gray-500 text-center'>No feedbacks yet!</p>
      )}
    </div>
  );
};
