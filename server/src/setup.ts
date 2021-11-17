import UserModel, { Role } from './users/user';
import security from './util/security';

export class Setup {

    public async initializeApp() {
        const email = process.env.DEFAULT_ADMIN_EMAIL;
        const password = process.env.DEFAULT_ADMIN_PASSWORD;
        const name = process.env.DEFAULT_ADMIN_NAME || 'Administrator';

        if (!email || !password || await UserModel.exists({ email })) {
            console.log('skipping admin creation', email);
            return;
        }

        const hash = await security.hash(password);
        await UserModel.create({
            email,
            hash,
            name,
            roles: [Role.Admin, Role.Everyone]
        })
    }
}