export enum ECommands {
  TEST = 'test',
}

export type TPayloadItem = string | number | string[] | number[] | object;

export interface IWsMessage {
  type: ECommands;
  payload?: Record<string, TPayloadItem>;
}

export interface IWsAnswer {
  message: string;
  payload?: Record<string, TPayloadItem>;
}
