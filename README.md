# MyDiscogs - React Remix App

MyDiscogs is a React client to display all the "for sale" items in a sellers inventory using the [Discogs API](https://www.discogs.com/developers).

To see the contents of a specific seller you must add the seller name to environment variable: `SELLER_USERNAME`

## Environment variables

```sh
ACCESS_TOKEN_URL=https://api.discogs.com/oauth/access_token
AUTHORIZE_URL=https://www.discogs.com/oauth/authorize
CONSUMER_KEY=
CONSUMER_SECRET=
REQUEST_TOKEN_URL=https://api.discogs.com/oauth/request_token
SELLER_USERNAME=
USER_AGENT=yourAppName/1.0 +http://localhost:5173
```

Get your consumer key and secret from [Discogs API](https://www.discogs.com/developers)

## Development

```sh
pnpm i
```

Run the dev server:

```sh
pnpm dev
```

## Deployment

First, build your app for production:

```sh
pnpm build
```

Then run the app in production mode:

```sh
pnpm start
```

Now you'll need to pick a host to deploy it to.

### Built With

- 💽 [Discogs API](https://www.discogs.com/developers)
- 📖 [Remix](https://remix.run/docs)
- 🎨 [shadcn/ui](https://ui.shadcn.com/)
- 👩‍💻 [React v19](https://react.dev)

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
