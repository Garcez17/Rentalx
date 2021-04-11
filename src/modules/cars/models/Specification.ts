import { v4 as uuidv4 } from 'uuid';

class Specification {
  id?: string;

  name: string;

  description: string;

  created_At?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.created_At = new Date();
    }
  }
}

export { Specification };
