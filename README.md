## Prerequisite for Local Development

1. Spin up Mongo
```bash
# spin up the mongo db
docker-compose up -d 
DB_CONNECTION= "mongodb=//root=example@localhost:27017"
```

2. Set up cloudinary credential by setting these env 
```bash
IMAGE_CLOUD_NAME = "XXX"
IMAGE_API_KEY=  "XXXXX"
IMAGE_API_SECRET= "XXXX"
```

3. set up the testing STMP provider
    options: ethereal[https://ethereal.email/]
```bash
    SMTP_HOST: "",
    SMTP_PORT: "",
    SMTP_USER: "",
    SMTP_PASSWORD: "",
    SMTP_FROM_EMAIL: "",
    SMTP_FROM_NAME: "",
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## TODO

1. Add tests
2. Refactor code => frontend all use redux tool, add more type, abstract more logic
3. Add more features

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
