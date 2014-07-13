using Classifieds.Data.DataContext;
using Classifieds.Data.Models;
using Classifieds.Service.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Objects;
using System.Linq;
namespace Classifieds.Service.Services
{
    public class UsersService
    {
        ClassifedsContext db = new ClassifedsContext();

        public UserVM GetUser(int userId)
        {
            var user = db.UserProfiles.FirstOrDefault(x => x.UserId == userId);
            string GravatarUrl;

            if (user != null)
                GravatarUrl = Gravatar.GetGravatar(user.UserName);
            else
                GravatarUrl =  string.Empty;

            return new UserVM { GravatarUrl = GravatarUrl, IsUserAdmin = user.IsAdmin };
        }

        public void LockUser(int userId)
        {
            var user = db.UserProfiles.Where(x => x.UserId == userId).FirstOrDefault();

            if (user != null)
            {
                user.IsLockedOut = true;
            }

            db.Entry(user).State = System.Data.EntityState.Modified;
            db.SaveChanges();
        }
    }
}
