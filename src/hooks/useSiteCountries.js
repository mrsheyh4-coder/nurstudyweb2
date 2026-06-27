import { useEffect, useState } from 'react';
import { getCountriesResolved, subscribeSiteData } from '../lib/siteData.js';

export function useSiteCountries() {
  const [countries, setCountries] = useState(() => getCountriesResolved());

  useEffect(() => {
    function refresh() {
      setCountries(getCountriesResolved());
    }
    refresh();
    return subscribeSiteData(refresh);
  }, []);

  return countries;
}
