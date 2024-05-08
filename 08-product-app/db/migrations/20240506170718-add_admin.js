import bcrypt from 'bcrypt';

export const up = async (db, client) => {
    const password = await bcrypt.hash('123456', 10);
    await db.collection('users').insertOne({ 
        name: 'Kerim Imamovic',
        username: 'kerim',
        email: 'kerim@email.com',
        password: password,
        role: 'admin',
    });
};

export const down = async (db, client) => {
    await db.collection('users').deleteOne({ username: 'kerim '});
};
