import SVG from 'components/renderSvg';
import React from 'react';
import expense from 'media/svgs/expenses.svg';

const expenses = [
  {
    icon: <SVG icon={expense} />,
    title: 'Rent',
    price: '$623',
  },
  {
    icon: <SVG icon={expense} />,
    title: 'Maintancence',
    price: '$523',
  },
  {
    icon: <SVG icon={expense} />,
    title: 'Utilities',
    price: '$523',
  },
  {
    icon: <SVG icon={expense} />,
    title: 'Subscriptions',
    price: '$123',
  },
  {
    icon: <SVG icon={expense} />,
    title: 'Trainers',
    price: '$243',
  },
  {
    icon: <SVG icon={expense} />,
    title: 'Transport',
    price: '$243',
  },
];

const Expenses = ({ setIsOpen2 }) => {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex items-center space-x-5'>
          <SVG icon={expense} />
          <p>Expenses</p>
        </div>
        <div
          className='bg-[#F7F7F8] p-2 rounded-lg cursor-pointer'
          onClick={() => setIsOpen2({ open: true, data: 'expense' })}
        >
          Manage
        </div>
      </div>
      <div className='grid grid-cols-1 gap-3 mt-4'>
        {expenses.map(d => (
          <div className='col-span-1 border-1 border border-solid p-2 rounded-lg'>
            <div className='flex justify-between item-centers'>
              <div className='flex items-center space-x-4'>
                {/* <div>{d.icon}</div> */}
                <span>{d.title}</span>
              </div>
              <span>{d.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expenses;
