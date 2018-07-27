export default class Subscriptions {
    subscriptions: any[];
    getSubscriptions: () => any[];
    subscribe: (subscription: any) => void;
    unsubscribe: (subscription: any) => void;
}
