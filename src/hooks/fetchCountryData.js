const fetchCountryData = async countryName => {
  if (!countryName) {
    return { countryCode: '', countryISOCode: '', currency: '' };
  }

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const data = await response.json();

    if (data && data[0]) {
      const countryCode = data[0].idd?.root + (data[0].idd?.suffixes[0] || '');
      const countryISOCode = data[0].cca2; // ISO Alpha-2 code
      const currency = Object.keys(data[0].currencies || {})[0] || ''; // Currency code

      return { countryCode, countryISOCode, currency };
    } else {
      return { countryCode: '', countryISOCode: '', currency: '' };
    }
  } catch (error) {
    console.error('Error fetching country data:', error);
    return { countryCode: '', countryISOCode: '', currency: '' }; // Fallback values
  }
};

export default fetchCountryData;
