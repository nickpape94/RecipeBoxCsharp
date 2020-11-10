import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';

// var userImage = !post.postPhoto ? <img src="https://www.pinpng.com/pngs/m/341-3415688_no-avatar-png-transparent-png.png"></img> : <img></img>
// var mainPhoto = post.postPhoto.filter((x) => x.isMain == true);
// console.log(mainPhoto);

const PostItem = ({
	post: {
		postId,
		nameOfDish,
		description,
		prepTime,
		cookingTime,
		averageRating,
		cuisine,
		author,
		userPhotoUrl,
		mainPhoto,
		created,
		ratings,
		feeds,
		userId
	},
	postsFromProfile = false,
	favouritesFromProfile = false
}) => (
	<div className='card'>
		<Link
			to={{
				pathname: `/posts/${postId}`,
				state: {
					postsFromProfile: postsFromProfile,
					favouritesFromProfile: favouritesFromProfile
				}
			}}
		>
			<img
				src={
					mainPhoto ? (
						mainPhoto.url
					) : (
						'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'
					)
				}
				alt=''
				className='card__img'
			/>
		</Link>
		<div className='card__content'>
			<div className='card__header'>
				<Link to={`/posts/${postId}`} className='card__link'>
					<h2>{nameOfDish}</h2>
				</Link>
				<div className='ratings'>
					{averageRating === 0 && (
						<div>
							<span className='far fa-star checked' />
							<span className='far fa-star checked' />
							<span className='far fa-star checked' />
							<span className='far fa-star checked' />
							<span className='far fa-star checked' />
							({ratings.length})
						</div>
					)}
					{averageRating > 0 &&
					averageRating <= 0.5 && (
						<div>
							<span className='fas fa-star-half-alt checked' />
							<span className='far fa-star checked' />
							<span className='far fa-star checked' />
							<span className='far fa-star checked' />
							<span className='far fa-star checked' />
							({ratings.length})
						</div>
					)}
					{averageRating > 0.5 &&
					averageRating <= 1 && (
						<div>
							<span className='fa fa-star checked' />
							<span className='far fa-star checked' />
							<span className='far fa-star checked' />
							<span className='far fa-star checked' />
							<span className='far fa-star checked' />
							({ratings.length})
						</div>
					)}
					{averageRating > 1 &&
					averageRating <= 1.5 && (
						<div>
							<span className='fa fa-star checked' />
							<span className='fas fa-star-half-alt checked' />
							<span className='far fa-star checked ' />
							<span className='far fa-star checked' />
							<span className='far fa-star checked' />
							({ratings.length})
						</div>
					)}
					{averageRating > 1.5 &&
					averageRating <= 2 && (
						<div>
							<span className='fa fa-star checked' />
							<span className='fa fa-star checked' />
							<span className='far fa-star checked' />
							<span className='far fa-star checked' />
							<span className='far fa-star checked' />
							({ratings.length})
						</div>
					)}
					{averageRating > 2 &&
					averageRating <= 2.5 && (
						<div>
							<span className='fa fa-star checked' />
							<span className='fa fa-star checked' />
							<span className='fas fa-star-half-alt checked' />
							<span className='far fa-star checked' />
							<span className='far fa-star checked' />
							({ratings.length})
						</div>
					)}
					{averageRating > 2.5 &&
					averageRating <= 3 && (
						<div>
							<span className='fa fa-star checked' />
							<span className='fa fa-star checked' />
							<span className='fa fa-star checked' />
							<span className='far fa-star checked' />
							<span className='far fa-star checked' />
							({ratings.length})
						</div>
					)}
					{averageRating > 3 &&
					averageRating <= 3.5 && (
						<div>
							<span className='fa fa-star checked' />
							<span className='fa fa-star checked' />
							<span className='fa fa-star checked' />
							<span className='fas fa-star-half-alt checked' />
							<span className='far fa-star checked' />
							({ratings.length})
						</div>
					)}
					{averageRating > 3.5 &&
					averageRating <= 4 && (
						<div>
							<span className='fa fa-star checked' />
							<span className='fa fa-star checked' />
							<span className='fa fa-star checked' />
							<span className='fa fa-star checked' />
							<span className='far fa-star checked' />
							({ratings.length})
						</div>
					)}
					{averageRating > 4 &&
					averageRating <= 4.5 && (
						<div>
							<span className='fa fa-star checked' />
							<span className='fa fa-star checked' />
							<span className='fa fa-star checked' />
							<span className='fa fa-star checked' />
							<span className='fas fa-star-half-alt checked' />
							({ratings.length})
						</div>
					)}
					{averageRating > 4.5 &&
					averageRating <= 5 && (
						<div>
							<span className='fa fa-star checked' />
							<span className='fa fa-star checked' />
							<span className='fa fa-star checked' />
							<span className='fa fa-star checked' />
							<span className='fa fa-star checked' />
							({ratings.length})
						</div>
					)}
				</div>
			</div>

			<p>{description}</p>
			<div className='card__info'>
				<div>
					<i className='fas fa-utensils' />
					{' ' + cuisine}
				</div>
				<div>
					<i className='far fa-clock' /> Prep Time: {prepTime}
				</div>
				<div>
					<i className='fas fa-clock' /> Cooking Time: {cookingTime}
				</div>
				<div>
					<i className='fas fa-user-friends' /> Feeds: {feeds}
				</div>
			</div>

			<div className='card__footer'>
				<Link to={`/users/${userId}`}>
					<div>
						{userPhotoUrl ? (
							<img className='icon-b' src={userPhotoUrl} />
						) : (
							<i className='fas fa-user fa-3x icon-a' />
						)}
					</div>
					<h3> {author}</h3>
				</Link>

				<div>
					<h4>
						Posted on: <Moment format='DD/MM/YYYY'>{created}</Moment>
					</h4>
				</div>
			</div>
		</div>
	</div>
);

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { getPost })(PostItem);
