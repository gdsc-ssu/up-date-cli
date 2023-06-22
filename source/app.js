import React from 'react';
import { Box, Text } from 'ink';
import Enquirer from 'enquirer';

const App = () => {
	const [name, setName] = React.useState();

	React.useEffect(() => {
	  const enquirer = new Enquirer();
	  enquirer
		.prompt({
		  type: 'input',
		  name: 'username',
		  message: 'What is your name?'
		})
		.then(answer => setName(answer.username));
	}, []);
  

	return name ? (
		<Box>
		  <Text>Hello, {name}!</Text>
		</Box>
	  ) : (
		<Box>
		  <Text>Welcome to our CLI App. Please input your name.</Text>
		</Box>
	  );
};

export default App;