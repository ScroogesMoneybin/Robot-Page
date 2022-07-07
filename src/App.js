import React,{Component} from 'react'
import {robots} from './robots';
import CardList from './CardList';
import Searchbox from './Searchbox';
import './index.css';
import Scroll from './Scroll';
import ErrorBoundary from './ErrorBoundary';

const state={

	robots: robots,
	searchfield:''
}

class App extends Component {
	constructor() {
		super()
		this.state={
			robots: robots,
			searchfield:''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=> response.json())
		.then(users =>this.setState({robots: users}));
	}

	OnSearchChange=(event) => {
		this.setState({searchfield:event.target.value})
				
	}
	render() {
		const filteredRobots=this.state.robots.filter(robot=> {
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		})
		if (this.state.robots.length===0) {
			return <h1>Loading</h1>
		}
		else {
		return (
			<div className='tc'>
				<h1 className='white f1'>Robofriends</h1>
				<Searchbox searchChange={this.OnSearchChange}/>
				<Scroll>
					<ErrorBoundary>
						<CardList robots={filteredRobots}/>
					</ErrorBoundary>
				</Scroll>
			</div>
		);
	}
	}
}

export default App;