import {observable} from 'mobx';

function UserStore() {
  return observable({
    me: ''
  });
}

const userStore = new UserStore();

export default userStore;
export {UserStore};
