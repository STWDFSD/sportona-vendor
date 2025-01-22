import React from 'react';
import ExpenseField from './expenseField';

const AddExpenseForm = () => {
  return (
    <div>
      <p className='text-secondary'>
        List down the general monthly expenses that you will incur to assess the
        cost of the business. These does not have to be changed on the regular
        unless a drastic change in the amount is made.
      </p>

      <div className='flex flex-col space-y-3 mt-5'>
        <div className='flex justify-between items-center'>
          <div className='flex-1'>
            <p>Rental</p>
          </div>
          <div className='flex-1'>
            <ExpenseField />
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex-1'>
            <p>Maintenance</p>
          </div>
          <div className='flex-1'>
            <ExpenseField />
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex-1'>
            <p>Internet</p>
          </div>
          <div className='flex-1'>
            <ExpenseField />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseForm;
