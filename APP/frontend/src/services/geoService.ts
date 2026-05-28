// geoService.ts — Phase 2A.1 Frontend Geo Service
import { api } from './api';

export interface GeoLocation {
  userId: string;
  currentLatitude: number | null;
  currentLongitude: number | null;
  lastLocationUpdated: string | null;
}

/**
 * Pushes the device's current lat/lng to the backend.
 * Called from useLocationTracker — silently fails on network error.
 */
export async function updateLocation(
  userId: string,
  latitude: number,
  longitude: number
): Promise<GeoLocation | null> {
  try {
    const response = await api.post('/geo/update-location', {
      userId,
      latitude,
      longitude,
    });
    return response.data.data as GeoLocation;
  } catch (error: any) {
    // Non-fatal: location update failure should never crash the app
    console.warn('[GeoService] Failed to update location:', error?.message ?? error);
    return null;
  }
}

/**
 * Fetches the stored geo location for the current user.
 */
export async function getMyLocation(userId: string): Promise<GeoLocation | null> {
  try {
    const response = await api.get('/geo/me', { params: { userId } });
    return response.data.data as GeoLocation;
  } catch (error: any) {
    console.warn('[GeoService] Failed to fetch location:', error?.message ?? error);
    return null;
  }
}
