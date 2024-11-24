import { useEffect, useState } from "react";
import { useWebSocket } from "../context/NotificationProvider";

const people = [
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Michael Foster",
    email: "michael.foster@example.com",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
    role: "Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
    role: "Director of Product",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
];

interface NotificationProps {
  id: string; // Unique identifier (e.g., a UUID)
  type: string;
  username: string;
  postId?: string;
  userId?: string;
  pictureProfile?: string;
  timestamp: string; // ISO string for sorting
}

const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const { messages } = useWebSocket();

  const generateMessage = (data: NotificationProps): string => {
    const { type, username } = data;

    switch (type) {
      case "CommentPost":
        return `${username} commented on your post.`;
      case "LikePost":
        return `${username} liked your post.`;
      case "ReplyComment":
        return `${username} replied to your comment.`;
      case "LikeComment":
        return `${username} liked your comment.`;
      case "FollowRequest":
        return `${username} sent you a follow request.`;
      default:
        return "You have a new notification.";
    }
  };

  console.log(messages);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // const response = await fetch("/api/notifications"); // Replace with your API endpoint
        // const data: NotificationProps[] = await response.json();
        // setNotifications(data); // Populate state with API data
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  // Listen for real-time WebSocket updates
  useEffect(() => {
    if (messages.length > 0) {
      const newNotifications = messages.map((message) => {
        const parsedMessage = JSON.parse(message); // Ensure the message is in NotificationProps format
        return {
          ...parsedMessage,
          id: parsedMessage.id || crypto.randomUUID(), // Ensure each message has a unique ID
          timestamp: parsedMessage.timestamp || new Date().toISOString(),
        };
      });

      // Merge API notifications with WebSocket messages
      setNotifications((prev) => {
        const merged = [...newNotifications, ...prev];

        // Deduplicate by `id`
        const unique = merged.reduce<NotificationProps[]>((acc, current) => {
          if (!acc.some((notif) => notif.id === current.id)) {
            acc.push(current);
          }
          return acc;
        }, []);

        // Sort by `timestamp` (latest first)
        return unique.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col items-center px-4 py-6 lg:px-8 min-h-screen bg-white dark:bg-black overflow-y-scroll no-scrollbar">
      <div className="w-full flex justify-center mt-3">
        <div className="max-w-2xl w-full">
          <div className="p-4">
            <ul role="list" className="divide-y divide-gray-200">
              {people.map((person) => (
                <li key={person.email} className="flex gap-x-4 py-5">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
                    <img
                      src={person.imageUrl}
                      alt={person.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-xs font-bold">a</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-auto">
                    <div className="flex items-center flex-wrap">
                      <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                        {person.name}
                      </span>
                      <span className="text-gray-500 ml-2 text-xs sm:text-sm">
                        3w
                      </span>
                    </div>
                    <p className="mt-1 text-gray-500 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                      {person.email}
                      <br />
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Minus adipisci nihil voluptas possimus officia assumenda
                      iste nisi placeat nostrum porro id, tempora error expedita
                      eveniet voluptates ea architecto dolore quaerat?
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
