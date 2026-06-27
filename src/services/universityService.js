import { ALL_COUNTRIES } from '../i18n/constants.js';
import { getUniversitiesResolved } from '../lib/siteData.js';

export function getUniversities() {
  return Promise.resolve(getUniversitiesResolved());
}

export function filterUniversities(items, filters) {
  const search = filters.search.trim().toLowerCase();
  const country = filters.country;
  const program = filters.program.trim().toLowerCase();

  return items.filter((university) => {
    const matchesSearch =
      !search ||
      university.name.toLowerCase().includes(search) ||
      university.country.toLowerCase().includes(search) ||
      university.programs.some((item) => item.toLowerCase().includes(search));

    const matchesCountry = country === ALL_COUNTRIES || university.country === country;
    const matchesProgram = !program || university.programs.some((item) => item.toLowerCase().includes(program));

    return matchesSearch && matchesCountry && matchesProgram;
  });
}
