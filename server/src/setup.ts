import UserModel, { Role } from './users/user';
import PageModel from './pages/page';
import security from './util/security';
import { slugify } from './util/slugFunctions';

export class Setup {

    public async initializeApp() {
        const email = process.env.DEFAULT_ADMIN_EMAIL;
        const password = process.env.DEFAULT_ADMIN_PASSWORD;
        const name = process.env.DEFAULT_ADMIN_NAME || 'Administrator';

        await this.migrateSlug();
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

    private async migrateSlug() {

        const pages = await PageModel.find({ $exists: { slug: false } }, 'title');
        for (let page of pages) {
            await PageModel.updateOne({ _id: page._id },
                {
                    $set: {
                        slug: slugify(page.title)
                    }
                })
        }
    }
}