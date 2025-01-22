import React, { useMemo, useState } from 'react';
//@import components
import SVG from 'components/renderSvg';
import SearchBar from 'components/searchInput';
//@import media
import next from 'media/svgs/next.svg';
import prev from 'media/svgs/prev.svg';

import emailIcon from 'media/svgs/email.svg';
//@import styles
import styles from './index.module.scss';
import Button from 'components/button';

const ActionCell = (row, col, onClick) => {
  const { type = '' } = col;

  return (
    <div className='flex space-x-[21px]'>
      {type === 'subscription' && (
        <Button
          variant='outline'
          title='Email Remainder'
          onClick={() => onClick(row, col)}
          icon={<SVG icon={emailIcon} />}
        />
      )}
      {/* {showDelete ? (
        <div
          className='flex cursor-pointer items-center gap-2'
          onClick={() => onDelete(row.id)}
        >
          <SVG icon={deleteIcon} className='h-[20px] w-[18px]' />
          <span>Delete</span>
        </div>
      ) : null}
      {showEdit ? (
        <div
          className='flex cursor-pointer items-center gap-2'
          onClick={() => onEdit(row)}
        >
          <SVG icon={editIcon} />
          <span>Edit</span>
        </div>
      ) : null} */}
    </div>
  );
};

const Table = ({
  data,
  query,
  onEdit,
  columns,
  onDelete,
  onClick,
  onSearch,
  onPaginate,
  search = true,
  textCenter = true,
  isPagination = true,
  handleRowClick,
}) => {
  const currentPage = (query?.pageNumber || 0) + 1;

  const [searchVal, setSearchVal] = useState('');
  const totalPages = Math.ceil(query?.count / query?.size) || 1;

  const paginate = pageNumber => {
    onPaginate({ pageNumber: pageNumber - 1 });
  };

  const handleSearchValue = e => {
    setSearchVal(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(searchVal?.trim());
  };

  const onResetSearch = () => {
    setSearchVal('');
    onSearch('');
  };

  const btnList = useMemo(() => {
    if (totalPages <= 1) return null;
    const totalBtn = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        totalBtn.push(i);
      }
    } else {
      if (currentPage === 1) {
        totalBtn.push(1, 2, 3, '...', totalPages);
      } else if (currentPage === 2) {
        totalBtn.push(1, 2, 3, '...', totalPages);
      } else if (currentPage === 3) {
        totalBtn.push(
          1,
          2,
          3,
          '...',
          currentPage + 1,
          currentPage + 2,
          currentPage + 3,
          '...',
          totalPages
        );
      } else if (currentPage < totalPages - 1) {
        totalBtn.push(
          1,
          2,
          3,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages
        );
      } else {
        totalBtn.push(
          1,
          2,
          3,
          '...',
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      }
    }

    return totalBtn;
  }, [currentPage, totalPages]);

  const customRender = (row, col) => {
    if (col?.renderCell) {
      return col?.renderCell(row[col?.dataIndex], row);
    }
    return row[col?.dataIndex];
  };

  return (
    <section className=''>
      {search && (
        <SearchBar
          value={searchVal}
          onChange={handleSearchValue}
          handleClear={onResetSearch}
          onSubmit={handleSubmit}
        />
      )}

      <div
        className={`size-full overflow-x-auto pb-[50px] ${styles.tableWrapper}`}
      >
        <table className='mb-4 min-w-full break-words bg-white'>
          <thead>
            <tr>
              {columns?.map(col => (
                <th
                  key={col.key}
                  className='whitespace-nowrap border-b border-gray-200 bg-[#F7F7F9] px-4 py-3  text-center text-xs font-bold uppercase tracking-wider text-gray-600'
                >
                  {col?.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data?.length ? (
              data?.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className='bg-white cursor-pointer'
                  onClick={() => handleRowClick(row)}
                >
                  {columns?.map(col => (
                    <td
                      key={col?.key}
                      className={`px-4 py-3  ${
                        rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#F7F7F9]'
                      } whitespace-nowrap border-b border-gray-200 ${
                        textCenter ? 'text-center' : 'text-start'
                      }`}
                    >
                      {col?.key === 'action' ? (
                        <>{ActionCell(row, col, onClick)}</>
                      ) : (
                        <>{customRender(row, col)}</>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns?.length}>
                  <span className='text-md flex items-center justify-center py-2 text-center font-medium'>
                    {' '}
                    No Data Found.
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {totalPages > 1 && isPagination ? (
          <div
            className={`absolute flex py-1 xs:left-[10%] sm:left-[40%] ${currentPage < 3 ? 'md:left-1/2' : 'left-[45%]'} `}
          >
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`mx-2 flex size-[32px] items-center  justify-center border border-solid border-[#DFE3E8] ${
                currentPage === 1
                  ? 'bg-[#919EAB] text-white opacity-[50%]'
                  : 'bg-none text-gray-400'
              } rounded-[4px]`}
            >
              <SVG icon={prev} />
            </button>
            {btnList?.map((page, index) => (
              <button
                key={index}
                onClick={() => {
                  if (page !== '...') {
                    paginate(page);
                  }
                }}
                className={`mx-2 flex size-[32px]  ${page > 1000 ? 'w-[40px] ' : 'size-[32px]'} items-center justify-center overflow-hidden border border-solid text-[14px] font-[700] ${
                  currentPage === page ? 'border-primary' : 'border-[#DFE3E8]'
                } rounded-[4px]`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`mx-2 flex size-[32px] items-center justify-center border border-solid border-[#DFE3E8] ${
                currentPage === totalPages
                  ? 'bg-[#919EAB] text-white opacity-[50%]'
                  : 'bg-none text-gray-400'
              } rounded-[4px]`}
            >
              <SVG icon={next} />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Table;
