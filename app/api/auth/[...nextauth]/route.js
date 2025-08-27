// Note that all NextJs route is a serverless route...

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectionToDB } from '@utils/database';
import User from '@models/user'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
    // Want to be keeping every data about that user in session

    const sessionUser = await User.findOne({
      email: session.user.email
    })

    // updating id...
    session.user.id = sessionUser._id.toString()

    return session;

    },
    async signIn({ profile }) {
      try {
        // Connect Database
        await connectionToDB();
        // Check if a user already exists
        const userExists = await User.findOne({
          email: profile.email
        })

        // if not create a new user and save it to the database
        if (!userExists) {
          User.create({
            email: profile.email,
            userName: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture
          })
        }

        return true;

      } catch (err) {
        console.log(err)
      }

    }
  }
})

export { handler as GET, handler as POST }