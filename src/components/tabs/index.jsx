import SVG from 'components/renderSvg';
import styles from './index.module.scss';

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div>
      {/* Tabs Navigation */}
      <div
        className={` ${styles.wrapper} border-b border-gray-300 overflow-auto`}
      >
        <nav className='flex space-x-12'>
          {tabs?.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 flex items-center  ${
                activeTab?.name === tab?.name
                  ? 'border-b-2 border-green-500 text-green-500'
                  : 'text-gray-500'
              }`}
              onClick={() => {
                setActiveTab(tab);
              }}
            >
              <SVG icon={tab?.icon} className='mr-3' />
              {tab?.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Tabs;
