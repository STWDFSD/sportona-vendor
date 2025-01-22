import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from 'firebaseConfig';

const useUploadFile = () => {
  const uploadFile = async (file, folderPath) => {
    try {
      const fileExtension = file.name.split('.').pop(); // Get the file extension
      const timestamp = Date.now(); // Current timestamp
      const storagePath = `${folderPath}/${timestamp}.${fileExtension}`;
      const storageRef = ref(storage, storagePath);

      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);

      // Get the download URL
      const url = await getDownloadURL(snapshot.ref);

      return { success: true, url };
    } catch (err) {
      console.log(err);
      return { success: false, error: err.message };
    }
  };

  return { uploadFile };
};

export default useUploadFile;
