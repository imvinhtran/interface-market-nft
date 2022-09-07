/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
// react-hook-form
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
// yup
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// model
import { CustomFile, User } from 'models';
// images
import ImageInputDefault from 'assets/images/home/image-input-default.webp';
// utils
import { getAccount, renderImage, convertBuffer } from 'utils/function';
// components
import FieldInput from 'components/CustomField/FieldInput';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
import FieldTextArea from 'components/CustomField/FieldTextArea';
import UploadMediaCustom from 'components/CustomField/UploadMediaCustom';
// mui
import { Avatar, Box, CircularProgress, Stack, Typography } from '@mui/material';
// styled
import {
	AvatarChangeable,
	BackgroundChangeable,
	ErrorMessage,
	InputGroup,
	Label,
	TopPart,
	UserBackground,
} from './styled';

export interface FormEditProfileProps {
	infoUser: User | null;
	onSubmit: SubmitHandler<IFormEditProfileInputs>;
	isLoadingEditProfile: boolean;
}

export interface IFormEditProfileInputs {
	avatar: any;
	background: any;
	bio: string;
	email: string;
	username: string;
	social: string;
}

function FormEditProfile({ infoUser, isLoadingEditProfile, onSubmit }: FormEditProfileProps) {
	const [avatar, setAvatar] = useState<CustomFile | string | null>(null);
	const [background, setBackground] = useState<CustomFile | string | null>(null);

	useEffect(() => {
		if (infoUser) {
			setValue(`username`, infoUser.username);
			setValue(`bio`, infoUser.bio);
			setValue(`email`, infoUser.email);
			setValue(`social`, infoUser.social);
			setValue(`avatar`, infoUser.avatar);
			setValue(`background`, infoUser.background);
			setAvatar(infoUser.avatar);
			setBackground(infoUser.background);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [infoUser]);

	const schema = yup
		.object({
			avatar: yup
				.mixed()
				.required()
				.test('require a file', 'avatar is required!', (value: any) => {
					return Boolean(value.length !== 0);
				}),
			background: yup.mixed(),
			bio: yup.string(),
			email: yup.string(),
			username: yup.string().required(),
			social: yup.string(),
		})
		.required();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IFormEditProfileInputs>({
		resolver: yupResolver(schema),
	});

	const handleDropAvatar = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];
			if (file) {
				setValue('avatar', {
					...file,
					preview: URL.createObjectURL(file),
					raw: file,
				});

				setAvatar({ ...file, preview: URL.createObjectURL(file) });
			}
		},
		[setValue]
	);

	const handleDropBackground = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];
			if (file) {
				setValue('background', {
					...file,
					preview: URL.createObjectURL(file),
					raw: file,
				});

				setBackground({ ...file, preview: URL.createObjectURL(file) });
			}
		},
		[setValue]
	);

	return (
		<form action="" onSubmit={handleSubmit(onSubmit)}>
			<TopPart>
				<Stack direction="row" alignItems="center">
					<InputGroup sx={{ margin: 0 }}>
						<UploadMediaCustom
							accept={{
								'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
							}}
							file={avatar}
							maxSize={52428800}
							onDrop={handleDropAvatar}
							error={Boolean(errors.avatar)}
							sx={{
								width: 120,
								height: 120,
								margin: 'auto',
								borderRadius: '50%',
								border: '1px dashed white',
								overflow: 'hidden',
								'.placeholder-img': {
									borderRadius: '50%',
									width: 50,
									height: 50,
								},
							}}
						/>

						{errors.avatar?.message && (
							<ErrorMessage>{errors.avatar?.message}</ErrorMessage>
						)}
					</InputGroup>
					<InputGroup sx={{ flexGrow: 1, marginLeft: '40px', marginTop: 0 }}>
						<Label htmlFor=" user-username">Username</Label>
						<FieldInput
							id="user-username"
							type="text"
							registerHookForm={{ ...register('username') }}
							placeholder="Enter your username"
						/>
						{errors.username?.message && (
							<ErrorMessage>{errors.username?.message}</ErrorMessage>
						)}
					</InputGroup>
				</Stack>
			</TopPart>

			<InputGroup sx={{ marginTop: '20px' }}>
				<Label htmlFor="user-social">Social Media / Portfolio Link</Label>
				<FieldInput
					id="user-social"
					type="text"
					registerHookForm={{ ...register('social') }}
					placeholder="Enter your social"
				/>
				{errors.social?.message && <ErrorMessage>{errors.social?.message}</ErrorMessage>}
			</InputGroup>

			<InputGroup>
				<Label htmlFor="user-bio">Bio</Label>

				<FieldTextArea
					rows={4}
					cols={40}
					registerHookForm={{ ...register('bio') }}
					placeholder="Please write something about yourself"
				/>

				{errors.bio?.message && <ErrorMessage>{errors.bio?.message}</ErrorMessage>}
			</InputGroup>

			<InputGroup>
				<Label htmlFor="user-email">Email</Label>
				<FieldInput
					id="user-email"
					type="text"
					registerHookForm={{ ...register('email') }}
					placeholder="Enter your email"
				/>
				{errors.email?.message && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
			</InputGroup>

			<InputGroup>
				<Label>Banner</Label>

				<UploadMediaCustom
					file={background}
					accept={{
						'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
					}}
					maxSize={52428800}
					onDrop={handleDropBackground}
					error={Boolean(errors.background)}
					sx={{
						width: '100%',
						height: 180,
						margin: 'auto',
						borderRadius: '5px',
						border: '1px dashed',
						overflow: 'hidden',
					}}
				/>

				{errors.background?.message && (
					<ErrorMessage>{errors.background?.message}</ErrorMessage>
				)}
			</InputGroup>

			<Stack alignItems="center" sx={{ marginTop: '20px' }}>
				<ButtonGradient
					sx={{ paddingLeft: '30px', paddingRight: '30px' }}
					type="submit"
					disabled={isLoadingEditProfile}
				>
					<Stack direction="row" alignItems="center">
						{isLoadingEditProfile && (
							<CircularProgress sx={{ color: 'white', mr: 1 }} size={25} />
						)}
						<Typography variant="button">Submit</Typography>
					</Stack>
				</ButtonGradient>
			</Stack>
		</form>
	);
}

export default FormEditProfile;
