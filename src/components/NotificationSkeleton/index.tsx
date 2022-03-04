import React, { useEffect, useRef } from "react";
import { Stack, Skeleton, Typography } from "@mui/material";
import { useHeaderProvider } from "../../hooks/useHeaderProvider";
import { getNotifications } from "../../utils/functions/notifications";

const NotificationSkeleton = () => {
  const { notificationsData, setNotificationsData, api, production } = useHeaderProvider();
  const notificationSkeletonRef = useRef<HTMLElement | null>();

  useEffect(() => {
    let observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && notificationsData.currentPage < notificationsData.totalPage) {
        getNotifications(api, production, {
          page: notificationsData.currentPage + 1,
          perPage: notificationsData.size,
        }).then(response => {
          setNotificationsData({
            ...response.data,
            data: notificationsData.data.concat(response.data.data),
          });
        });
      }
    });
    if (notificationSkeletonRef.current) {
      observer.observe(notificationSkeletonRef.current);
    }

    return () => {
      if (notificationSkeletonRef.current) {
        observer.disconnect();
      }
    };
  }, [notificationsData, notificationSkeletonRef]);

  return (
    <>
      {notificationsData.currentPage < notificationsData.totalPage ? (
        <Stack ref={notificationSkeletonRef} style={{ padding: "10px 16px", flexDirection: "row" }}>
          <Skeleton variant="circular" width={35} height={35} style={{ marginRight: 8 }} />
          <Stack style={{ width: 240 }}>
            <Skeleton variant="text" style={{ marginBottom: "-2px" }} />
            <Skeleton variant="text" style={{ marginBottom: "-2px" }} />
            <Skeleton variant="text" style={{ marginBottom: "-2px" }} />
          </Stack>
        </Stack>
      ) : (
        <Typography style={{ width: "100%", fontStyle: "italic", textAlign: "center", color: "#a8a8a8" }}>
          Não há notificações no momento
        </Typography>
      )}
    </>
  );
};

export default NotificationSkeleton;
