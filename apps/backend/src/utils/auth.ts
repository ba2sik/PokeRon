export const getBearerToken = (authHeader: string): string | null => {
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7, authHeader.length);
  } else {
    return null;
  }
};
