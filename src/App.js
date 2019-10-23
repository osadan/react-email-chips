import React from 'react';
import './App.css';
import Chips from './chips/Chips';

function App() {
	const pattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
	return (
		<div className="App">
			<Chips
				chips={[
					{ email: 'react@gmail.com', valid: true, key: '1' },
					{ email: 'javascript@gmail.com', valid: true, key: '2' },
					{ email: 'scss@gmail.com', valid: true, key: '3' }
				]}
				placeholder=""
				save={data => console.log('new data', data)}
				pattern={pattern}
				required={true}
				requiredMessage="* At least one valid email is required"
				title="Send notifications to:"
				limit="3"
				limitMessage="You’ve hit the maximum number of emails"
			></Chips>
		</div>
	);
}

export default App;
