import { supabase } from './supabase';
import { countries as defaultCountries } from '../data/countries';
import { universities as defaultUniversities } from '../data/universities';

const CHANGE_EVENT = 'nurstudy-data-changed';

let broadcastChannel = null;

if (typeof window !== 'undefined' && window.BroadcastChannel) {
  broadcastChannel = new BroadcastChannel('nurstudy_data_sync');
  broadcastChannel.onmessage = (event) => {
    if (event.data === 'sync') {
      // Boshqa tabda o'zgarish bo'lsa, bazadan yangidan yuklaymiz
      fetchUniversities();
      fetchCountries();
    }
  };
}

export function notifySiteDataChanged(broadcast = false) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
    if (broadcast && broadcastChannel) {
      broadcastChannel.postMessage('sync');
    }
  }
}

export function subscribeSiteData(callback) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

// In-memory cache
let localUniversities = [];
let localCountries = [];

function withCreatedAt(record) {
  return {
    ...record,
    created_at: record.created_at || new Date().toISOString(),
  };
}

// ========================
// UNIVERSITIES
// ========================

export function getUniversitiesResolved() {
  return localUniversities;
}

export async function fetchUniversities() {
  const { data, error } = await supabase.from('universities').select('*');
  if (!error && data) {
    if (data.length === 0) {
      // Seed with default data if empty
      const seedData = defaultUniversities.map(u => withCreatedAt({
        ...u,
        id: Math.random().toString(36).substr(2, 9)
      }));
      localUniversities = seedData.map(u => ({ ...u, _id: u.id }));
      notifySiteDataChanged();
      await supabase.from('universities').upsert(seedData);
    } else {
      localUniversities = data.map(u => ({ ...u, _id: u.id }));
      notifySiteDataChanged();
    }
  }
}

export async function saveUniversitiesOverride(list) {
  const previousList = localUniversities;
  localUniversities = list;
  notifySiteDataChanged(true);

  const newIds = new Set(list.map(u => u._id));
  const toDelete = previousList.filter(u => !newIds.has(u._id)).map(u => u._id);

  if (toDelete.length > 0) {
    await supabase.from('universities').delete().in('id', toDelete);
  }

  const cleanedList = list.map(({ _id, ...rest }) => withCreatedAt({
    ...rest,
    id: _id, // Map React unique _id to database id
  }));

  if (cleanedList.length > 0) {
    const { error } = await supabase.from('universities').upsert(cleanedList);
    if (error) {
      console.error("Supabase upsert error (universities):", error);
      alert("Universitetlarni saqlashda xatolik yuz berdi: " + error.message);
    }
  }
}

export function clearUniversitiesOverride() {
  // Not used in Supabase setup but kept for compatibility
}

// ========================
// COUNTRIES
// ========================

export function getCountriesResolved() {
  return localCountries;
}

export async function fetchCountries() {
  const { data, error } = await supabase.from('countries').select('*');
  if (!error && data) {
    if (data.length === 0) {
      // Seed with default data if empty
      const seedData = defaultCountries.map(c => withCreatedAt({
        ...c,
        id: Math.random().toString(36).substr(2, 9)
      }));
      localCountries = seedData.map(c => ({ ...c, _id: c.id }));
      notifySiteDataChanged();
      await supabase.from('countries').upsert(seedData);
    } else {
      localCountries = data.map(c => ({ ...c, _id: c.id }));
      notifySiteDataChanged();
    }
  }
}

export async function saveCountriesOverride(list) {
  const previousList = localCountries;
  localCountries = list;
  notifySiteDataChanged(true);

  const newIds = new Set(list.map(c => c._id));
  const toDelete = previousList.filter(c => !newIds.has(c._id)).map(c => c._id);

  if (toDelete.length > 0) {
    await supabase.from('countries').delete().in('id', toDelete);
  }

  const cleanedList = list.map(({ _id, ...rest }) => withCreatedAt({
    ...rest,
    id: _id,
  }));

  if (cleanedList.length > 0) {
    const { error } = await supabase.from('countries').upsert(cleanedList);
    if (error) {
      console.error("Supabase upsert error (countries):", error);
      alert("Davlatlarni saqlashda xatolik yuz berdi: " + error.message);
    }
  }
}

export function clearCountriesOverride() {}

// Fetch initial data on load
if (typeof window !== 'undefined') {
  fetchUniversities();
  fetchCountries();
}
