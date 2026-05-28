// geo.types.ts — Phase 2A.1 Geo Database Foundation

export interface UpdateLocationPayload {
    userId: string;
    latitude: number;
    longitude: number;
}

export interface UserGeoLocation {
    userId: string;
    currentLatitude: number | null;
    currentLongitude: number | null;
    lastLocationUpdated: string | null;
}

export interface PostGeoData {
    postId: string;
    latitude: number | null;
    longitude: number | null;
    placeName: string | null;
    geoVisibilityRadius: number;
}
