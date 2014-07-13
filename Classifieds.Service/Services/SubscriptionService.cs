using Classifieds.Data.DataContext;
using Classifieds.Data.Models;
using Classifieds.Service.ViewModels;
using System.Linq;

namespace Classifieds.Service
{
    public class SubscriptionService
    {
        ClassifedsContext db = new ClassifedsContext();

        public SubsctiptionVM GetUserSubscriptions(int userId)
        {
            var _userSubs = db.UserSubsctiption.Where(x => x.UserId == userId).ToList();

            SubsctiptionVM _output = new SubsctiptionVM();

            if (_userSubs.Any(x => x.CategoryId == 1))
                _output.HousingSubscribed = true;

            if (_userSubs.Any(x => x.CategoryId == 2))
                _output.ElectronicsSubscribed = true;

            if (_userSubs.Any(x => x.CategoryId == 3))
                _output.BooksSubscribed = true;

            if (_userSubs.Any(x => x.CategoryId == 4))
                _output.HomeGoodsSubscribed = true;

            if (_userSubs.Any(x => x.CategoryId == 5))
                _output.MiscSubscribed = true;

            return _output;

        }

        public SubsctiptionVM UpdateSubscription(UpdateSubscriptionVM data)
        {
            if (data.Action == 1)
            {
                var newSubscription = new UserSubscription
                {
                    CategoryId = data.CategoryId,
                    UserId = data.UserId
                };

                db.UserSubsctiption.Add(newSubscription);
                db.SaveChanges();                
            }
            else
            {
                var _entry = db.UserSubsctiption.First(x => x.UserId == data.UserId && x.CategoryId == data.CategoryId);

                if (_entry != null)
                {
                    db.Entry(_entry).State = System.Data.EntityState.Deleted;
                    db.SaveChanges();
                }
            }

            return GetUserSubscriptions(data.UserId);

        }
    }
}
