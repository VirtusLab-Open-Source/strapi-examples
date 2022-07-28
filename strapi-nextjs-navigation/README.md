# Strapi Plugin Navigation example with NextJS

This example is set up to show how to create a project with our navigation plugin installed as well as integrate it with a sample frontend.

## 🔧 Getting Started

To run this project, you need to prepare two shell windows. One window will be used to set up and run strapi server and the second one will be used to run development server for nextjs frontend.

### Strapi Server

Install all packages

```sh
cd ./strapi-app
yarn install
```

Run the server

> Before running the strapi server be sure to create your own `.env` file. Example of this file can be found in strapi app folder. 
```sh
yarn build
yarn develop 
# or 
yarn develop --watch-admin
```

After that open strapi admin panel and create admin user. The strapi project should be ready to use at this point. 

### NextJS development server

Install all packages
```sh
cd ./next-app
yarn install
```

Run the server
```sh
yarn dev
```

After that the nextJs frontend should be ready to use. You can direct to `localhost:3000` to see it.