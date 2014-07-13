using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Classifieds.Service.ViewModels
{
    public class MixedBagVM
    {
        public string Group { get; set; }
        public int ID { get; set; }
        public IEnumerable<PostVM> Items { get; set; }
    }
}