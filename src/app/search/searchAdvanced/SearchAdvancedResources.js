import {observable} from 'mobx';

function ResourcesStore() {
  return observable({
    title: '',
    types: '',
    level: '',
    grade: '',
    subject: '',
    show: false
  });
}

const resourcesStore = new ResourcesStore();

export default resourcesStore;
export {ResourcesStore};
