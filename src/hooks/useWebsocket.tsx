import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client, Frame, Message, Versions } from '@stomp/stompjs';
import { TLocation } from '../types/location.type';
import { TNotification } from '../types/notification.type';
import { TMessage } from '../types/message.type';

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
    setConnecting(true);

    const client = new Client({
      webSocketFactory: () => new SockJS(BASE_WS),
      debug: (str) => {
        if (debug) {
          console.log('STOMP 123: ' + str);
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
