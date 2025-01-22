import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'firebaseConfig';

const TrainerComponent = ({ val }) => {
  const [trainerData, setTrainerData] = useState(null);

  useEffect(() => {
    const fetchTrainerData = async () => {
      if (val && val.coachRef && val.coachRef._key) {
        try {
          // Construct document path for the coach
          const docPath = val.coachRef._key.path.segments.slice(5).join('/'); // Skip the first 5 segments

          // Get the document reference for the coach
          const docRef = doc(db, docPath); // Use the 'doc' method from Firebase v10
          const docSnapshot = await getDoc(docRef); // Use 'getDoc' to retrieve the document

          if (docSnapshot.exists()) {
            // Check if the document exists
            setTrainerData(docSnapshot.data()); // Set the trainer data
          } else {
            console.error('No trainer data found');
          }
        } catch (error) {
          console.error('Error fetching trainer data:', error);
        }
      }
    };

    fetchTrainerData();
  }, [val]); // Dependency array to re-run the effect when 'val' changes

  if (!trainerData) {
    return (
      <div className='flex items-center mx-auto justify-center w-full space-x-2'>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className='flex items-center mx-auto justify-center w-full space-x-2'>
      <div className='w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold'>
        {trainerData.name?.charAt(0).toUpperCase() || 'A'}
      </div>
      <div className='text-black text-start'>{trainerData.name}</div>
    </div>
  );
};

export default TrainerComponent;
