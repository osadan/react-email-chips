### Email chips component

This is react component to create email chips list

I know there is more advanced component's of this type
but this gives exactly what I need .

I forked my code from  
https://codepen.io/broneks/pen/objeqq

The component can receive the following props

- placeholder - to be placed in the input
- pattern - to validate the chips - can be empty then all chips are valid
- required - force the list to have at least one value
- title - title of the component
- save - a callback to be called on each change (add , delete)

```js
import React from 'react';
import Chips from 'react-email-chips';

function DemoComponent() {
	const pattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
	return (
		<div className='Demo'>
			<Chips
				chips={[{ email: 'react@gmail.com', valid: true, key: '1' }, { email: 'javascript@gmail.com', valid: true, key: '2' }, { email: 'scss@gmail.com', valid: true, key: '3' }]}
				placeholder='Add a tag...'
				save={data => console.log('new data', data)}
				pattern={pattern}
				required={true}
				title='Email Chips:'
				limit='5'
				limitMessage='You’ve hit the maximum number of emails'
			></Chips>
		</div>
	);
}
```

### License

MIT Licensed.
