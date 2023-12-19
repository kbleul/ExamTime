import React from 'react';

import {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {RootState} from '../reduxToolkit/Store';
import {useSelector} from 'react-redux';
import {
  useDeleteNotificationStatusMutation,
  useGetNotificationsMutation,
  usePostNotificationStatusMutation,
} from '../reduxToolkit/Services/auth';
import {checkIsOnline} from '../utils/Functions/Helper';

interface NotificationType {
  notifications: any[] | null;
  hasNewNotification: boolean;
}
interface NotificationContextValue {
  notifications: any[] | null;
  hasNewNotification: boolean;
  fetchNotification: () => void;
  updateNotificationStatus: (id: string) => void;
  deleteNotification: (id: string) => Promise<boolean | undefined>;
}
const NotificationContext = createContext<NotificationType | any>(undefined);

export function useNotification() {
  return useContext(NotificationContext);
}

const NotificationProvider = ({children}: {children: React.ReactNode}) => {
  const token = useSelector((state: RootState) => state.auth.token);

  const [getNotifications] = useGetNotificationsMutation();
  const [postNotificationStatus] = usePostNotificationStatusMutation();
  const [deleteNotificationStatus] = useDeleteNotificationStatusMutation();

  const [notifications, setNotifications] = useState<any[] | null>(null);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  const fetchNotification = useCallback(async () => {
    const isOnline = await checkIsOnline();
    if (token && isOnline) {
      try {
        const response = await getNotifications({token}).unwrap();
        if (response.userNotifications) {
          const notificationsArr: any[] = response.userNotifications;
          setNotifications([...notificationsArr]);
          notificationsArr.some(notf => notf?.wasRead === false)
            ? setHasNewNotification(true)
            : setHasNewNotification(false);
        } else {
          setNotifications(null);
          setHasNewNotification(false);
        }
      } catch (err) {
        console.log('Error on GET notifications ', err);
      }
    }
  }, [token, getNotifications]);

  const deleteNotification = useCallback(
    async (id: string) => {
      if (token && notifications && notifications.length > 0) {
        try {
          const response = await deleteNotificationStatus({
            token,
            notificationId: id,
          }).unwrap();

          console.log('DELETE response updaee ', response);

          if (response?.message) {
            setNotifications([
              ...notifications?.filter(notfItem => notfItem.id !== id),
            ]);

            return true;
          }

          return false;
        } catch (err) {
          console.log('Error on DELETE notifications ', err);
          return false;
        }
      }
    },
    [token, notifications, deleteNotificationStatus],
  );

  const updateNotificationStatus = useCallback(
    async (id: string) => {
      if (token && notifications && notifications.length > 0) {
        try {
          await postNotificationStatus({
            token,
            notificationId: id,
          }).unwrap();

          const updatedItem = notifications.find(item => item.id === id);
          updatedItem.wasRead = true;

          setNotifications([
            ...notifications?.filter(notfItem => notfItem.id !== id),
            updatedItem,
          ]);
        } catch (err) {
          console.log('Error on UPDATE notifications ', err);
        }
      }
    },
    [token, notifications, postNotificationStatus],
  );

  useEffect(() => {
    fetchNotification();
  }, [token, fetchNotification]);

  return (
    <NotificationContext.Provider
      value={
        {
          notifications,
          hasNewNotification,
          fetchNotification,
          updateNotificationStatus,
          deleteNotification,
        } as NotificationContextValue
      }>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
