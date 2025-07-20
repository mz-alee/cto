import PostStore from "./PostStore";
import UserStore from "./UserStore";

class RootStore {
  postStore: PostStore;
  userStore: UserStore;

  constructor() {
    this.postStore = new PostStore(this);
    this.userStore = new UserStore(this);
  }
}

export type RootStoreType = RootStore;
export default RootStore;
