import { ListItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Create } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import './TodoForm.css';

// Form to add new todos
export default function TodoForm({ addTodo }) {
	const [text, setText] = useState('');
	// Update textfield on input
	const handleChange = (evt) => {
		setText(evt.target.value);
	};

	// On submit prevent reload and add todo
	const handleSubmit = (e) => {
		e.preventDefault();
		addTodo(text);
		setText('');
	};

	return (
		<ListItem
			sx={{
				paddingLeft: '8px',
				paddingRight: '8px',
			}}>
			<form onSubmit={handleSubmit}>
				<TextField
					id="outlined-basic"
					label="Type Here"
					variant="outlined"
					onChange={handleChange}
					value={text}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton aria-label="create todo" edge="end" type="submit">
									<Create />
								</IconButton>
							</InputAdornment>
						),
					}}
					sx={{
						width: '100%',
					}}
				/>
			</form>
		</ListItem>
	);
}
