import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type WebSocketContextType = {
  connect: () => void;
  disconnect: () => void;
  sendMessage: (message: string) => void;
  isConnected: boolean;
  messages: string[];
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
  const socketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const webSocketURL =
    "wss://v3jhk6p1a6.execute-api.ap-southeast-1.amazonaws.com/develop/";

  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const checkUserId = () => {
      const storedUserId = localStorage.getItem("user_id");
      if (storedUserId) {
        setUserId(JSON.parse(storedUserId));
      }
    };

    // Check periodically until `userId` is available
    const interval = setInterval(() => {
      checkUserId();
    }, 500); // Check every 500ms

    checkUserId(); // Initial check

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const connect = () => {
    if (!userId || socketRef.current) return; // Avoid connection if userId is unavailable or socket exists

    const socket = new WebSocket(`${webSocketURL}?userId=${userId}`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected", socket);
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      setMessages((prev) => [...prev, event.data]);
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
      console.log("Message sent:", message);
    } else {
      console.warn("WebSocket is not connected");
    }
  };

  useEffect(() => {
    return () => {
      disconnect(); // Cleanup on unmount
    };
  }, []);

  return (
    <WebSocketContext.Provider
      value={{ connect, disconnect, sendMessage, isConnected, messages }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
