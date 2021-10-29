export enum ApiRoutes {
  LOAD_USER = '/api/auth/user',
  REGISTER_USER = '/api/users',
  LOGIN_USER = '/api/auth',
  ITEMS = '/api/items',
  NEW_ITEM = '/api/items/new',
}

export const getAuthRoute = (userId?: string): string => {
  return `${ApiRoutes.ITEMS}/${userId}`;
};

export const getItemsRoute = (itemId: string): string => {
  return `${ApiRoutes.ITEMS}/${itemId}`;
};

export const getItemRoute = (itemId: string, userId?: string): string => {
  return `${ApiRoutes.ITEMS}/${userId}/${itemId}`;
};
