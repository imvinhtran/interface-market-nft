/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// redux state
import { useSelector } from 'react-redux';
import { selectChainId } from 'redux/slices/web3InfoSlice';
// component
import TextGradient from 'components/CustomUI/TextGradient';
import CommonListCollection from '../CommonListCollection';
// apis
import collectionApi from 'apis/collectionApi';
// models
import { Collection, ListResponse } from 'models';

function NewCollections() {
	// useState
	const [newsCollection, setNewCollections] = useState<Collection[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// useSelector
	const chainId = useSelector(selectChainId);

	useEffect(() => {
		(async () => {
			if (chainId) {
				setIsLoading(true);
				try {
					const response: ListResponse<Collection> =
						await collectionApi.fetchNewCollectionsPagination(10, 1);
					setNewCollections(response.data);
				} catch (error) {
					toast.error('Some errors occur when fetching new collections!');
				} finally {
					setIsLoading(false);
				}
			}
		})();
	}, [chainId]);

	return (
		<Fragment>
			<TextGradient title="New Collections">
				<img src="/fire.webp" alt="fire" />
			</TextGradient>

			{/* <CommonListCollection listCollection={newsCollection} isLoading={isLoading} /> */}
		</Fragment>
	);
}

export default NewCollections;
