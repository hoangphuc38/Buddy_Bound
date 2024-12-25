<<<<<<< HEAD
import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client, Frame, Message } from '@stomp/stompjs';
=======
import SockJS from 'sockjs-client';
import { Client, Frame, Message } from '@stomp/stompjs';
import { useState, useEffect, useRef, useCallback } from 'react';
>>>>>>> 5916045b8b771512d6ebc403e71c1a3bfcbe660a
import { TLocation } from '../types/location.type';
import { TNotification } from '../types/notification.type';
import { TMessage } from '../types/message.type';

<<<<<<< HEAD
interface WebSocketHookResult {
  connected: boolean;
  connecting: boolean;
  error: string | null;
  sendMessage: (destination: string, message: unknown) => void;
  stompClient: Client | null;
  subscribeToGroup: (groupId: number) => void;
  subscribeToLocation: (groupId: number) => void;
  subscribeToNotifications: (userId: number) => void;
}

interface WebSocketConfig {
  serverUrl?: string;
  onMessageReceived?: (groupId: number, message: TMessage) => void;
  onLocationReceived?: (groupId: number, location: TLocation) => void;
  onNotificationReceived?: (userId: number, notification: TNotification) => void;
  debug?: boolean;
  reconnectDelay?: number;
  heartbeatIncoming?: number;
  heartbeatOutgoing?: number;
}

export const BASE_WS = 'https://buddybound-app-790723374073.asia-southeast1.run.app/ws';

const useWebSocketConnection = ({
  onMessageReceived,
  onLocationReceived,
  onNotificationReceived,
  debug = false,
  reconnectDelay = 5000,
  heartbeatIncoming = 4000,
  heartbeatOutgoing = 4000,
}: WebSocketConfig): WebSocketHookResult => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setConnecting(true); // Set connecting to true when starting the connection

    const client = new Client({
      brokerURL: 'ws://buddybound-app-790723374073.asia-southeast1.run.app/ws',
      webSocketFactory: () => new SockJS(BASE_WS),
      debug: (str) => {
        if (debug) {
          console.log('STOMP: ' + str);
        }
      },
      reconnectDelay,
      heartbeatIncoming,
      heartbeatOutgoing,
    });

    client.onConnect = (frame: Frame) => {
      setConnecting(false); // Connection established
      setConnected(true);
      setError(null);
      console.log('Connected:', frame);
    };

    client.onStompError = (frame: Frame) => {
      setConnecting(false); // Stop connecting on error
      const errorMessage = frame.headers?.message || 'Unknown STOMP error';
      setError(errorMessage);
      console.error('STOMP error:', frame);
    };

    client.onWebSocketError = (event: Event) => {
      setConnecting(false); // Stop connecting on error
      setError('WebSocket connection error');
      console.error('WebSocket error:', event);
    };

    client.onDisconnect = () => {
      setConnecting(false); // Stop connecting if disconnected
      setConnected(false);
      console.log('Disconnected');
    };

    client.activate();
    setStompClient(client);

    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, [debug, reconnectDelay, heartbeatIncoming, heartbeatOutgoing]);

  const subscribeToGroup = (groupId: number) => {
    if (stompClient && connected && onMessageReceived) {
      const topic = `/topic/group/messages/${groupId}`;
      stompClient.subscribe(topic, (message: Message) => {
        const messageData = JSON.parse(message.body) as TMessage;
        onMessageReceived(groupId, messageData);
      });
    }
  };

  const subscribeToLocation = (groupId: number) => {
    if (stompClient && connected && onLocationReceived) {
      const topic = `/topic/group/location/${groupId}`;
      stompClient.subscribe(topic, (message: Message) => {
        const locationData = JSON.parse(message.body) as TLocation;
        onLocationReceived(groupId, locationData);
      });
    }
  };

  const subscribeToNotifications = (userId: number) => {
    if (stompClient && connected && onNotificationReceived) {
      const topic = `/topic/notification/users/${userId}`;
      stompClient.subscribe(topic, (message: Message) => {
        const notificationData = JSON.parse(message.body) as TNotification;
        onNotificationReceived(userId, notificationData);
      });
    }
  };

  const sendMessage = (destination: string, message: unknown): void => {
    if (stompClient && connected) {
      stompClient.publish({
        destination,
        body: JSON.stringify(message),
      });
    } else {
      console.warn('Cannot send message: Client not connected');
    }
  };

  return {
    connected,
    connecting,
    error,
    sendMessage,
    stompClient,
    subscribeToGroup,
    subscribeToLocation,
    subscribeToNotifications,
  };
};

export default useWebSocketConnection;
=======
// URL WebSocket gốc của bạn
export const BASE_WS = 'https://buddybound-app-790723374073.asia-southeast1.run.app/ws';

interface WebSocketConfig {
    serverUrl?: string;
    onMessageReceived?: (groupId: number, message: TMessage) => void;
    onLocationReceived?: (groupId: number, location: TLocation) => void;
    onNotificationReceived?: (userId: number, notification: TNotification) => void;
    debug?: boolean;
    reconnectDelay?: number;
    heartbeatIncoming?: number;
    heartbeatOutgoing?: number;
}

interface WebSocketHookResult {
    connected: boolean;
    error: string | null;
    sendMessage: (destination: string, message: unknown) => void;
    stompClient: Client | null;
    subscribeToGroup: (groupId: number) => void;
    subscribeToLocation: (groupId: number) => void;
    subscribeToNotifications: (userId: number) => void;
}

const useWebSocketConnection = ({
    serverUrl = BASE_WS,
    onMessageReceived,
    onLocationReceived,
    onNotificationReceived,
    debug = false,
    reconnectDelay = 5000,
    heartbeatIncoming = 4000,
    heartbeatOutgoing = 4000,
}: WebSocketConfig): WebSocketHookResult => {
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Dùng useRef để giữ Client ổn định (tránh re-init liên tục khi re-render)
    const stompClientRef = useRef<Client | null>(null);

    // Hàm khởi tạo STOMP Client
    const initStompClient = useCallback(() => {
        const client = new Client({
            // Tạo webSocketFactory từ SockJS
            webSocketFactory: () => new SockJS(serverUrl),
            debug: (msg: string) => {
                if (debug) console.log('[STOMP DEBUG] ', msg);
            },
            reconnectDelay,
            heartbeatIncoming,
            heartbeatOutgoing,
        });

        client.onConnect = (frame: Frame) => {
            console.log('Connected:', frame);
            setConnected(true);
            setError(null);
        };

        client.onStompError = (frame: Frame) => {
            const errorMessage = frame.headers?.message || 'Unknown STOMP error';
            setError(errorMessage);
            console.error('STOMP error:', frame);
        };

        client.onWebSocketError = (event: Event) => {
            setError('WebSocket connection error');
            console.error('WebSocket error:', event);
        };

        client.onDisconnect = () => {
            setConnected(false);
            console.log('Disconnected');
        };

        // Lưu vào ref để các hàm subscribe/send có thể dùng
        stompClientRef.current = client;
        // Kích hoạt kết nối
        client.activate();
    }, [serverUrl, debug, reconnectDelay, heartbeatIncoming, heartbeatOutgoing]);

    // useEffect init client chỉ chạy 1 lần khi component mount
    useEffect(() => {
        initStompClient();

        // Cleanup khi unmount
        return () => {
            if (stompClientRef.current && stompClientRef.current.active) {
                stompClientRef.current.deactivate();
            }
        };
    }, [initStompClient]);

    // Các hàm subscribe
    const subscribeToGroup = useCallback(
        (groupId: number) => {
            const client = stompClientRef.current;
            if (!client || !client.active) return;
            if (onMessageReceived) {
                const topic = `/topic/group/messages/${groupId}`;
                client.subscribe(topic, (message: Message) => {
                    const data = JSON.parse(message.body) as TMessage;
                    onMessageReceived(groupId, data);
                });
            }
        },
        [onMessageReceived]
    );

    const subscribeToLocation = useCallback(
        (groupId: number) => {
            const client = stompClientRef.current;
            if (!client || !client.active) return;
            if (onLocationReceived) {
                const topic = `/topic/group/location/${groupId}`;
                client.subscribe(topic, (message: Message) => {
                    const data = JSON.parse(message.body) as TLocation;
                    onLocationReceived(groupId, data);
                });
            }
        },
        [onLocationReceived]
    );

    const subscribeToNotifications = useCallback(
        (userId: number) => {
            const client = stompClientRef.current;
            if (!client || !client.active) return;
            if (onNotificationReceived) {
                const topic = `/topic/notification/users/${userId}`;
                client.subscribe(topic, (message: Message) => {
                    const data = JSON.parse(message.body) as TNotification;
                    onNotificationReceived(userId, data);
                });
            }
        },
        [onNotificationReceived]
    );

    // Hàm gửi message
    const sendMessage = useCallback((destination: string, message: unknown): void => {
        const client = stompClientRef.current;
        if (client && client.active) {
            client.publish({
                destination,
                body: JSON.stringify(message),
            });
        } else {
            console.warn('Cannot send message: Client not connected');
        }
    }, []);

    return {
        connected,
        error,
        sendMessage,
        stompClient: stompClientRef.current,
        subscribeToGroup,
        subscribeToLocation,
        subscribeToNotifications,
    };
};

export default useWebSocketConnection;
>>>>>>> 5916045b8b771512d6ebc403e71c1a3bfcbe660a
