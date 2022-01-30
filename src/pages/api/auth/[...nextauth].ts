/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/naming-convention */
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

export const refreshToken = async (refresh_token: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/token/refresh/`,
      {
        refresh: refresh_token,
      },
    );

    const { access, refresh } = response.data;
    return [access, refresh];
  } catch {
    return [null, null];
  }
};

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
  ],
  secret: `${process.env.SECRET}`,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === 'google') {
          const { access_token, id_token } = account;

          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/social/login/google`,
              {
                access_token,
                id_token,
              },
            );

            token = {
              ...token,
              accessToken: response.data.access_token,
              refreshToken: response.data.refresh_token,
            };

            return token;
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            return token;
          }
        }
      }

      if (account?.expires_at && account.expires_at < Math.round(Date.now() / 1000 + 60)) {
        const [newAccessToken, newRefreshToken] = await refreshToken(token.refreshToken as string);
        if (newAccessToken && newRefreshToken) {
          token = {
            ...token,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          };

          return token;
        }

        return {
          ...token,
          exp: 0,
        };
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
