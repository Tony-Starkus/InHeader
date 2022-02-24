import { AxiosInstance } from "axios";
import { defineLinks } from "../functions";

export const getNotifications = (
  api: AxiosInstance,
  production: boolean,
  { page = 1, perPage = 10, params = {} }: any,
) => {
  const response = api.get(`${defineLinks(production).api.notifications}me/?page=${page}&size=${perPage}`, {
    params: params,
  });

  return response;
};

export const updateSawNotifications = (api: AxiosInstance, production: boolean, { params = {} }: any) => {
  /**
   * When user opens the notifications modal, this function is called to check the most recents
   * notifications as viewed.
   */
  const response = api.get(`${defineLinks(production).api.notifications}saw`, {
    params: params,
  });
  return response;
};
