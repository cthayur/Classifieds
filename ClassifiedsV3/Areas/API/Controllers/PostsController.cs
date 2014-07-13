using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Classifieds.Data.DataContext;
using Classifieds.Data.Models;
using Newtonsoft.Json;
using Classifieds.Service;
using Classifieds.Service.ViewModels;

namespace ClassifiedsV3.Areas.API.Controllers
{
    [Authorize]
    public class PostsController : ApiController
    {
        PostService _service;
        public PostsController()
        {
            _service = new PostService();
        }

        [HttpGet]
        public IEnumerable<PostVM> GetPostsByCategory(int id)
        {
            return _service.GetPostsByCategory(id);
        }

        [HttpGet]
        public IEnumerable<MixedBagVM> GetMixedBagData()
        {
            return _service.GetMixedBagData();
        }

        [HttpGet]
        public IEnumerable<PostVM> GetPostForUser(int id)
        {
            return _service.GetUserPosts(id);
        }
        
        [HttpPost]
        public PostVM Post(PostVM post)
        {
            _service.AddPost(post);

            return post;
        }

        [HttpPut]
        public void Put(PostVM post)
        {
            _service.UpdatePost(post);
        }

        [HttpPut]
        public void DisablePost(int id)
        {
            _service.DisablePost(id);
        }

        [HttpDelete]
        public void Delete(int id)
        {
            _service.DeletePost(id);
        }
    }
}
