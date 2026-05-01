import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    loginStatus,
  } = useInternetIdentity();
  const queryClient = useQueryClient();

  const handleLogin = () => {
    if (!isInitializing && !isLoggingIn) {
      login();
    }
  };

  const handleLogout = () => {
    clear();
    queryClient.clear();
  };

  const principalText = identity?.getPrincipal().toString() ?? null;

  // Abbreviate the principal for display: first 5 chars ... last 5 chars
  const principalAbbrev = principalText
    ? principalText.length > 12
      ? `${principalText.slice(0, 5)}…${principalText.slice(-5)}`
      : principalText
    : null;

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    loginStatus,
    identity,
    principalText,
    principalAbbrev,
    login: handleLogin,
    logout: handleLogout,
  };
}
