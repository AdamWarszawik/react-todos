import List from '@mui/material/List';

import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { Box, Typography } from '@mui/material';

// Load data from local storage
const getInitialData = () => {
	const data = JSON.parse(localStorage.getItem('todos'));
	if (!data) return [];
	return data;
};

// Render the list of todos from memory
export default function TodoList() {
	const [todos, setTodos] = useState(getInitialData);

	// When todo is updated, update local memory
	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	// Remove items from list
	const removeTodo = (id) => {
		setTodos((prevTodos) => {
			return prevTodos.filter((t) => t.id !== id);
		});
	};

	// Toggle checkmark between completed and not completed
	const toggleTodo = (id) => {
		setTodos((prevTodos) => {
			return prevTodos.map((todo) => {
				if (todo.id === id) {
					return { ...todo, completed: !todo.completed };
				} else {
					return todo;
				}
			});
		});
	};

	// Add an item
	const addTodo = (text) => {
		setTodos([
			...todos,
			{ text: text, id: crypto.randomUUID(), completed: false },
		]);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
				alignItems: 'center',
				m: 3,
			}}>
			<Typography variant="h2" component="h2" sx={{ flexGrow: 1 }}>
				Todos
			</Typography>
			<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
				{todos.map((todo) => (
					<TodoItem
						todo={todo}
						key={todo.id}
						removeTodo={() => removeTodo(todo.id)}
						toggleTodo={() => toggleTodo(todo.id)}
					/>
				))}
				<TodoForm addTodo={addTodo} />
			</List>
		</Box>
	);
}
