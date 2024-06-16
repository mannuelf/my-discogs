# Welcome to My Discogs

My Discogs is client app to display all the for sale items in a sellers inventory using the [Discogs API](https://www.discogs.com/developers).

## Development

Run the dev server:

```shellscript
pnpm run dev
```

## Deployment

First, build your app for production:

```sh
pnpm run build
```

Then run the app in production mode:

```sh
pnpm start
```

Now you'll need to pick a host to deploy it to.

### Built With

- 📖 [Remix docs](https://remix.run/docs)
- 🎨 [shadcn/ui](https://ui.shadcn.com/)
- React 19

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
