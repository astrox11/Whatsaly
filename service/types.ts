export type { ApiResponse } from "./middleware";

export interface SessionCreateRequest {
  phoneNumber: string;
  botName?: string;
}

export type WsAction =
  | "getSessions"
  | "getSession"
  | "createSession"
  | "deleteSession"
  | "getAuthStatus"
  | "getStats"
  | "getSessionStats"
  | "getMessages"
  | "getConfig"
  | "getNetworkState"
  | "getGroups"
  | "pauseSession"
  | "resumeSession";

export interface WsRequest {
  action: WsAction;
  requestId?: string;
  params?: Record<string, string | number | boolean | undefined>;
}

export interface WsResponse {
  action: WsAction;
  requestId?: string;
  success: boolean;
  data?: unknown;
  error?: string;
}
