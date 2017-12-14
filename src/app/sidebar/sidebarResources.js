import {observable} from 'mobx';

function SidebarResourcesStore() {
  return observable({
    sidebarShow: false
  });
}

const sidebarResourcesStore = new SidebarResourcesStore();

export default sidebarResourcesStore;
export {SidebarResourcesStore};
