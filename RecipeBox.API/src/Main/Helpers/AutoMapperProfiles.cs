using System.Linq;
using AutoMapper;
using RecipeBox.API.src.Main.Dtos;
using RecipeBox.API.src.Main.Models;

namespace RecipeBox.API.src.Main.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember( dest => dest.PhotoUrl, opt =>
                    opt.MapFrom(src => src.UserPhotos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<User, UserForDetailedDto>()
                .ForMember( dest => dest.PhotoUrl, opt =>
                    opt.MapFrom(src => src.UserPhotos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<UserPhoto, PhotosForDetailedDto>();
            CreateMap<Post, PostsForDetailedDto>();
            CreateMap<Post, PostsForListDto>();
            CreateMap<PostForCreationDto, Post>();
            CreateMap<Post, PostForCreationDto>();
        
        }
    }
}