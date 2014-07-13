using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Classifieds.Service.ViewModels
{
    public class SubsctiptionVM
    {
        public bool HousingSubscribed { get; set; }
        public bool ElectronicsSubscribed { get; set; }
        public bool BooksSubscribed { get; set; }
        public bool HomeGoodsSubscribed { get; set; }
        public bool MiscSubscribed { get; set; }
    }

    public class UpdateSubscriptionVM
    {
        public int CategoryId { get; set; }
        public int Action { get; set; }
        public int UserId { get; set; }
    }
}
