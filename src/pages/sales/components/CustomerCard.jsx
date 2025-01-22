import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'components/button';
import SVG from 'components/renderSvg';
import closeIcon from '../../../media/svgs/close.svg';
import refreshIcon from '../../../media/svgs/refresh.svg';
import crossIcon from '../../../media/svgs/cross.svg';
import forbidIcon from '../../../media/svgs/forbid.svg';
import sendIcon from '../../../media/svgs/send.svg';
import InputField from 'components/inputField';
import { getRelativeTime } from 'utils';
import TextareaField from 'components/textareaField';
import { schema } from 'schema';
import useDocument from 'hooks/useDocument';
import { Timestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

const CustomerCard = item => {
  const {
    userDetails,
    serviceDetails,
    batchDetails,
    activtyDetails,
    baseRef,
    id,
    refetchData,
  } = item;

  const collectionRef = `${baseRef}/bids`;
  const { updateDocument } = useDocument(collectionRef);
  const [counter, setCounter] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      quote: '',
      offeredPrice: '',
    },
  });

  const onSubmit = async data => {
    setCounter(false);

    const obj = {
      vendorResponded: data?.quote,
      finalOffer: data.offeredPrice,
      status: 'Vendor responded',
      updatedOn: Timestamp.now().toMillis(),
    };

    try {
      await updateDocument(id, obj);
      toast.success('Response submitted successfully!');
      refetchData();
    } catch (error) {
      console.error('Error updating document:', error);
      toast.error('Failed to submit the response. Please try again.');
    }
  };

  const handleAccept = async () => {
    const obj = {
      status: 'Accepted',
      updatedOn: Timestamp.now().toMillis(),
    };

    try {
      await updateDocument(id, obj);
      toast.success('Request accepted successfully!');
      refetchData();
    } catch (error) {
      console.error('Error updating document:', error);
      toast.error('Failed to accept the request. Please try again.');
    }
  };

  const handleReject = async () => {
    const obj = {
      status: 'Rejected',
      updatedOn: Timestamp.now().toMillis(),
    };

    try {
      await updateDocument(id, obj);
      toast.success('Request rejected successfully!');
      refetchData();
    } catch (error) {
      console.error('Error updating document:', error);
      toast.error('Failed to reject the request. Please try again.');
    }
  };

  return (
    <div className='border border-1 border-solid broder-gray-200 rounded-[5px]'>
      <div className='flex justify-between items-center mb-4 p-4'>
        <div className='flex items-center space-x-4'>
          <div className='w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold'>
            <img
              src={userDetails?.photoURL}
              alt={userDetails?.firstname}
              className='size-12 rounded-full'
            />
          </div>
          <div>
            <p className='font-medium text-lg'>{userDetails?.username}</p>
            <p className='text-sm text-gray-500'>{userDetails?.email}</p>
          </div>
        </div>
        <p className='space-x-2'>
          <span className='text-[#A9A9BC] font-medium text-base'>
            {item?.price?.symbol} {batchDetails?.price?.price}
          </span>
          <span className='text-[#A9A9BC] font-medium text-base'>{'>'}</span>
          <span className='text-[##121217] font-medium text-base'>
            {item?.price?.symbol} {item?.offerdPrice}
          </span>
        </p>
      </div>
      <div className='flex items-center space-x-3 text-gray-600 mt-5 px-4'>
        <p className='bg-green-100 p-[3px] rounded-md flex items-center gap-1'>
          <img
            src={activtyDetails?.icon}
            alt={activtyDetails?.nameEn}
            className='size-6 rounded-full'
          />
          {activtyDetails?.nameEn}
        </p>
        <p>{batchDetails?.name}</p>
        <p>{batchDetails?.code}</p>
      </div>
      <p className='text-sm text-gray-500 mt-5 px-5'>{item?.reason}</p>
      {item?.status === 'Pending' ? (
        !counter ? (
          <div className='flex w-full mt-4'>
            <Button
              title='Accept'
              variant='outline'
              className='border border-t border-l flex-1 rounded-none'
              onClick={handleAccept}
            />
            <Button
              title='Counter'
              variant='outline'
              className='border border-t border-l flex-1 rounded-none'
              onClick={() => setCounter(true)}
            />
            <Button
              title=''
              variant='outline'
              icon={<SVG icon={forbidIcon} />}
              className='border border-t border-l flex-1 rounded-none'
              onClick={handleReject}
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className='my-5 px-5'>
            <TextareaField
              name='quote'
              placeholder='Your quotes... max 200 characters.'
              error={errors?.quote?.message}
              register={register}
            />
            <div className='flex my-4 gap-3'>
              <InputField
                name='offeredPrice'
                placeholder={`${item?.price?.symbol ?? ''}-${item?.offerdPrice ?? ''}`}
                error={errors?.offeredPrice?.message}
                register={register}
                className='flex-1'
                height='40px'
              />
              <Button
                title='Send Counter Offer'
                variant='primary'
                icon={<SVG icon={sendIcon} />}
                iconRight={true}
                type='submit'
              />
              <Button
                title=''
                icon={<SVG icon={crossIcon} className='text-[#8A8AA3]' />}
                onClick={() => setCounter(false)}
              />
            </div>
          </form>
        )
      ) : item?.status === 'Rejected' ? (
        <div className='flex w-full mt-4 border-t flex-1 px-4 py-2 bg-[#F7F7F8]'>
          <div className='flex gap-2 items-center'>
            <SVG icon={closeIcon} />
            <span>Rejected</span>
            <span className='text-[#6C6C89] text-sm leading-6'>
              {getRelativeTime(item?.updatedOn)}
            </span>
          </div>
        </div>
      ) : item?.status === 'Vendor responded' && item?.finalOffer ? (
        <div className='flex w-full mt-4 border-t flex-1 px-4 py-2 bg-[#F7F7F8]'>
          <div className='flex gap-2 items-center'>
            <SVG icon={refreshIcon} />
            <span>Counter Offer</span>
            <span className='text-[#6C6C89] text-sm leading-6'>
              {'( Pending )'}
            </span>

            <span className='text-[#6C6C89] text-sm leading-6'>
              {getRelativeTime(item?.updatedOn)}
            </span>
          </div>
        </div>
      ) : item?.status === 'Approved' && item?.finalOffer ? (
        <div className='flex w-full mt-4 border-t flex-1 px-4 py-2 bg-[#F7F7F8]'>
          <div className='flex gap-2 items-center'>
            <SVG icon={refreshIcon} />
            <span>Counter Offer</span>
            <span className='text-[#6C6C89] text-sm leading-6'>
              {'(Accepted by Customer)'}
            </span>

            <span className='text-[#6C6C89] text-sm leading-6'>
              {getRelativeTime(item?.updatedOn)}
            </span>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default CustomerCard;
