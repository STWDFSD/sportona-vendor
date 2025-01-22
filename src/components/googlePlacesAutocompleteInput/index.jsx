import React, { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import InputField from 'components/inputField';
import SVG from 'components/renderSvg';
import pinIcon from '../../media/svgs/pin.svg';

const GooglePlacesAutocompleteInput = ({
  name,
  errors,
  setValue,
  getValues,
}) => {
  const [places, setPlaces] = useState([]);

  // Google API setup
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDw489r2t-26bMGACOViOlPWCF6zxMIGuw', // Replace with your actual API key
    libraries: ['places'],
  });

  const handleAddressChange = event => {
    const value = event.target.value;
    setValue(name, value); // Update the form value

    if (value.length > 2) {
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions({ input: value }, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaces(predictions);
        }
      });
    } else {
      setPlaces([]); // Clear suggestions if input length is <= 2
    }
  };
  const handleSelectPlace = async place => {
    setValue(name, place.description); // Update the form value

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: place.description }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const result = results[0];
        const countryData = result.address_components.find(component =>
          component.types.includes('country')
        );

        setValue('countryCode', countryData?.short_name);
        setValue('countryISOCode', countryData?.long_name);
        setValue('latitude', result.geometry.location.lat());
        setValue('longitude', result.geometry.location.lng());
        setValue('location', place.description);
        setPlaces([]);
      }
    });
  };

  if (loadError) {
    return <div>Error loading Google Places API</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className='relative'>
      <InputField
        type='text'
        placeholder='Street address here'
        height='40px'
        name={name}
        value={getValues(name)} // Get current value from react-hook-form
        onChange={handleAddressChange} // Update value on input change
        error={errors?.[name]?.message}
        icon={<SVG icon={pinIcon} />}
      />
      {places.length > 0 && (
        <ul className='absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg'>
          {places.map(place => (
            <li
              key={place.place_id}
              onClick={() => handleSelectPlace(place)}
              className='px-4 py-2 cursor-pointer hover:bg-gray-100'
            >
              {place.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GooglePlacesAutocompleteInput;
