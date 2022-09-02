import { createAuth } from '@keystone-next/auth'
import { config, createSchema } from '@keystone-next/keystone/schema';
import { withItemData, statelessSessions} from '@keystone-next/keystone/session'
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import 'dotenv/config';
import { insertSeedData } from './seed-data';
const databaseURL = 
process.env.DATABASE_URL || 
'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret: process.env.COOKIE_SECRET,
}

const { withAuth }  = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // add in initial roles here
  },
  passwordResetLink: {
    async sendToken(args) {
      console.log(args);
      
    }
  }
})

export default withAuth(config({
  // @ts-ignore
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  //To define a database configuration
  db: {
    adapter: 'mongoose',
    url: databaseURL,
     async onConnect(keystone) {
      console.log('Connedted to the database');
      console.log(process.argv);
      
      if(process.argv.includes('--seed-data')) {
        console.log('active');
        
        await insertSeedData(keystone);
      }
    }
  },
  // To define the shape of the information we put in that database
  lists: createSchema({
    // Schema items go in here
    User,
    Product,
    ProductImage
  }),
  ui: {
    // Change this for role
    isAccessAllowed: ({ session }) => {
      // console.log(session);
      return !!session?.data

      
    }
  },
  //Add session values here
  session: withItemData(statelessSessions(sessionConfig), {
    User: `id name email`
  })
}))