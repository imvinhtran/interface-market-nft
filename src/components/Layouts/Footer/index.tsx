/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
// styled
import { FooterHome, Column1, Column2, Column3, Column1Item, Column1Link } from './styled';
// mui
import { Grid, Box } from '@mui/material';
// images
import ImageTwitter from 'assets/images/footer/twitter.webp';
import ImageTele from 'assets/images/footer/tele.webp';
import ImageGithub from 'assets/images/footer/github.webp';
import ImageMedium from 'assets/images/footer/medium.webp';
import ImageDiscord from 'assets/images/footer/discord.webp';
import ImageStar from 'assets/images/footer/star.webp';
import ImageTag from 'assets/images/footer/tag.webp';
import LogoSpaceX from 'assets/images/home/logoSpaceX.webp';

const Footer: React.FC = () => {
	return (
		<FooterHome container spacing={2} direction={{ xs: 'column-reverse', xl: 'row' }}>
			<Grid item md={4} xs={12}>
				<Column1
					direction="row"
					justifyContent={{ xs: 'space-around', sm: 'center', xl: 'flex-start' }}
					alignItems={{ lg: 'center' }}
					spacing={{ xs: 0, sm: 2 }}
				>
					<Column1Item>
						<img src={ImageTag} alt="tag icon" width={12} height={20} />
						<Column1Link
							href="https://forbitswap.com/privacy-policy.pdf"
							target="_blank"
						>
							Privacy Policy
						</Column1Link>
					</Column1Item>
					<Column1Item>
						<img src={ImageTag} alt="tag icon" width={12} height={20} />
						<Column1Link
							href="https://forbitswap.com/terms-of-service.pdf"
							target="_blank"
						>
							Terms of service
						</Column1Link>
					</Column1Item>
					<Column1Item>
						<img src={ImageStar} alt="star icon" width={20} height={20} />
						<Column1Link href="https://forbitswap.com/" target="_blank">
							forbitswap
						</Column1Link>
					</Column1Item>
				</Column1>
			</Grid>

			<Grid item md={4} xs={12}>
				<Column2>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							textAlign: 'center',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<img
							src={LogoSpaceX}
							alt="loading space"
							width="30"
							height="30"
							style={{ marginRight: '7px' }}
						/>
						<a href="#" target="_blank" rel="noreferrer">
							forbitspace foundation LLC
						</a>
					</Box>
					<a href="#" target="_blank" rel="noreferrer">
						© 2021 @forbitspace, All Rights Reserved
					</a>
				</Column2>
			</Grid>

			<Grid item md={4} xs={12}>
				<Column3
					direction="row"
					justifyContent={{ xs: 'center', xl: 'flex-end' }}
					alignItems="center"
					spacing={{ lg: 4, md: 2, sm: 2, xs: 2 }}
				>
					<a href="https://twitter.com/forbitswap" target="_blank" rel="noreferrer">
						<img src={ImageTwitter} alt="twitter icon" />
					</a>
					<a href="https://t.me/forbitswap" target="_blank" rel="noreferrer">
						<img src={ImageTele} alt="telegram icon" />
					</a>
					<a href="https://github.com/forbitswap" target="_blank" rel="noreferrer">
						<img src={ImageGithub} alt="github icon" />
					</a>
					<a href="https://medium.com/@forbitswap" target="_blank" rel="noreferrer">
						<img src={ImageMedium} alt="medium icon" />
					</a>
					<a href="https://discord.gg/CnJqNa2wfG" target="_blank" rel="noreferrer">
						<img src={ImageDiscord} alt="discord icon" />
					</a>
				</Column3>
			</Grid>
		</FooterHome>
	);
};
export default React.memo(Footer);
