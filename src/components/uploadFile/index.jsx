import React from 'react';
import uploadIcon from '../../media/svgs/file.svg';
import SVG from 'components/renderSvg';

const FileUpload = ({
  width = 'w-64',
  height = 'h-48',
  setValue,
  register,
  coverImg,
  accept = '',
  name,
  hidden = false, // New prop to conditionally hide the component
}) => {
  // Set dynamic height based on the `hidden` prop
  const computedHeight = hidden ? 'h-0' : height;

  return (
    <div
      className={`flex items-center justify-center ${width} ${computedHeight} cursor-pointer rounded-lg border-2 border-dashed border-gray-300 transition-all duration-300 overflow-hidden ${
        hidden ? 'invisible' : ''
      }`}
      onClick={() => document.getElementById('file-input').click()}
    >
      <input
        type='file'
        id='file-input'
        accept={accept}
        className='hidden'
        {...register(name)}
        onChange={setValue}
      />
      <div
        className={`flex flex-col items-center justify-center gap-3 text-center transition-opacity duration-300 ${
          hidden ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <SVG icon={uploadIcon} />
        <p className='mt-2 text-[14px] font-[400] text-gray-600'>
          Drag & Drop your file here or click to upload
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
