import Tabs from 'components/tabs';
import React, { useEffect, useMemo, useState } from 'react';
import cricket from 'media/svgs/cricket.svg';
import football from 'media/svgs/football.svg';
import baseball from 'media/svgs/baseball.svg';
import basketball from 'media/svgs/basketball.svg';
import badminton from 'media/svgs/badminton.svg';
import golf from 'media/svgs/golf.svg';
import InfoSection from './components/infoSection';
import person from 'media/svgs/person.svg';
import revenue from 'media/svgs/revenue.svg';
import clock from 'media/svgs/clock.svg';
import bidsMoney from 'media/svgs/giving-money.svg';
import SVG from 'components/renderSvg';
import Table from 'components/table';
import { data } from './components/data';
import Button from 'components/button';
import sort from 'media/svgs/sort.svg';
import filter from 'media/svgs/filter.svg';
import Business from 'pages/setup/pages/business';
import EditServiceModal from '../setup/pages/editServices';
import { useSelector } from 'react-redux';
import useBatch from 'hooks/useBatch';
import useVendor from 'hooks/useVendor';
import useCurrentUser from 'hooks/useCurrentUser';
import { doc } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import TrainerComponent from './components/TrainerComponent';
import useService from 'hooks/useService';
import BatchInfo from 'pages/batchinfo/batchInfo';

const tabsData = [
  { icon: cricket, title: 'Cricket' },
  { icon: football, title: 'Football' },
  { icon: baseball, title: 'BaseBall' },
  { icon: basketball, title: 'BasketBall' },
  { icon: badminton, title: 'Badminton' },
  { icon: golf, title: 'Golf' },
];

const columns = [
  { title: 'No', dataIndex: 'no', key: 'no' },
  { title: 'Batch Name', dataIndex: 'name', key: 'name' },
  {
    title: 'Timing',
    dataIndex: 'timing',
    renderCell: (_, record) => (
      <span>{`${record.startTiming || 'TBD'} - ${record.endTiming || 'TBD'}`}</span>
    ),
  },
  {
    title: 'Trainer',
    dataIndex: 'trainer',
    key: 'trainer',
    renderCell: (_, record) => <TrainerComponent val={record} />,
  },
  {
    title: 'Candidates',
    dataIndex: 'nbreOfCandidates',
    key: 'nbreOfCandidates',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    renderCell: (_, record) => {
      const { nbreOfCandidates, nbreOfReserved } = record;

      let status;
      if (nbreOfReserved >= nbreOfCandidates) {
        status = 'Full';
      } else if (nbreOfReserved >= nbreOfCandidates * 0.75) {
        status = 'Limited';
      } else {
        status = 'Available';
      }

      const statusClass = {
        Full: 'bg-red-100 text-red-800',
        Limited: 'bg-yellow-100 text-yellow-800',
        Available: 'bg-green-100 text-green-800',
      };

      return (
        <span className={`p-2 rounded ${statusClass[status]}`}>{status}</span>
      );
    },
  },
];

const Services = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openBatch, setOpenBatch] = useState(false);
  const [services, setServices] = useState([]);
  const [activeTab, setActiveTab] = useState();
  const [allBatchs, setAllBatchs] = useState([]);
  const currentVenderData = useSelector(state => state.vender.venderData);
  const { fetchServicesByVendor } = useVendor(
    `countries/${currentVenderData?.code}/services`
  );
  const { user } = useCurrentUser();
  const [selectedBatch, setSelectedBatch] = useState(null);

  const handleRowClick = item => {
    setSelectedBatch(item);
    setOpenBatch(true);
  };

  useEffect(() => {
    if (user && currentVenderData?.code) {
      const vendorRef = doc(
        db,
        `countries/${currentVenderData?.code}/vendors/${user?.uid}`
      );

      const fetchData = async () => {
        const resp = await fetchServicesByVendor(vendorRef);
        if (resp?.success) {
          const fetchedServices = resp?.data;

          const servicesWithIcons = fetchedServices?.length
            ? fetchedServices.map(service => {
                const matchedTabData = tabsData?.find(tab => {
                  const normalizedTabTitle = tab.title
                    .toLowerCase()
                    .replace(/\s+/g, '');
                  const normalizedServiceName = service.name
                    .toLowerCase()
                    .replace(/\s+/g, '');

                  return normalizedTabTitle === normalizedServiceName;
                });

                return {
                  ...service,
                  icon: matchedTabData?.icon,
                };
              })
            : [];
          setServices(servicesWithIcons);
        }
      };

      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (services?.length) {
      setActiveTab(services[0]);
    }
  }, [services]);

  const { fetchBatchesByService, loading, error } = useBatch(
    `countries/${currentVenderData?.code}/batchs`
  );

  const serviceRef = doc(
    db,
    `countries/${currentVenderData?.code}/services/${activeTab?.id}`
  );

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetchBatchesByService(serviceRef);
      if (resp?.success) {
        setAllBatchs(resp?.data);
      } else {
        setAllBatchs([]);
      }
    };
    if (activeTab?.id) {
      fetchData();
    }
  }, [activeTab?.id]);

  const icon = useMemo(() => {
    const filterdata = tabsData?.find(x => x?.title === activeTab?.name);
    return filterdata?.icon;
  }, [activeTab]);

  return (
    <>
      <div>
        <Tabs
          tabs={services}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TopSection
          icon={icon}
          activeTab={activeTab}
          serviceRef={serviceRef}
          currentVenderData={currentVenderData}
        />
        <div className='my-10 flex justify-between items-center px-2 flex-wrap '>
          <div className='flex items-center space-x-2'>
            <Button
              isplus
              title='Add Batch'
              variant={'success'}
              onClick={() => setIsOpen('Add Batch')}
            />
          </div>
          <div className='flex items-center space-x-2 sm:mt-0 xs:mt-3'>
            <div className='flex items-center justify-center space-x-2 border border-solid border-1 rounded-[10px] w-[93px] h-[32px]'>
              <p>Sort</p>
              <SVG icon={sort} />
            </div>

            <div className='flex items-center justify-center  space-x-2 border border-solid border-1 rounded-[10px] w-[93px] h-[32px]'>
              <p>Filter</p>
              <SVG icon={filter} />
            </div>
          </div>
        </div>
        <Table
          data={allBatchs?.map((batch, index) => ({ ...batch, no: index + 1 }))}
          columns={columns}
          search={false}
          handleRowClick={item => handleRowClick(item)}
        />
      </div>

      <Business
        title={isOpen}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      {selectedBatch && (
        <BatchInfo
          batch={selectedBatch}
          isOpen={openBatch}
          onClose={() => setOpenBatch(false)}
          currentVenderData={currentVenderData}
        />
      )}
    </>
  );
};

export default Services;

const TopSection = ({ activeTab, serviceRef, currentVenderData }) => {
  const [open, setOpen] = useState(false);
  const [activeTraineesCount, setActiveTraineesCount] = useState();
  const [revenue, setRevenue] = useState();
  const [totalBids, setTotalBids] = useState();
  const { countActiveTraineesInService, countBidsForService } = useService();
  const collectionRef = `countries/${currentVenderData?.code}/purchasedServices`;
  const bidsCollectionRef = `countries/${currentVenderData?.code}/bids`;

  useEffect(() => {
    const fetchData = async () => {
      if (serviceRef) {
        try {
          const result = await countActiveTraineesInService(
            serviceRef,
            collectionRef
          );
          if (result.success) {
            setActiveTraineesCount(result.count);
            setRevenue(result?.revenue);
          } else {
            console.error('Error fetching active trainees:', result.error);
          }

          const bidsResult = await countBidsForService(
            serviceRef,
            bidsCollectionRef
          );
          if (bidsResult.success) {
            setTotalBids(bidsResult.count);
          } else {
            console.error('Error fetching bids:', bidsResult.error);
          }
        } catch (error) {
          console.error('Error in fetchData:', error);
        }
      }
    };

    fetchData();
  }, [serviceRef]);

  return (
    <>
      <EditServiceModal
        isOpen={open}
        onClose={() => setOpen(false)}
        isEdit={true}
        serviceId={activeTab?.id}
        existingService={activeTab}
      />
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-2 mt-8'>
        <div className='col-span-1 border border-solid rounded-[10px] w-[96%] h-auto p-4'>
          <div className='flex justify-between items-center'>
            {activeTab?.icon && <SVG icon={activeTab?.icon} />}
            <button
              className='p-2 bg-[#ebe9e9] text-primary rounded-[7px]'
              onClick={() => setOpen(true)}
            >
              Edit Service
            </button>
          </div>
          <div className='p-1 flex flex-col gap-y-2'>
            <p className='font-medium text-primary text-[20px]'>
              {activeTab?.name}
            </p>
            <p className='text-[#6C6C89] text-[14px]'>
              {activeTab?.descriptionEn}
            </p>
          </div>
          <div className='flex space-x-3 mt-8'>
            <button className='p-2 bg-[#F7F7F8] text-primary rounded-[7px]'>
              # Outdoor
            </button>
            <button className='p-2 bg-[#F7F7F8] text-primary rounded-[7px]'>
              # Competitive
            </button>
          </div>
        </div>
        <div className='col-span-1 w-[96%] grid grid-cols-1 md:grid-cols-2 gap-2'>
          <div className='col-span-1 flex flex-col space-y-3'>
            <InfoSection
              count={activeTraineesCount}
              text={'Total active trainees'}
              icon={person}
            />
            <InfoSection text={'Peak Time'} icon={clock} />
          </div>

          <div className='col-span-1 flex flex-col space-y-3'>
            <InfoSection
              count={`$ ${revenue}`}
              text={'Revenue so far'}
              icon={revenue}
            />
            <InfoSection
              text={'Bids so far'}
              count={totalBids}
              icon={bidsMoney}
            />
          </div>
        </div>
      </div>
    </>
  );
};
