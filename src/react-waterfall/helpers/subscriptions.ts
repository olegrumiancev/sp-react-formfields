// @flow
/* eslint-disable no-undef */
export default class Subscriptions {
  subscriptions = [];

  getSubscriptions = () => this.subscriptions;

  subscribe = (subscription) => {
    this.subscriptions = [...this.subscriptions, subscription];
  }

  unsubscribe = (subscription) => {
    this.subscriptions = this.subscriptions.filter(subscriber => subscriber !== subscription);
  }
}
