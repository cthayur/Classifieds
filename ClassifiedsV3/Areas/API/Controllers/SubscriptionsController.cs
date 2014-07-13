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
    public class SubscriptionsController : ApiController
    {
        SubscriptionService _service;         
        public SubscriptionsController()
        {
            _service = new SubscriptionService();
        }
        // GET api/subscriptions/5
        public SubsctiptionVM Get(int id)
        {
            return _service.GetUserSubscriptions(id);
        }

        // PUT api/subscriptions/5
        public SubsctiptionVM Put(UpdateSubscriptionVM data)
        {
            return _service.UpdateSubscription(data);
        }
    }
}
