import React from 'react';
import CustomerCard from '../components/CustomerCard';
import back from 'media/svgs/back.svg';
import SVG from 'components/renderSvg';
import { useNavigate } from 'react-router-dom';
import { customerData } from '../components/data';

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

const CustomerOffers = () => {
    const navigate = useNavigate();


    return (
        <div className="p-6 mx-auto">
            <GoBack />
            <div className="grid mt-4 p-2 md:grid-cols-2 xs:grid-cols-1 gap-6">
                {customerData.map((offer, index) => (
                    <CustomerCard key={index} {...offer} />
                ))}
            </div>
        </div>
    );
};

export default CustomerOffers;