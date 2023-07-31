import React from 'react';
import { Text, Newline } from 'ink';
import data from '../examples/shop.js';

const ShopDetail = () => {
	
    return (
		<Text>
			<Text>• id : {data.id}<Newline /></Text>
			<Text>• title : {data.title}<Newline /></Text>
			<Text>• location : {data.location}<Newline /></Text>
			<Text>• nearStation : {data.nearStation}<Newline /></Text>
			<Text>• openTime : {data.openTime} ~ {data.closeTime}<Newline /></Text>
			<Text>• menu : {"["}<Newline />
				{data.menu.map(item => (
					<Text key={item.name}>   {"{"} "{item.name}" : {item.price} {"},"}<Newline /></Text>
				))}
				{"]"}
				<Newline />
			</Text>
			<Text>• starRate : {data.starRate}<Newline /></Text>
			<Text>• reviews : {"["}<Newline/> 
				{data.reviews.map(item=> (
					<Text key={item.id}>   {"{"} "{item.writer}" : {item.content} ({item.starRate}) {"},"}<Newline /></Text>
				))}
				{"]"}
				<Newline />
			</Text>
		</Text>
    );
}
export default ShopDetail;