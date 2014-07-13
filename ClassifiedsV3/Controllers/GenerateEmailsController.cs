using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Classifieds.Service;
using System.Threading.Tasks;

namespace ClassifiedsV3.Controllers
{
    public class GenerateEmailsController : Controller
    {
        //
        // GET: /GenerateEmails/

        public async Task<string> Index()
        {
            var _svc = new PostService();
            Task.Run(() => _svc.GenerateEmails());

            return "Email will be generated asynchronously";
        }        
    }
}
