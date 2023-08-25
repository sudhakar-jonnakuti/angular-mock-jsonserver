import { Subscription } from 'rxjs/internal/Subscription';

class SubscriptionHelper {
  private subs: Subscription[] = [];

  private isValidSubscription(sub: Subscription) {
    return sub && typeof sub.unsubscribe === 'function';
  }

  set add(sub: Subscription) {
    if (this.isValidSubscription(sub)) {
      this.subs.push(sub);
    }
  }

  public unsubscribe() {
    this.subs.forEach(
      (sub: Subscription) => this.isValidSubscription(sub) && sub.unsubscribe()
    );
    this.subs = [];
  }
}

export default SubscriptionHelper;
