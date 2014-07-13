using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Classifieds.Service;

namespace Classifieds.Service.ViewModels
{
    public class PostVM
    {
        public int ID { get; set; }
        public int UserId { get; set; }
        public string Category { get; set; }
        public int CategoryId { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public string Date { get; set; }
        public string Gravatar { get; set; }
    }
}