/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';
//mui
import { Container } from '@mui/material';
//components
import FormAddOrEditCollection, {
	IFormAddOrEditCollectionInputs,
} from 'components/Form/FormAddOrEditCollection';
import Loading from 'components/CustomUI/LoadingPage';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
//utils
import { convertBuffer, addIPFS } from 'utils';
//models
import { Collection, CreateCollectionInput, Response, UploadItemResponse } from 'models';
import collectionApi from 'apis/collectionApi';
import uploadApi from 'apis/uploadApi';

export interface CreateCollectionProps {}

export default function CreateCollection(props: CreateCollectionProps) {
	const { pathname } = useLocation();
	const isEdit = pathname.includes('edit');
	let { collectionId } = useParams();
	const navigate = useNavigate();

	const [collection, setCollection] = useState<Collection>();
	const [loading, setLoading] = useState<boolean>(false);
	const [collectionName, setCollectionName] = useState<string>('');
	const [oldCollectionName, setOldCollectionName] = useState<string>('');
	const [existed, setExisted] = useState<boolean>(false);
	const [loadingCheckName, setLoadingCheckName] = useState<boolean>(false);
	const [listCategory, setListCategory] = useState<any>([]);

	//selector
	const address = useSelector(selectAddress);
	const chainId = useSelector(selectChainId);

	// fetch Collection by id
	useEffect(() => {
		if (!collectionId) return;
		(async () => {
			try {
				setLoading(true);
				const response: any = await collectionApi.getCollectionById(collectionId);

				const collectionResponse: Collection = response;
				setCollection(collectionResponse);
				setOldCollectionName(collectionResponse.collectionName);

				setLoading(false);
			} catch (error: any) {
				setLoading(false);
				toast.error(error.message);
			}
		})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [collectionId]);

	// Check exist collection's name
	useEffect(() => {
		if (collectionName === '' || (isEdit && collectionName === oldCollectionName)) return;
		(async () => {
			setLoadingCheckName(true);
			const result = await collectionApi.checkExistCollectionName(collectionName, chainId);
			setExisted(result);
			setLoadingCheckName(false);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chainId, collectionName]);

	// fetch list category of collection
	useEffect(() => {
		(async () => {
			try {
				const res = await collectionApi.getAllCategory();
				setListCategory(res);
			} catch (error: any) {
				toast.error(error.message);
			}
		})();
	}, []);

	// create or update collection function
	const onSubmit = async (data: IFormAddOrEditCollectionInputs) => {
		const logo: any = data.logo;
		const background: any = data.background;
		let logoURL: string = '';
		let backgroundURL: string = '';

		console.log('form', data);

		try {
			if (typeof logo === 'string') {
				logoURL = logo;
			} else {
				console.log('asdasd');
				const logoForm = new FormData();
				logoForm.append('file', logo.raw);
				logoURL = await uploadApi.uploadCollectionMedia(logoForm);
			}

			if (typeof background === 'string') {
				backgroundURL = background;
			} else {
				const backgroundForm = new FormData();
				backgroundForm.append('file', background.raw);
				backgroundURL = await uploadApi.uploadCollectionMedia(backgroundForm);
			}

			if (!isEdit) {
				const newData: CreateCollectionInput = {
					...data,
					logo: logoURL,
					background: backgroundURL,
					userAddress: address!,
					collectionStandard: 'ERC1155',
				};

				await collectionApi.createCollection(newData);
				navigate('/my-collection');
				toast.success('Create collection success!!');
			} else {
				if (collection && collectionId) {
					const updateData: CreateCollectionInput = {
						...collection,
						...data,
						logo: logoURL,
						background: backgroundURL,
						collectionStandard: 'ERC1155',
					};

					await collectionApi.editCollection(updateData, collectionId);
					navigate(`/collections/view/${collectionId}`);
					toast.success('Update collection success!!');
				}
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	// Check collection nam already existed
	const checkExistCollectionName = (value: any) => {
		if (value === '') {
			setExisted(false);
		}
		setCollectionName(value);
	};

	return (
		<Container>
			{loading ? (
				<Loading />
			) : (
				<FormAddOrEditCollection
					isEdit={isEdit}
					onSubmit={onSubmit}
					currentCollection={collection}
					checkExistCollectionName={checkExistCollectionName}
					existed={existed}
					loadingCheckName={loadingCheckName}
					listCategory={listCategory}
				/>
			)}
		</Container>
	);
}
