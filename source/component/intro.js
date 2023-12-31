import React from 'react';
import { Text, Newline } from 'ink';
import theme from "../Theme.js"

const Intro = () => {
    return ( 
			<Text color={theme.neonGreen}>
			<Text>   __  __                __      __          ____  ____  ____      ____________________<Newline/></Text>
			<Text>  / / / /___        ____/ /___ _/ /____     / __ \/ __ \/ __ \    / / ____/ ____/_  __/<Newline/></Text>
			<Text> / / / / __ \______/ __  / __ `/ __/ _ \   / /_/ / /_/ / / / /_  / / __/ / /     / /   <Newline/></Text>
			<Text>/ /_/ / /_/ /_____/ /_/ / /_/ / /_/  __/  / ____/ _, _/ /_/ / /_/ / /___/ /___  / /    <Newline/></Text>
			<Text>\____/ .___/      \__,_/\__,_/\__/\___/  /_/   /_/ |_|\____/\____/_____/\____/ /_/     <Newline/></Text>
			<Text>    /_/                                                                                <Newline/></Text>
		</Text>
    );
}
export default Intro;