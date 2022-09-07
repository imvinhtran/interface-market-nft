import { configureStore, combineReducers } from '@reduxjs/toolkit';
import web3InfoReducer from './slices/web3InfoSlice';
import allNftsReducer from './slices/allNftsSlice';
import collectionItemReducer from './slices/collectionItemSlice';
import allFavoriteNftsByAddressReducer from './slices/allFavoriteNftsByAddressSlice';
import userAssetReducer from './slices/userAssetSlice';
import nftItemReducer from './slices/nftItemByItemIdSlice';
import darkThemeReducer from './slices/darkThemeSlice';
import loadingReducer from './slices/loadingSlice';
import ratioReducer from './slices/ratioSlice';
import collectionReducer from './slices/collectionSlice';
import tradingReducer from './slices/tradingSlice';
import buyReducer from './slices/buySlice';
import stepReducer from './slices/stepSlice';
import userReducer from './slices/userSlice';
import modalReducer from './slices/modalSlice';
import tokenPaymentReducer from './slices/tokenPaymentSlice';
import orderReducer from './slices/orderSlice';
import signatureReducer from './slices/signatureSlice';
import listTopCollectionReducer from './slices/listTopCollectionSlice';
import listTopNftVolumeTradeReducer from './slices/listTopNftVolumeTrade';
import collectionCategoryReducer from './slices/collectionCategorySlice';
import collectionTrendingReducer from './slices/collectionTrendingSlice';

const rootReducer = combineReducers({
	allNfts: allNftsReducer, //fetch all nfts
	userAsset: userAssetReducer, //fetch all nfts by address (using in info account)
	collectionItem: collectionItemReducer, //fetch all nfts by address and collection id (using in detail collection)
	allFavoriteNftsByAddress: allFavoriteNftsByAddressReducer, //fetch all favorite nfts by address (using in info account)
	nftItem: nftItemReducer,
	web3Info: web3InfoReducer,
	darkTheme: darkThemeReducer,
	loading: loadingReducer,
	ratio: ratioReducer,
	collection: collectionReducer,
	tradeHistory: tradingReducer,
	buyAction: buyReducer,
	step: stepReducer,
	user: userReducer,
	modal: modalReducer,
	tokenPayment: tokenPaymentReducer,
	order: orderReducer,
	signature: signatureReducer,
	listTopCollection: listTopCollectionReducer,
	listTopNftVolumeTrade: listTopNftVolumeTradeReducer,
	collectionCategory: collectionCategoryReducer,
	trendingCollection: collectionTrendingReducer,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			immutableCheck: false,
		}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const { dispatch, getState } = store;

export { store, dispatch, getState };
