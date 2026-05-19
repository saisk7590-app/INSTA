import { OnboardingDraft, PermissionState } from '../../types/auth';
import {
  clearOnboardingDraft,
  getOnboardingDraft,
  getPermissions,
  saveOnboardingDraft,
  savePermissions,
} from './sessionService';

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export async function loadOnboardingDraft() {
  await delay();
  return getOnboardingDraft<OnboardingDraft>();
}

export async function persistOnboardingDraft(draft: OnboardingDraft) {
  await delay();
  return saveOnboardingDraft(draft);
}

export async function clearDraft() {
  await delay();
  return clearOnboardingDraft();
}

export async function loadPermissionState() {
  await delay();
  return (await getPermissions<PermissionState>()) ?? {
    locationGranted: false,
    notificationsGranted: false,
  };
}

export async function persistPermissionState(permissions: PermissionState) {
  await delay();
  return savePermissions(permissions);
}
