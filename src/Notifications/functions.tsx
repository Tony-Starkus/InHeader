
export const getNotifications: any = async (
  api: any,
  baseUrlNotifications: string,
  page: any,
  size: any,
) => {
  const response = await api.get(
    `${baseUrlNotifications}notifications/me/?page=${page}&size=${size}`,
  );
  return response.data;
};

export const showNotification = (content: any) => {
  switch (content.content) {
    case "NEW_FRIEND_REQUEST":
      return `Você possui uma nova solicitação de amizade.`;
  }

  return;
};
