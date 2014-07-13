using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Classifieds.Service.ViewModels
{
    public class MessageVM
    {
        public int ID { get; set; }
        public int From { get; set; }
        public int To { get; set; }
        public string Date { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public int PostId { get; set; }
        public string PostTitle { get; set; }
    }
}