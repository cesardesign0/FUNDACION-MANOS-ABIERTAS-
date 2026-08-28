// Local analytics and visitor tracker for Fundación Manos Abiertas
const STORAGE_KEY = 'manos_local_analytics_v1';

const DEFAULT_ANALYTICS = {
  totalVisits: 3840,
  todayVisits: 48,
  weekVisits: 312,
  monthVisits: 1240,
  yearVisits: 3840,
  lastVisitTimestamp: Date.now(),
  sectionViews: {
    hero: 100,
    stats: 92,
    programs: 84,
    retreats: 73,
    shop: 61,
    volunteer: 45,
    about: 39,
    footer: 34
  },
  devices: {
    mobile: 68,
    desktop: 27,
    tablet: 5
  }
};

export const getAnalyticsData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ANALYTICS));
      return DEFAULT_ANALYTICS;
    }
    const data = JSON.parse(saved);
    
    // Check if day rolled over
    const lastDate = new Date(data.lastVisitTimestamp || Date.now()).toDateString();
    const todayDate = new Date().toDateString();
    if (lastDate !== todayDate) {
      data.todayVisits = 1;
      data.lastVisitTimestamp = Date.now();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    
    return data;
  } catch {
    return DEFAULT_ANALYTICS;
  }
};

export const recordPublicVisit = () => {
  try {
    const isSessionRecorded = sessionStorage.getItem('manos_session_recorded');
    if (isSessionRecorded) return;

    const data = getAnalyticsData();
    data.totalVisits += 1;
    data.todayVisits += 1;
    data.weekVisits += 1;
    data.monthVisits += 1;
    data.yearVisits += 1;
    data.lastVisitTimestamp = Date.now();

    sessionStorage.setItem('manos_session_recorded', 'true');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Error recording visit', err);
  }
};

export const resetAnalyticsData = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ANALYTICS));
  return DEFAULT_ANALYTICS;
};
