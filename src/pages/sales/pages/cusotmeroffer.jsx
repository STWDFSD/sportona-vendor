import SVG from 'components/renderSvg';
import React, { useEffect, useState } from 'react';
import back from 'media/svgs/back.svg';
import { useNavigate } from 'react-router-dom';
import CustomerCard from '../components/CustomerCard';
import { customerData } from '../components/data';
import { useSelector } from 'react-redux';
import { doc } from 'firebase/firestore';
import useOffers from 'hooks/useOffers';
import { db } from 'firebaseConfig';

const GoBack = () => {
  const navigate = useNavigate();
  return (
    <div className='flex items-center space-x-3'>
      <SVG
        icon={back}
        className='cursor-pointer'
        onClick={() => navigate(-1)}
      />
      <p>Customer Offers</p>
    </div>
  );
};

const Custmeroffer = () => {
  const currentVenderData = useSelector(state => state?.vender?.venderData);
  const { code, id } = currentVenderData;
  const baseRef = `countries/${code}`;
  const vendorRef = doc(db, `${baseRef}/vendors/${id}`);
  const collectionName = `${baseRef}/bids`;
  const [refetchData, setRefetchData] = useState(false);

  const [totalCustomOffers, setTotalCustomOffers] = useState([]);
  const { getAllOffersWithDetails } = useOffers();

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getAllOffersWithDetails(vendorRef, collectionName);
      setTotalCustomOffers(resp);
    };

    fetchData();
  }, [refetchData]);
  return (
    <div>
      <GoBack />
      <div className='grid mt-4 p-2 md:grid-cols-2 xs:grid-cols-1 gap-6'>
        {totalCustomOffers?.map((customer, index) => (
          <CustomerCard
            key={index}
            {...customer}
            baseRef={baseRef}
            refetchData={() => setRefetchData(!refetchData)}
          />
        ))}
      </div>
    </div>
  );
};

export default Custmeroffer;
