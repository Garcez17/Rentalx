import { hash } from 'bcrypt';
import { v4 } from 'uuid';

import getConnection from '../index';

export async function createAdmin(): Promise<void> {
  const connection = await getConnection('localhost');

  const id = v4();
  const password = await hash('admin', 8);

  await connection.query(`
    INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXXX')
  `);

  await connection.close();
}

createAdmin().then(() => console.log('admin created!'));
