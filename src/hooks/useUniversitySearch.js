import { useEffect, useMemo, useState } from 'react';
import { ALL_COUNTRIES } from '../i18n/constants.js';
import { subscribeSiteData } from '../lib/siteData.js';
import { filterUniversities, getUniversities } from '../services/universityService';

export function useUniversitySearch() {
  const [universities, setUniversities] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    country: ALL_COUNTRIES,
    program: '',
  });

  useEffect(() => {
    function refresh() {
      getUniversities().then(setUniversities);
    }
    refresh();
    return subscribeSiteData(refresh);
  }, []);

  const countries = useMemo(
    () => [ALL_COUNTRIES, ...Array.from(new Set(universities.map((item) => item.country))).sort()],
    [universities],
  );

  const filteredUniversities = useMemo(
    () => filterUniversities(universities, filters),
    [universities, filters],
  );

  function updateFilter(name, value) {
    setFilters((current) => ({ ...current, [name]: value }));
  }

  return {
    countries,
    filteredUniversities,
    filters,
    updateFilter,
  };
}
