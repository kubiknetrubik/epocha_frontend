export const ROUTES = {
  HOME: '/',
  FEED: '/feed',
  CATALOG: '/catalog',
  ADD: '/add',
  LOGIN: '/login',
} as const;

export type RouteKeyType = keyof typeof ROUTES;


export const DEFAULT_IMAGE = '/DefaultImage.jpg';
export const DEFAULT_VIDEO = '/DefaultVideo.mp4';


export const formatDate = (value: string | null) =>
  value ? value.split('-').reverse().join('.') : '—';
