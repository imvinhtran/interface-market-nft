# NFTs Forbitswap Interface <!-- omit in toc -->

[![https://badges.frapsoft.com/os/mit/mit.svg?v=102](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://opensource.org/licenses/MIT)

</br>
<div align="center">
    <img src="./assets/images/nft-logo.png" alt="NFT marketplace logo" width="400"/>
</div>
</br>

This is a complete UI for NFTs market place consist of enormous pages and component allow user to tracking their account, directly minting collections of assets on blockchain, listing all assets that have been created and trading asset between each users.

Published on [GitHub](https://github.com/forbitswap/forbitswap-nfts-interface-v2)

## Installation

We recommend switching to Node.js version 10 to make sure common crypto dependencies work.

Use the package manager _[npm](https://nodejs.org/en/download/)_ to install package.

```bash
npm install
```

Use the package manager _[yarn](https://yarnpkg.com/getting-started/install)_ to install package.

```bash
yarn install
```

## Configuration

Copy _.env_ file.

```bash
cp -R .env.example .env
```

Fill in _.env_ file.

```bash
SKIP_PREFLIGHT_CHECK=
REACT_APP_CHAIN_ID=
REACT_APP_NETWORK_URL=
ENV=
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

_[MIT](https://spdx.org/licenses/MIT.html)_
