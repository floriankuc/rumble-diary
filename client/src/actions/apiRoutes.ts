export enum ApiRoutes {
  LOAD_USER = '/api/auth/user',
  REGISTER_USER = '/api/users/new',
  LOGIN_USER = '/api/auth',
  ITEMS = '/api/items',
  NEW_ITEM = '/api/items/new',
}

export const getAuthRoute = (userId?: string): string => {
  return `${ApiRoutes.ITEMS}/${userId}/items`;
};

export const getItemsRoute = (itemId: string): string => {
  return `${ApiRoutes.ITEMS}/${itemId}`;
};

export const getItemRoute = (itemId: string, userId?: string): string => {
  return `${ApiRoutes.ITEMS}/${userId}/items/${itemId}`;
};
