# Welcome to MyDiscogs

MyDiscogs is a React client to display all the "for sale" items in a sellers inventory using the [Discogs API](https://www.discogs.com/developers).

## Development

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
