using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;
using RecipeBox.API.Controllers;
using RecipeBox.API.Data;
using RecipeBox.API.Dtos.PostDtos;
using RecipeBox.API.Helpers;
using RecipeBox.API.Models;
using Xunit;

namespace RecipeBox.Tests.ControllerTests
{
    public class FilterPostsControllerTests
    {
        private Mock<IRecipeRepository> _repoMock;
        private FilterPostsController _filterPostsController;
        private CalculateAverageRatings _calculateAverageRatings;

        public FilterPostsControllerTests()
        {
            _repoMock = new Mock<IRecipeRepository>();

            var mockMapper = new MapperConfiguration(cfg => { cfg.AddProfile(new AutoMapperProfiles()); });

            var mapper = mockMapper.CreateMapper();

            _filterPostsController = new FilterPostsController(_repoMock.Object, mapper);

            _calculateAverageRatings = new CalculateAverageRatings(_repoMock.Object);
        }

        

        [Fact]
        public void SortPosts_ByUser_User_Has_No_Posts_Returns_NotFound()
        {
            // Arrange
            int userId = 2;
            var userFromRepo = GetFakeUsers().SingleOrDefault(x => x.Id == userId);
            var postsFromRepo = GetFakePosts();

            // Act
            _repoMock.Setup(x => x.GetPosts()).ReturnsAsync(postsFromRepo);

            var result = _filterPostsController.SortByUser(userId).Result;

            // Assert
            var okResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal("User has not submitted any posts", okResult.Value);
        }
        
        [Fact]
        public void SortPosts_ByUser_Returns_Posts_Made_By_User()
        {
            // Arrange
            int userId = 1;
            var userFromRepo = GetFakeUsers().SingleOrDefault(x => x.Id == userId);
            var postsFromRepo = GetFakePosts();
            var filteredPosts = postsFromRepo.Where(x => x.UserId == userId);

            // Act
            _repoMock.Setup(x => x.GetPosts()).ReturnsAsync(postsFromRepo);

            var result = _filterPostsController.SortByUser(userId).Result;

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(filteredPosts ,okResult.Value);
        }

        


        private ICollection<Post> GetFakePosts()
        {
            return new List<Post>()
            {
                new Post()
                {
                    PostId = 1,
                    NameOfDish = "ragu",
                    Cuisine = "Italian",
                    Created = new DateTime(2011, 6, 10),
                    Comments = Post1Comments(),
                    Ratings = Post1Ratings(),
                    UserId = 1
                    
                },
                new Post()
                {
                    PostId = 2,
                    NameOfDish = "steak & ale pie",
                    Cuisine = "British",
                    Created = new DateTime(2009, 4, 3),
                    Comments = Post2Comments(),
                    Ratings = Post2Ratings(),
                    UserId = 1
                },
                new Post()
                {
                    PostId = 3,
                    NameOfDish = "pizza",
                    Cuisine = "Italian",
                    Created = new DateTime(2014, 4, 9),
                    Comments = Post3Comments(),
                    Ratings = Post3Ratings(),
                    UserId = 1
                }
            };
        }
        

        private ICollection<Comment> Post1Comments()
        {
            return new List<Comment>()
            {
                new Comment()
                {
                    CommentId = 1,
                    Text = "comment 1",
                    PostId = 1
                }
            };
        }
        
        private ICollection<Comment> Post2Comments()
        {
            return new List<Comment>()
            {
                new Comment()
                {
                    CommentId = 2,
                    Text = "comment 1",
                    PostId = 2
                },
                new Comment()
                {
                    CommentId = 3,
                    Text = "comment 2",
                    PostId = 2
                },
                new Comment()
                {
                    CommentId = 4,
                    Text = "comment 3",
                    PostId = 2
                },
            };
        }
        
        private ICollection<Comment> Post3Comments()
        {
            return new List<Comment>()
            {
                new Comment()
                {
                    CommentId = 5,
                    Text = "comment 1",
                    PostId = 3
                },
                new Comment()
                {
                    CommentId = 6,
                    Text = "comment 2",
                    PostId = 3
                },
                
            };
        }
        private ICollection<Rating> Post1Ratings()
        {
            return new List<Rating>()
            {
                new Rating()
                {
                    RatingId = 1,
                    Score = 4.5,
                    RaterId = 1,
                    PostId = 1
                },
                new Rating()
                {
                    RatingId = 2,
                    Score = 1.8,
                    RaterId = 2,
                    PostId = 1
                }

            };
        }
        private ICollection<Rating> Post2Ratings()
        {
            return new List<Rating>()
            {
                new Rating()
                {
                    RatingId = 3,
                    Score = 5,
                    RaterId = 1,
                    PostId = 2
                }

            };
        }
        private ICollection<Rating> Post3Ratings()
        {
            return new List<Rating>()
            {
                new Rating()
                {
                    RatingId = 4,
                    Score = 2.5,
                    RaterId = 1,
                    PostId = 3
                },
                new Rating()
                {
                    RatingId = 5,
                    Score = 1.5,
                    RaterId = 2,
                    PostId = 3
                }

            };
        }
        
        

        private ICollection<User> GetFakeUsers()
        {
            return new List<User>()
            {
                new User()
                {
                    Id = 1,
                    UserName = "nick",
                    Posts = GetFakePosts()
                },
                new User()
                {
                    Id = 2,
                    UserName = "jim"
                }
            };
        }
    }
}