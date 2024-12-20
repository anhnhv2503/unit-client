import { getAllNotifications } from "@/services/notificationService";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface NotificationProps {
  id: string; // Unique identifier (e.g., a UUID)
  isSeen: boolean;
  actionType: string;
  userName: string;
  postId?: string;
  userId?: string;
  pictureProfile?: string;
  createdAt: string; // ISO string for sorting
  metadata: {
    userName: string;
    profilePicture: string;
    lastestActionUserId: string;
  };
  ownerId: string;
  affectedObjectId: string;
}

type WebSocketContextType = {
  sendMessage: (message: string) => void;
  isConnected: boolean;
  messages: WebSocketMessage[];
  connect: () => void;
  disconnect: () => void;
  handleLogin: (loggedInUserId: string) => void;
  handleLogout: () => void;
  clearNotifications: () => void;
  notificationCount: number;
};

type WebSocketMessage = {
  notification: NotificationProps;
};

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};

const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const socketRef = useRef<WebSocket | null>(null);
  const webSocketURL =
    "wss://v3jhk6p1a6.execute-api.ap-southeast-1.amazonaws.com/develop/";
  const isClear = localStorage.getItem("isClear");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getAllNotification = async () => {
    try {
      const res = await getAllNotifications();
      if (!isClear) {
        res.data.map((item: any) => {
          if (item.isSeen === false) {
            setNotificationCount((prev) => prev + 1);
          }
        });
      } else {
        setNotificationCount(0);
      }
      console.log(notificationCount);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      return 0; // Return 0 if there is an error
    }
  };

  useEffect(() => {
    getAllNotification();
  }, []);

  // Retrieve `userId` immediately
  const userId = useRef<string | null>(null);
  useEffect(() => {
    const storedUserId = JSON.parse(localStorage.getItem("user_id") || "null");
    if (storedUserId) {
      userId.current = storedUserId;
      connect();
    }
    return () => {
      disconnect(); // Cleanup on unmount
    };
  }, []);

  const connect = () => {
    if (!userId.current || socketRef.current) return; // Skip if no `userId` or already connected

    const socket = new WebSocket(`${webSocketURL}?userId=${userId.current}`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      const data = JSON.parse(event.data);
      console.log("data", data);
      setMessages((prev) => [...prev, data]);
      setNotificationCount((prev) => prev + 1);
      localStorage.setItem("isClear", JSON.stringify(false));
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
      socketRef.current = null;
    };
  };

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
  };

  const sendMessage = (message: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.send(message);
    } else {
      console.warn("WebSocket is not connected");
    }
  };

  const handleLogin = (loggedInUserId: string) => {
    userId.current = loggedInUserId; // Set the userId
    localStorage.setItem("user_id", JSON.stringify(loggedInUserId)); // Store userId in localStorage
    connect(); // Connect to WebSocket
    getAllNotification();
  };

  const handleLogout = () => {
    disconnect(); // Disconnect WebSocket
    userId.current = null; // Clear userId
    localStorage.removeItem("user_id"); // Remove from localStorage
  };

  const clearNotifications = () => {
    setNotificationCount(0); // Assuming `messages` is managed via state
    localStorage.setItem("isClear", JSON.stringify(true));
  };

  // Automatically connect when provider mounts
  useEffect(() => {
    if (userId.current) {
      connect();
    }
    return () => {
      disconnect(); // Cleanup on unmount
    };
  }, []); // Only run on mount

  return (
    <WebSocketContext.Provider
      value={{
        connect,
        sendMessage,
        isConnected,
        messages,
        disconnect,
        handleLogin,
        handleLogout,
        clearNotifications,
        notificationCount,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
