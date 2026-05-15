import { useAuthContext } from '../store/auth';

export function useAuth() {
  return useAuthContext();
}
