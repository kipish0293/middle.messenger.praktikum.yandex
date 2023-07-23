export type ButtonType = {
    name: string;
    events: Record<string, (e: Event) => void>;
};
