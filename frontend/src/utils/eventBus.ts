
export const EventType = {
    FOLDER_CREATED: 'FOLDER_CREATED',
    FOLDER_DELETED: 'FOLDER_DELETED',
    FOLDER_UPDATED: 'FOLDER_UPDATED',
    PAGE_CREATED: 'PAGE_CREATED',
    PAGE_UPDATED: 'PAGE_UPDATED',
    PAGE_DELETED: 'PAGE_DELETED'
}

type CallbackFunc<T> = (data: T) => void | EventListener
export const EventBus = {
    on<T>(event: string, callback: CallbackFunc<T>) {
        const listener = (e: Event) => callback((e as CustomEvent<T>).detail);
        document.addEventListener(event, listener);
        return listener;
    },
    dispatch<T>(event: string, data: T) {
        document.dispatchEvent(new CustomEvent<T>(event, { detail: data }));
    },
    remove(event: string, callback: (e: Event) => void) {
        document.removeEventListener(event, callback);
    },
}
