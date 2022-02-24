import React, { createContext, useEffect, useState } from "react";
import AWS from "aws-sdk";

import { User } from "../interfaces/User";
import { MeProps } from "../interfaces/Me";
import { NotificationProps } from "../interfaces/Notification";
import { defineLinks } from "../utils/functions";
import { AxiosInstance } from "axios";

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
export type GetS3Object = (path: string) => Promise<string>;

export interface HeaderProviderProps {
  user?: User;
  profiles?: MeProps;
  companySelected?: string;
  production: boolean;
  api: AxiosInstance;
  getS3Object: GetS3Object;
}

export interface NotificationsDataProps {
  currentPage: number;
  data: Array<NotificationProps>;
  size: number;
  total: number;
  totalPage: number;
}

export interface HeaderContextProps extends HeaderProviderProps {
  setUser: SetState<User>;
  setProfiles: SetState<MeProps>;
  setCompanySelected: SetState<string>;
  setProduction: SetState<boolean>;
  notificationsData: NotificationsDataProps;
  setNotificationsData: SetState<NotificationsDataProps>;
  updateNotificationItem: (data: NotificationProps) => void;
}

export interface Props {
  value: HeaderProviderProps;
}

export const HeaderContext = createContext<HeaderContextProps>({} as HeaderContextProps);

const HeaderProvider: React.FC<Props> = ({ children, value }) => {
  const { api } = value;
  const [user, setUser] = useState(value.user);
  const [profiles, setProfiles] = useState(value.profiles);
  const [companySelected, setCompanySelected] = useState(value.companySelected);
  const [production, setProduction] = useState(value.production);
  const [notificationsData, setNotificationsData] = useState<NotificationsDataProps>({
    currentPage: 1,
    data: [],
    size: 0,
    total: 0,
    totalPage: 0,
  });
  var bucket: string = value.production ? "bucket-incicle" : "bucket-incicle-stage";

  useEffect(() => {
    if (production !== undefined || production !== null) {
      if (production) {
        AWS.config.update({
          accessKeyId: "AKIAZP4HAFQZWJYFY6L2",
          secretAccessKey: "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",
          region: "sa-east-1",
        });
      } else {
        AWS.config.update({
          accessKeyId: "AKIAZP4HAFQZWJYFY6L2",
          secretAccessKey: "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",
          region: "us-east-1",
        });
      }
    }
  }, [production]);

  const s3 = new AWS.S3();

  const getS3Object = (src: string): Promise<string> => {
    function encode(data: any) {
      var str = data.reduce(function (a: any, b: any) {
        return a + String.fromCharCode(b);
      }, "");

      return btoa(str).replace(/.{76}(?=.)/g, "$&\n");
    }

    return new Promise((resolve, reject) => {
      s3.getObject(
        {
          Bucket: `${bucket}`,
          Key: src,
        },
        (error: AWS.AWSError, data: AWS.S3.GetObjectOutput) => {
          if (error) {
            reject(error);
          } else {
            const url = "data:image/jpg;base64," + encode(data.Body);
            resolve(url);
          }
        },
      );
    });
  };

  const updateNotificationItem = (data: NotificationProps) => {
    /**
     * This function updates a notification item in the notificationsData data array.
     * Then it marks the notification provided on params as readed.
     *
     * params:
     *  data: notification object with new values
     *
     * return: void
     */
    const notificationIndex = notificationsData.data.findIndex(item => {
      return item._id === data._id;
    });
    if (notificationIndex !== -1) {
      // Notification found
      const newArray = [...notificationsData.data];
      newArray[notificationIndex] = data;
      setNotificationsData(oldState => ({
        ...oldState,
        data: newArray,
      }));

      // Mark notification as readed
      api.patch(`${defineLinks(production).api.notifications}${data._id}`);
    }
  };

  useEffect(() => {
    if (value.user) setUser(value.user);
    if (value.profiles) setProfiles(value.profiles);
    if (value.production) setProduction(value.production);
    if (value.companySelected) setCompanySelected(value.companySelected);
  }, [value]);

  const context = {
    user,
    setUser,
    profiles,
    setProfiles,
    companySelected,
    setCompanySelected,
    production,
    setProduction,
    notificationsData,
    setNotificationsData,
    api: value.api,
    getS3Object: getS3Object,
    updateNotificationItem,
  } as HeaderContextProps;

  return <HeaderContext.Provider value={context}>{children}</HeaderContext.Provider>;
};

export default HeaderProvider;
