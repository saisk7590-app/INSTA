import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthSession } from '../../types/auth';

const SESSION_KEY = 'hyperlocal.session';
const ONBOARDING_DRAFT_KEY = 'hyperlocal.onboardingDraft';
const PERMISSIONS_KEY = 'hyperlocal.permissions';

export async function saveSession(session: AuthSession) {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export async function getSession() {
  const raw = await AsyncStorage.getItem(SESSION_KEY);
  return raw ? (JSON.parse(raw) as AuthSession) : null;
}

export async function clearSession() {
  await AsyncStorage.removeItem(SESSION_KEY);
}

export async function saveOnboardingDraft<T>(draft: T) {
  await AsyncStorage.setItem(ONBOARDING_DRAFT_KEY, JSON.stringify(draft));
}

export async function getOnboardingDraft<T>() {
  const raw = await AsyncStorage.getItem(ONBOARDING_DRAFT_KEY);
  return raw ? (JSON.parse(raw) as T) : null;
}

export async function clearOnboardingDraft() {
  await AsyncStorage.removeItem(ONBOARDING_DRAFT_KEY);
}

export async function savePermissions<T>(permissions: T) {
  await AsyncStorage.setItem(PERMISSIONS_KEY, JSON.stringify(permissions));
}

export async function getPermissions<T>() {
  const raw = await AsyncStorage.getItem(PERMISSIONS_KEY);
  return raw ? (JSON.parse(raw) as T) : null;
}
