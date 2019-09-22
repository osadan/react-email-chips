### Email chips component

This is react component to create email chips list

The component can receive the following props

- placeholder - to be placed in the input
- pattern - to validate the chips - can be empty then all chips are valid
- required - force the list to have at least one value
- title - title of the component
- save - a callback to be called on each change (add , delete)

```js
import React from 'react';
import Chips from 'react-email-chips';

function App() {
	const pattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
	return (
		<div className='App'>
			<Chips
				chips={[
					{ email: 'react@gmail.com', valid: true, key: '1' },
					{ email: 'javascript@gmail.com', valid: true, key: '2' },
					{ email: 'scss@gmail.com', valid: true, key: '3' }
				]}
				placeholder='Add a tag...'
				save={data => console.log('new data', data)}
				pattern={pattern}
				required={true}
				title='Email Chips:'
			></Chips>
		</div>
	);
}
```

## License

MIT Licensed.
