const ProfileInputItem = ({ label, desc, children, isLast = false, error }) => {
  return (
    <div>
      <div className='text-dark font-medium text-base mt-3'>{label}</div>
      <div className='text-[#6c6c89]  text-base'>{desc}</div>
      <div className=' mt-2'>{children}</div>
      {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
    </div>
  );
};

export default ProfileInputItem;
