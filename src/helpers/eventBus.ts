type VoidSubscriber = (oldProps?: unknown, newProps?: unknown) => void;

class EventBus {
    listeners: Record<string, VoidSubscriber[]>;
    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: VoidSubscriber) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: VoidSubscriber) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
    }

    emit(event: string, ...args: any[]) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach(function (listener) {
            listener(...args);
        });
    }
}

export default EventBus;
