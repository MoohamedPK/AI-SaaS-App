
export type companionProps = {
    name: string,
    subject: string,
    topic : string,
    style : string,
    voice : string,
    duration : number,
}

export enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED"
}

export type SavedMessage = {
  role: string;
  text: string;
}