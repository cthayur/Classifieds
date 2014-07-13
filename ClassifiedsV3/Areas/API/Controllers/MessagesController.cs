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
    public class MessagesController : ApiController
    {
        MessageService _service;
        public MessagesController()
        {
            _service = new MessageService();
        }

        [HttpGet]
        public IEnumerable<MessageVM> Get(int id)
        {
            return _service.GetUserMessages(id);
        }

        [HttpPost]
        public void Post(MessageVM message)
        {
            _service.AddMessage(message);
        }

        [HttpDelete]
        public void Delete(int id)
        {
            _service.DeleteMessage(id);
        }
    }
}
