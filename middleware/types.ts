import type { WASocket, WAMessage, proto } from "baileys";

/** Type of incoming WhatsApp event */
export type EventType =
  | "message"
  | "connection"
  | "group_update"
  | "group_participants"
  | "credentials"
  | "lid_mapping"
  | "message_delete";

/** Message content classification */
export type MessageClassification =
  | "text"
  | "command"
  | "media"
  | "sticker"
  | "button_response"
  | "protocol"
  | "unknown";

/** Media content type */
export type MediaType = "image" | "video" | "audio" | "document" | "sticker";

/** Command metadata extracted from a message */
export interface CommandInfo {
  name: string;
  args: string;
  rawText: string;
}

/** Normalized message structure */
export interface NormalizedMessage {
  id: string;
  sessionId: string;
  chatId: string;
  senderId: string;
  senderAltId?: string;
  senderName: string;
  isGroup: boolean;
  isFromSelf: boolean;
  isSudo: boolean;
  classification: MessageClassification;
  text?: string;
  command?: CommandInfo;
  mediaType?: MediaType;
  hasQuoted: boolean;
  timestamp: number;
  device: "web" | "unknown" | "android" | "ios" | "desktop";
  raw: WAMessage;
}

/** Normalized event structure */
export interface NormalizedEvent<T = unknown> {
  type: EventType;
  sessionId: string;
  payload: T;
  receivedAt: number;
}

/** Connection update event payload */
export interface ConnectionPayload {
  state: "open" | "close" | "connecting";
  isLoggedOut?: boolean;
}

/** Group participants update payload */
export interface GroupParticipantsPayload {
  groupId: string;
  participants: string[];
  action: "add" | "remove" | "promote" | "demote";
}

/** Group metadata update payload */
export interface GroupUpdatePayload {
  groupId: string;
  metadata: Record<string, unknown>;
}

/** LID mapping update payload */
export interface LidMappingPayload {
  phoneNumber: string;
  lid: string;
}

/** Message delete event payload */
export interface MessageDeletePayload {
  keys: proto.IMessageKey[];
}

/** Result of command dispatch operation */
export interface DispatchResult {
  handled: boolean;
  handlerName?: string;
  error?: Error;
}

/** Handler function for processing normalized messages */
export type MessageHandler = (
  message: NormalizedMessage,
  client: WASocket,
) => Promise<void>;

/** Handler function for processing events */
export type EventHandler<T = unknown> = (
  event: NormalizedEvent<T>,
  client: WASocket,
) => Promise<void>;

/** Options for middleware processing */
export interface MiddlewareOptions {
  sessionId?: string;
  ignoreSelf?: boolean;
  debug?: boolean;
}

/** Events emitted by the middleware */
export interface MiddlewareEvents {
  message: (message: NormalizedMessage, client: WASocket) => void;
  command: (message: NormalizedMessage, client: WASocket) => void;
  connection: (event: NormalizedEvent<ConnectionPayload>) => void;
  group_participants: (
    event: NormalizedEvent<GroupParticipantsPayload>,
  ) => void;
  group_update: (event: NormalizedEvent<GroupUpdatePayload>) => void;
  lid_mapping: (event: NormalizedEvent<LidMappingPayload>) => void;
  message_delete: (event: NormalizedEvent<MessageDeletePayload>) => void;
  credentials: (event: NormalizedEvent<void>) => void;
  error: (error: Error, context: string) => void;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SessionData {
  id: string;
  phoneNumber: string;
  status: string;
  createdAt?: number;
  pushName?: string;
}

export interface SessionCreateResult {
  id: string;
  pairingCode: string | null;
  pairingCodeFormatted: string | null;
}

export interface AuthStatusData {
  sessionId: string;
  phoneNumber: string;
  status: string;
  isAuthenticated: boolean;
  isPairing: boolean;
}

export interface SessionStatsData {
  session: SessionData;
  messages: number;
  uptime: number;
  uptimeFormatted: string;
  hourlyActivity: number[];
  avgMessagesPerHour: number;
}

export interface OverallStatsData {
  totalSessions: number;
  activeSessions: number;
  totalMessages: number;
  version: string;
  serverUptime: number;
  serverUptimeFormatted: string;
}

export interface MessagesData {
  messages: Array<{ id: string; message: unknown }>;
  total: number;
  limit: number;
  offset: number;
}

export interface ConfigData {
  version: string;
  defaultBotName: string;
}

export interface GroupData {
  id: string;
  subject: string;
  participantCount: number;
}

export interface GroupsData {
  groups: GroupData[];
  count: number;
}
