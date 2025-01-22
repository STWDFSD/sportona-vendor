import React from 'react';

const AddNote = ({ note, setNote }) => {
  return (
    <div className='flex flex-col space-y-2 relative h-full '>
      <p className='text-[16px] text-primary font-medium'>
        What is “Profile Note”?
      </p>
      <p className='text-[16px] text-primary font-normal'>
        It’s a message which will be shown to the visitors on your profile page.
        For example if your service is under maintenance and you have set the
        facility to be closed. Then you should let the visitors know why it’s
        closed.
      </p>
      <textarea
        className='rounded-[10px] border-1 border-solid border p-2 outline-none mt-5'
        placeholder='Max 80 words...'
        rows={10}
        onChange={e => setNote(e.target.value)}
        value={note}
      ></textarea>
    </div>
  );
};

export default AddNote;
