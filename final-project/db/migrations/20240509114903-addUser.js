import bcrypt from 'bcrypt';
import 'dotenv/config';

// const USER_PASSWORD = String(process.env.USER_PASSWORD);
// const SALT_ROUNDS =  Number(process.env.SALT_ROUNDS);

export const up = async (db, client) => {
    // const hashedPassword = await bcrypt.hash(USER_PASSWORD,SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash('123456',10);
    await db.collection('users').insertOne({ 
        firstName: 'Kerim',
        lastName: 'Imamovic',
        email: 'kerim@email.com',
        password: hashedPassword,
        age: 27,
    });
};

export const down = async (db, client) => {
    await db.collection('users').deleteOne({ email: 'kerim@email.com' });
};
