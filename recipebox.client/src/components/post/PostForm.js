import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { createPost } from '../../actions/post';
import PropTypes from 'prop-types';

const PostForm = ({ createPost, auth: { user }, history }) => {
	const [ formData, setFormData ] = useState({
		nameOfDish: '',
		description: '',
		ingredients: '',
		method: '',
		prepTime: '',
		cookingTime: '',
		feeds: '',
		cuisine: ''
	});

	const [ isError, setError ] = useState(false);

	useEffect(
		() => {
			if (isError) {
				window.scrollTo(0, 0);
			}
		},
		[ isError ]
	);

	const { cuisine, nameOfDish, description, ingredients, method, prepTime, cookingTime, feeds } = formData;

	const [ isDataChanged, setDataChanged ] = useState(false);

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setDataChanged(true);
	};

	// Get user Id
	const userId = user && user.id;

	const onSubmit = async (e) => {
		e.preventDefault();
		setDataChanged(false);
		createPost(userId, history, setError, {
			nameOfDish,
			description,
			ingredients,
			method,
			prepTime,
			cookingTime,
			feeds,
			cuisine
		});
	};

	return (
		<Fragment>
			<Prompt when={isDataChanged} message='Are you sure you want to leave? All fields will be lost.' />
			<h1 className='large text-primary'>Create a Recipe</h1>
			<p className='lead'>
				<i className='fas fa-bacon' /> Share your delicious meals with the community!
			</p>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<div className='form-group'>
					<select
						name='cuisine'
						type='text'
						placeholder='Select Cuisine'
						name='cuisine'
						value={cuisine}
						required
						onChange={(e) => onChange(e)}
					>
						<option value=''>* Select Cuisine</option>
						<option value='African'>African</option>
						<option value='American'>American</option>
						<option value='British'>British</option>
						<option value='Caribbean'>Caribbean</option>
						<option value='Chinese'>Chinese</option>
						<option value='East European'>East European</option>
						<option value='French'>French</option>
						<option value='Greek'>Greek</option>
						<option value='Indian'>Indian</option>
						<option value='Italian'>Italian</option>
						<option value='Japanese'>Japanese</option>
						<option value='Korean'>Korean</option>
						<option value='Mexican'>Mexican</option>
						<option value='North African'>Middle Eastern</option>
						<option value='Pakistani'>Pakistani</option>
						<option value='Portuguese'>Portuguese</option>
						<option value='South American'>South American</option>
						<option value='Spanish'>Spanish</option>
						<option value='Thai and South-East Asian'>Thai and South-East Asian</option>
						<option value='Turkish and Middle Eastern'>Turkish and Middle Eastern</option>
						<option value='Other'>Other</option>
					</select>
					<small className='form-text'>Please specify which cusine type this is</small>
				</div>
				<div className='form-group'>
					<input
						type='nameOfDish'
						placeholder='Name of Dish'
						name='nameOfDish'
						value={nameOfDish}
						required
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<textarea
						cols='30'
						rows='5'
						placeholder='Description'
						type='description'
						name='description'
						value={description}
						required
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<textarea
						cols='30'
						rows='5'
						placeholder='Ingredients'
						type='ingredients'
						name='ingredients'
						value={ingredients}
						required
						onChange={(e) => onChange(e)}
					/>
					<small className='form-text'>
						Please use comma separated values (eg.Beef, Tomatoes, Coriander, Turmeric)
					</small>
				</div>
				<div className='form-group'>
					<textarea
						cols='30'
						rows='20'
						placeholder='Method'
						type='method'
						name='method'
						value={method}
						required
						onChange={(e) => onChange(e)}
					/>
					<small className='form-text'>Please leave a line and numerate each stage of the method (eg)</small>
					<small className='form-text'>(1) Prepare marinade</small>
					<small className='form-text'>(2) Let meat marinade for 5 hours</small>
				</div>
				<span className='form-group'>
					<input
						type='preptime'
						placeholder='Prep time'
						name='prepTime'
						value={prepTime}
						required
						onChange={(e) => onChange(e)}
					/>
				</span>
				<span className='form-group'>
					<input
						type='cookingtime'
						placeholder='Cooking time'
						name='cookingTime'
						value={cookingTime}
						required
						onChange={(e) => onChange(e)}
					/>
				</span>
				<span className='form-group'>
					<input
						type='feeds'
						placeholder='Feeds'
						name='feeds'
						value={feeds}
						required
						onChange={(e) => onChange(e)}
					/>
				</span>
				<div className='form-group'>
					<input type='submit' className='btn btn-primary' value='Next' />
				</div>
			</form>
			{/* {postSubmitted && <Redirect to='/posts' />} */}
		</Fragment>
	);
};

PostForm.propTypes = {
	createPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
	// postSubmitted: PropTypes.bool
};

const mapStateToProps = (state) => ({
	auth: state.auth
	// postSubmitted: state.post.postSubmitted
});

export default connect(mapStateToProps, { setAlert, createPost })(PostForm);
