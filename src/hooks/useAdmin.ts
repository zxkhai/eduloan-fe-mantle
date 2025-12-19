import { useAccount } from 'wagmi';
import { useAdmin as useAdminAddress } from './useEduLoan';

export function useIsAdmin() {
  const { address } = useAccount();
  const { data: adminAddress, isLoading } = useAdminAddress();

  const isAdmin = address && adminAddress && address.toLowerCase() === adminAddress.toLowerCase();

  return { isAdmin: !!isAdmin, isLoading };
}
