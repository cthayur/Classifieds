using Classifieds.Data.DataContext;
using Classifieds.Data.Models;
using Classifieds.Service.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Objects;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Classifieds.Service
{
    public class PostService
    {
        ClassifedsContext db = new ClassifedsContext();
        private const int ItemCount = 10;
        private const int FilterTime = 15;

        public IEnumerable<PostVM> GetPostsByCategory(int categoryId)
        {
            var posts = GetBasePosts(categoryId);
            return GetPosts(posts);
        }

        public IEnumerable<MixedBagVM> GetMixedBagData()
        {
            var categories = db.Categories.ToList();
            List<MixedBagVM> mixedBagItems = new List<MixedBagVM>();

            foreach (var category in categories)
            {
                var posts = GetBasePosts(category.ID).Take(ItemCount).ToList();
                var groupItems = GetPosts(posts);
                var item = new MixedBagVM { Group = category.Description, ID = category.ID, Items = groupItems };
                mixedBagItems.Add(item);                
            }

            return mixedBagItems;
        }

        public IEnumerable<PostVM> GetUserPosts(int userId)
        {
            var posts = (from post in db.Posts
                         join user in db.UserProfiles on post.UserId equals user.UserId
                         join cat in db.Categories on post.CategoryId equals cat.ID
                         where !post.IsDisabled && post.UserId == userId && post.DateCreated <= EntityFunctions.AddDays(DateTime.Now, FilterTime)
                         orderby post.DateCreated descending
                         select new
                         {
                             Category = cat.Description,
                             CategoryId = cat.ID,
                             Date = post.DateCreated,
                             Description = post.Description,
                             ID = post.ID,
                             Location = post.Location,
                             Price = post.Price,
                             Title = post.Title,
                             UserId = post.UserId,
                             Email = user.UserName
                         }).ToList();

            return GetPosts(posts);
        }

        public void AddPost(PostVM post)
        {
            var newPost = new Classifieds.Data.Models.Post
            {
                CategoryId = post.CategoryId,
                DateCreated = DateTime.Now,
                Description = post.Description,
                Location = post.Location,
                Price = post.Price,
                Title = post.Title,
                UserId = post.UserId,
                IsDisabled = false
            };

            db.Posts.Add(newPost);
            db.SaveChanges();

            post.ID = newPost.ID;
            post.Date = newPost.DateCreated.ToString("ddd MMM dd yyyy");
        }

        public void UpdatePost(PostVM post)
        {
            var newPost = new Post
            {
                ID = post.ID,
                CategoryId = post.CategoryId,
                DateCreated = DateTime.Now,
                Description = post.Description,
                Location = post.Location,
                Price = post.Price,
                Title = post.Title,
                UserId = post.UserId,
                IsDisabled = false
            };

            db.Entry(newPost).State = System.Data.EntityState.Modified;
            db.SaveChanges();
        }

        public void DeletePost(int postId)
        {
            db.Entry(new Post { ID = postId }).State = System.Data.EntityState.Deleted;
            db.SaveChanges();
        }

        public void DisablePost(int postId)
        {
            var post = db.Posts.FirstOrDefault(x => x.ID == postId);

            if (post != null)
            {
                post.IsDisabled = true;
                db.Entry(post).State = System.Data.EntityState.Modified;
                db.SaveChanges();
            }
        }

        public string GenerateEmails()
        {
            var emailData = (from subscription in db.UserSubsctiption
                     join user in db.UserProfiles on subscription.UserId equals user.UserId
                     join post in db.Posts on subscription.CategoryId equals post.CategoryId
                     join category in db.Categories on post.CategoryId equals category.ID
                     orderby user.UserId, post.CategoryId, post.ID
                     select new
                     {
                         UserId = user.UserId,
                         Email = user.UserName,
                         Title = post.Title,
                         Description = post.Description,
                         Category = category.Description
                     }).ToList();

            MailMessage mail = null;            

            string prevEmail = string.Empty;
            StringBuilder sbDescription = new StringBuilder();

            foreach (var item in emailData)
            {
                if (item.Email != prevEmail)
                {
                    SendEmail(mail, prevEmail, sbDescription);
                    
                    sbDescription = new StringBuilder();
                    mail = new MailMessage();
                }

                sbDescription.Append("\nCategory: " + item.Category);
                sbDescription.Append("\nTitle: " + item.Title);
                sbDescription.Append("\nDescription: " + item.Description + "\n");

                prevEmail = item.Email;
            }

            SendEmail(mail, prevEmail, sbDescription);

            return "Emails Generated Successsfully";

        }

        private void SendEmail(MailMessage mail, string Email, StringBuilder Body)
        {
            if (mail == null)
                return;

            SmtpClient SmtpServer = new SmtpClient("smtp.cmuclassifieds.com");
            mail.From = new MailAddress("MailService@cmuclassifieds.edu");
            mail.To.Add(Email);
            mail.Subject = "CMU Classifieds | Daily Subscription";
            mail.Body = Body.ToString();
            SmtpServer.Send(mail);

        }

		public IEnumerable<dynamic> GetBasePosts(int categoryId)
        {
            var posts = (from post in db.Posts
                         join user in db.UserProfiles on post.UserId equals user.UserId
                         join cat in db.Categories on post.CategoryId equals cat.ID
                         where !post.IsDisabled && post.CategoryId == categoryId && post.DateCreated <= EntityFunctions.AddDays(DateTime.Now, FilterTime)
                         orderby post.DateCreated descending
                         select new
                         {
                             Category = cat.Description,
                             CategoryId = cat.ID,
                             Date = post.DateCreated,
                             Description = post.Description,
                             ID = post.ID,
                             Location = post.Location,
                             Price = post.Price,
                             Title = post.Title,
                             UserId = post.UserId,
                             Email = user.UserName
                         }).ToList();

            return posts;
        }

        private IEnumerable<PostVM> GetPosts(IEnumerable<dynamic> posts)
        {
            return (from post in posts
                    select new PostVM
                    {
                        Category = post.Category,
                        CategoryId = post.CategoryId,
                        Date = post.Date.ToString("ddd MMM dd yyyy"),
                        Description = post.Description,
                        ID = post.ID,
                        Location = post.Location,
                        Price = post.Price,
                        Title = post.Title,
                        UserId = post.UserId,
                        Gravatar = Gravatar.GetGravatar(post.Email)
                    }).ToList();
        }        
    }


}