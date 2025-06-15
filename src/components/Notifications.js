import React, { useState } from "react";
import closeIcon from "../assets/CloseIcon.png";
import profileIcon from "../assets/Profile-Notif.svg";
import dot from "../assets/Ellipse 26.svg";
import { useDialog } from "../DialogContext";
import { useNotification } from "../context/NotificationContext";
import axios from "axios";
import { Gateway_API_BASE_URL } from "../config";
import { formatDistanceToNow } from "date-fns";

const typeIcons = {
  PROFILE_VERIFIED: profileIcon,
};
const typeColors = {
  PROFILE_VERIFIED: "#E6F4EA",
};

const Notification = () => {
  const { closeNotifDialog } = useDialog();
  const {
    notifications,
    unreadCount,
    fetchNotifications,
    markAllAsRead,
    userId,
    token,
  } = useNotification();

  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `${Gateway_API_BASE_URL}/notifications/mark-read/${userId}/${id}`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchNotifications(0);
    } catch (err) {
      console.error("Error marking as read", err);
    }
  };

  const loadMore = async () => {
    try {
      await fetchNotifications(page);
      setPage((p) => p + 10);
      setHasMore(notifications.length + 10 <= notifications.length + 10);
    } catch (err) {
      console.error("Error loading more", err);
    }
  };

  const filtered =
    filter === "unread"
      ? notifications.filter((n) => n.status === "NOT_READ")
      : notifications;

  return (
    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl mx-auto absolute top-24 left-1/2 transform -translate-x-1/2 pb-8 px-6 sm:px-10 flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center pt-6 border-b border-gray-200 pb-3">
        <h2 className="text-xl sm:text-2xl font-bold text-[#003198]">
          Notifications
        </h2>
        <button onClick={closeNotifDialog}>
          <img
            src={closeIcon}
            className="w-8 h-8 hover:scale-110 transition-transform"
            alt="Close"
          />
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mt-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
            filter === "all"
              ? "bg-[#D9D9D9] text-[#003198]"
              : "text-[#5A79BE] hover:bg-gray-100"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
            filter === "unread"
              ? "bg-[#D9D9D9] text-[#003198]"
              : "text-[#5A79BE] hover:bg-gray-100"
          }`}
        >
          Unread
        </button>
        <button
          onClick={markAllAsRead}
          className="ml-auto text-xs font-semibold text-[#003198] underline hover:text-blue-800 transition"
        >
          Mark all as read
        </button>
      </div>

      {/* Notifications */}
      <div className="flex flex-col gap-4">
        {filtered.length === 0 ? (
          <div className="text-gray-500 text-center py-8">No notifications</div>
        ) : (
          <>
            {filtered.map((notif) => {
              const bgColor =
                notif.status === "NOT_READ"
                  ? typeColors[notif.type] || "#f0f4ff"
                  : "#fff";
              return (
                <div
                  key={notif.id}
                  onClick={() =>
                    notif.status === "NOT_READ" && markAsRead(notif.id)
                  }
                  className="flex items-start gap-4 p-3 rounded-xl cursor-pointer transition hover:bg-[#f5f8ff]"
                  style={{ backgroundColor: bgColor }}
                >
                  <img
                    src={typeIcons[notif.type] || profileIcon}
                    alt="icon"
                    className="w-10 h-10 flex-shrink-0"
                  />
                  <div className="flex flex-col gap-1 w-full">
                    <p className="text-sm sm:text-base text-gray-800">
                      {notif.message}
                    </p>
                    <span className="text-xs text-[#003198] font-medium">
                      {formatDistanceToNow(new Date(notif.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  {notif.status === "NOT_READ" && (
                    <img
                      src={dot}
                      alt="unread-dot"
                      className="w-4 h-4 flex-shrink-0"
                    />
                  )}
                </div>
              );
            })}
            {hasMore && (
              <button
                onClick={loadMore}
                className="mt-2 self-center text-blue-700 underline text-sm hover:text-blue-900 transition"
              >
                Load more
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Notification;
