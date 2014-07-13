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
using Classifieds.Service.Services;

namespace ClassifiedsV3.Areas.API.Controllers
{
    [Authorize]
    public class UsersController : ApiController
    {
        UsersService _service;
        public UsersController()
        {
            _service = new UsersService();
        }

        [HttpGet]
        public UserVM GetUserInfo(int id)
        {
            return _service.GetUser(id);
        }

        [HttpPut]
        public void LockUser(int id)
        {
            _service.LockUser(id);
        } 
    }
}
