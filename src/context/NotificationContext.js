import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext
} from "react";
import axios from "axios";
import { Gateway_API_BASE_URL } from "../config";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  // grab stored credentials once
  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setToken(localStorage.getItem("token"));
  }, []);

  // fetch unread count
  const fetchUnreadCount = useCallback(async () => {
    if (!userId || !token) return;
    try {
      const res = await axios.get(
        `${Gateway_API_BASE_URL}/notifications/unread-count/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUnreadCount(res.data.count || 0);
    } catch (err) {
      console.error("Error fetching unread count", err);
    }
  }, [userId, token]);

  // fetch notifications (paginated)
  const fetchNotifications = useCallback(
    async (offset = 0, limit = 10) => {
      if (!userId || !token) return;
      try {
        const res = await axios.get(
          `${Gateway_API_BASE_URL}/notifications/${userId}?offset=${offset}&limit=${limit}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const incoming = res.data.notifications || [];
        setNotifications((prev) =>
          offset === 0 ? incoming : [...prev, ...incoming]
        );
      } catch (err) {
        console.error("Error fetching notifications", err);
      }
    },
    [userId, token]
  );

  // mark all as read
  const markAllAsRead = useCallback(async () => {
    if (!userId || !token) return;
    try {
      await axios.put(
        `${Gateway_API_BASE_URL}/notifications/mark-read/${userId}`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // optimistically update UI:
      setNotifications((prev) => prev.map((n) => ({ ...n, status: "READ" })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Error marking all as read", err);
    }
  }, [userId, token]);

  // initial load
  useEffect(() => {
    if (userId && token) {
      fetchUnreadCount();
      fetchNotifications(0);
    }
  }, [userId, token, fetchUnreadCount, fetchNotifications]);

  return (
    <NotificationContext.Provider
      value={{
        unreadCount,
        notifications,
        fetchUnreadCount,
        fetchNotifications,
        markAllAsRead,
        userId,
        token
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// custom hook
export const useNotification = () => useContext(NotificationContext);

export default NotificationContext;
