import Button from 'components/button';
// @import Media
import checkCircle from '../../../media/svgs/check-circle.svg';
import SVG from 'components/renderSvg';

const ProfileSectionItem = ({
  index,
  title,
  subTitle,
  btnText,
  handleClick,
  status,
}) => {
  return (
    <li className=' flex justify-between items-center  flex-wrap'>
      <div className=' flex gap-4'>
        <div className=' bg-[#f7f7f8] rounded-full text-dark size-12 flex justify-center items-center text-lg font-medium'>
          {index + 1}
        </div>
        <div>
          <div className='font-medium text-base text-dark'>{title}</div>
          <div className='text-[#6C6C89]'>{subTitle}</div>
        </div>
      </div>
      {status ? (
        <SVG icon={checkCircle} />
      ) : (
        <Button
          title={btnText}
          onClick={handleClick}
          variant={'primary'}
          className='mt-0 sm:mt-3 xs:mt-3'
        />
      )}
    </li>
  );
};

export default ProfileSectionItem;
