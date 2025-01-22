import Button from 'components/button';
import SVG from 'components/renderSvg';

import hall from 'media/svgs/hall.svg';
import square from 'media/svgs/sqaurefeet.svg';
import candidate from 'media/svgs/hallcandidates.svg';

const rooms = [
  { title: 'Room1', value: '150 sq feet', count: '5/30 candidates' },
  { title: 'Room1', value: '150 sq feet', count: '5/30 candidates' },
  { title: 'Room1', value: '150 sq feet', count: '5/30 candidates' },
  { title: 'Room1', value: '150 sq feet', count: '5/30 candidates' },
  { title: 'Room1', value: '150 sq feet', count: '5/30 candidates' },
  { title: 'Room1', value: '150 sq feet', count: '5/30 candidates' },
  { title: 'Room1', value: '150 sq feet', count: '5/30 candidates' },
  { title: 'Room1', value: '150 sq feet', count: '5/30 candidates' },
];

const TrainingHall = () => {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex items-center space-x-5'>
          <SVG icon={hall} />
          <p className='text-primary font-medium'>Training Hall</p>
        </div>
        <Button title='Manage' variant='outline' />
      </div>
      <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-3 my-3'>
        {rooms?.map(x => (
          <div key={x} className='col-span-1'>
            <RoomCard data={x} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingHall;

const RoomCard = ({ data }) => {
  return (
    <div className='border border-solid border-1 p-3 rounded-[8px] '>
      <p className='text-[16px] text-primary font-medium'>{data?.title}</p>
      <div className='flex items-center space-x-3 p-1'>
        <SVG icon={square} />
        <p className='text-[14px]'>{data?.value}</p>
      </div>
      <div className='flex items-center space-x-3 p-1'>
        <SVG icon={candidate} />
        <p className='text-[14px]'>{data?.count}</p>
      </div>
    </div>
  );
};
