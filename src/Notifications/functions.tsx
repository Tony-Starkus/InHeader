
export const getNotifications: any = async (
  // @ts-ignore-next-line
  api: any,
  // @ts-ignore-next-line
  baseUrlNotifications: string,
  // @ts-ignore-next-line

// @ts-ignore-next-line  page: any,
  size: any,
) => {
  // const response = await api.get(
  //   `${baseUrlNotifications}notifications/me/?page=${page}&size=${size}`,
  // );
  return [];
};

export const showNotification = (content: any) => {
  switch (content.content) {
    case "NEW_FRIEND_REQUEST":
      return `Você possui uma nova solicitação de amizade.`;
  }

  return;
};
