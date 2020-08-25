import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const PostItem = ({
	auth,
	post: {
		postId,
		nameOfDish,
		description,
		prepTime,
		cookingTime,
		averageRating,
		cuisine,
		comments,
		postPhoto,
		created,
		userId
	}
}) => {
	return (
		<div class='post bg-white p-1 my-1'>
			<div>
				<Link to={`/api/users/${userId}`}>
					<img
						class='round-img'
						src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
						alt=''
					/>
					<h4>John Doe</h4>
				</Link>
			</div>
			{/* <div class="recipe-pics">
          <Link to={`/api/posts/${postId}`}>
            
              <img class="recipe"
                src="https://www.thespruceeats.com/thmb/5EJU2Kz4m7N3i2tTZe1G_wyzoVc=/1500x844/smart/filters:no_upscale()/classic-southern-fried-chicken-3056867-11_preview-5b106156119fa80036c19a9e.jpeg">
           
            <h2>Fried Chicken</h2>
            <p class="my-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              possimus corporis sunt necessitatibus! Minus nesciunt soluta
              suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
              dolor? Illo perferendis eveniet cum cupiditate aliquam?
            </p>
            <p class="post-date">
              Posted on 04/16/2019
            </p>
            <button type="button" class="btn btn-light">
              <i class="fas fa-thumbs-up"></i>
              <span>4</span>
            </button>
            <button type="button" class="btn btn-light">
              <i class="fas fa-thumbs-down"></i>
              <span>2</span>
            </button>

            <a href="post.html" class="btn btn-primary">
              Discussion <span class='comment-count'>2</span>
            </a>
            <button type="button" class="btn btn-danger">
              <i class="fas fa-times"></i>
            </button>
          </Link>
        </div> */}
		</div>
	);
};

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, {})(PostItem);