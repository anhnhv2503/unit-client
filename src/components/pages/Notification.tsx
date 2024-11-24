import { useEffect, useState } from "react";
import { useWebSocket } from "../context/NotificationProvider";
import { getAllNotifications } from "@/services/notificationService";
import { v4 as uuidv4 } from "uuid";
interface NotificationProps {
  id: string; // Unique identifier (e.g., a UUID)

  actionType: string;
  userName: string;
  postId?: string;
  userId?: string;
  pictureProfile?: string;
  createdAt: string; // ISO string for sorting
}

const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const { messages } = useWebSocket();

  const getAllNotification = async () => {
    try {
      const res = await getAllNotifications();
      setNotifications(res.data);
      // console.log(res.data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    getAllNotification();
  }, []);

  const generateMessage = (actionType: string, userName: string): string => {
    switch (actionType) {
      case "CommentPost":
        return `${userName} commented on your post.`;
      case "LikePost":
        return `${userName} liked your post.`;
      case "ReplyComment":
        return `${userName} replied to your comment.`;
      case "LikeComment":
        return `${userName} liked your comment.`;
      case "FollowRequest":
        return `${userName} sent you a follow request.`;
      default:
        return "You have a new notification.";
    }
  };

  console.log(messages);

  // Listen for real-time WebSocket updates
  const generateUniqueId = (notification: any) => {
    const { actionType, affectedObjectId, ownerId, createdAt } = notification;
    return `${actionType}-${affectedObjectId}-${ownerId}-${createdAt}`;
  };

  useEffect(() => {
    if (messages.length > 0) {
      const newNotifications = messages.map((message) => {
        const { notification } = message;
        const id = generateUniqueId(notification);

        return {
          ...notification,
          id, // Generated unique ID
          isNew: true, // Mark as new
        };
      });

      setNotifications((prev) => {
        const merged = [...newNotifications, ...prev];

        // Deduplicate by `id`
        // const unique = merged.reduce<NotificationProps[]>((acc, current) => {
        //   if (!acc.some((notif) => notif.id === current.id)) {
        //     acc.push(current);
        //   }
        //   return acc;
        // }, []);

        // Sort by `createdAt` (latest first)
        return merged.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    }
  }, [messages]);

  console.log(notifications);

  return (
    <div className="flex flex-col items-center px-4 py-6 lg:px-8 min-h-screen bg-white dark:bg-black overflow-y-scroll no-scrollbar">
      <div className="w-full flex justify-center mt-3">
        <div className="max-w-2xl w-full">
          <div className="p-4">
            {notifications.length > 0 ? (
              <>
                <ul role="list" className="divide-y divide-gray-200">
                  {notifications.map((person) => (
                    <li key={uuidv4()} className="flex gap-x-4 py-5">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
                        <img
                          src={person.metadata.profilePicture}
                          alt={person.metadata.userName}
                          className="w-full h-full rounded-full object-cover"
                        />
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            a
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-auto">
                        <div className="flex items-center flex-wrap">
                          <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                            {person.metadata.userName}
                          </span>
                          <span className="text-gray-500 ml-2 text-xs sm:text-sm">
                            3w
                          </span>
                        </div>
                        <p className="mt-1 text-gray-500 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                          {generateMessage(
                            person.actionType,
                            person.metadata.userName
                          )}
                        </p>
                      </div>
                      {/* <div>
                    <button className="text-blue-500 hover:text-blue-700">
                      View Profile
                    </button>
                  </div> */}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-lg font-semibold text-gray-500 text-center">
                    No notifications yet
                  </h2>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
