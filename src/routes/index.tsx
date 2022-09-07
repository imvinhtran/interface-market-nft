import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
//layout
import LayoutForbitNFTs from 'layouts/LayoutForbitNFTs';
// import LoadingPage from 'components/CustomUI/LoadingPage';
//guard
import AccountGuard from 'guards/AccountGuard';
import Loadable from 'components/CustomUI/LoadableComponent';

export default function Router() {
	return useRoutes([
		{
			path: '/',
			element: <LayoutForbitNFTs />,
			children: [
				{ path: '/', element: <Home /> },
				{ path: '/all-nfts', element: <AllNfts /> },
				{ path: '/trending-collections', element: <TrendingCollections /> },
				{ path: '/my-collection', element: <MyCollection /> },
				{ path: '/collections/view/:collectionId', element: <CollectionDetail /> },
				{ path: '/detail/:itemId', element: <ItemDetail /> },
				{ path: '/view-all', element: <ViewAll /> },
				{
					path: '/info-account/:infoAccountAddress',
					element: <OtherInfoAccount />,
				},
				{
					path: '/my-info-account',
					element: (
						<AccountGuard>
							<MyInfoAccount />
						</AccountGuard>
					),
				},
				{
					path: '/info-account/add-item',
					element: (
						<AccountGuard>
							<CreateOrEditItem />
						</AccountGuard>
					),
				},
				{
					path: '/collections/add-item/collectionId/:collectionId',
					element: (
						<AccountGuard>
							<CreateOrEditItem />
						</AccountGuard>
					),
				},
				{
					path: '/edit-item/itemId/:itemId',
					element: (
						<AccountGuard>
							<CreateOrEditItem />
						</AccountGuard>
					),
				},

				{
					path: '/sell-item/:itemId',
					element: (
						<AccountGuard>
							<SellItem />
						</AccountGuard>
					),
				},
				{
					path: '/collections/create-collection',
					element: (
						<AccountGuard>
							<CreateOrEditCollection />
						</AccountGuard>
					),
				},
				{
					path: '/collections/edit-collection/:collectionId',
					element: (
						<AccountGuard>
							<CreateOrEditCollection />
						</AccountGuard>
					),
				},
				{ path: '/test', element: <TestTheme /> },
				{
					path: '/test-grid',
					element: <TestGrid />,
				},
			],
		},
		{ path: '/privacy-policy', element: <PrivacyPolicy /> },
		{ path: '/404', element: <NotFound /> },
		{ path: '*', element: <Navigate to="/404" replace /> },
	]);
}

//IMPORT COMPONENTS
const Home = Loadable(lazy(() => import('../pages/Home')));
const AllNfts = Loadable(lazy(() => import('../pages/AllNfts')));
const TrendingCollections = Loadable(lazy(() => import('../pages/TrendingCollections')));
const ViewAll = Loadable(lazy(() => import('../pages/ViewAll')));

// account
const MyInfoAccount = Loadable(lazy(() => import('../pages/MyInfoAccount')));
const OtherInfoAccount = Loadable(lazy(() => import('../pages/OtherInfoAccount')));

// collection
const MyCollection = Loadable(lazy(() => import('../pages/MyCollection')));
const CollectionDetail = Loadable(lazy(() => import('../pages/CollectionDetail')));
const CreateOrEditCollection = Loadable(lazy(() => import('../pages/CreateOrEditCollection')));

// item
const ItemDetail = Loadable(lazy(() => import('../pages/ItemDetail')));
const CreateOrEditItem = Loadable(lazy(() => import('../pages/CreateOrEditItem')));
const SellItem = Loadable(lazy(() => import('../pages/SellItem')));

// extra
const TestTheme = Loadable(lazy(() => import('../pages/Test')));
const TestGrid = Loadable(lazy(() => import('../pages/Test/TestGrid')));
const NotFound = Loadable(lazy(() => import('../pages/NotFound')));

//Privacy Policy
const PrivacyPolicy = Loadable(lazy(() => import('../components/pages/PrivacyPolicy')));
