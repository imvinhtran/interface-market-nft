/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import NoItemCircleCard from '../Card/NoItemCard/NoItemCircleCard';
//styled
import {
	BoxNoData,
	TableBodyStyle,
	TableContainerScrollable,
	TableData,
	TableHeadStyle,
	TableRowStyle,
	TableStyled,
	ThData,
} from './styled';
// images
import ImageNoOffer from 'assets/icons/no-offers.webp';

export interface CustomTableProps {
	thData: any;
	tdData: any;
	styleHeader?: object;
}

export default function CustomTable({ thData, tdData, styleHeader }: CustomTableProps) {
	const renderTableHeader = () => {
		return Object.values(thData).map((el: any, idx: number) => <ThData key={idx}>{el}</ThData>);
	};
	const renderTableBody = () =>
		tdData?.length > 0 ? (
			tdData.map((item: any, index: number) => (
				<TableRowStyle key={index}>
					{Object.values(item).map((item: any, idx: number) => (
						<TableData key={idx}>{item}</TableData>
					))}
				</TableRowStyle>
			))
		) : (
			<TableRowStyle>
				<TableData>
					<BoxNoData>
						<NoItemCircleCard title="No data yet!" image={ImageNoOffer} />
					</BoxNoData>
				</TableData>
			</TableRowStyle>
		);

	return (
		<TableStyled>
			<TableContainerScrollable>
				<TableHeadStyle sx={styleHeader}>
					<TableRowStyle>{renderTableHeader()}</TableRowStyle>
				</TableHeadStyle>

				<TableBodyStyle>{renderTableBody()}</TableBodyStyle>
			</TableContainerScrollable>
		</TableStyled>
	);
}
