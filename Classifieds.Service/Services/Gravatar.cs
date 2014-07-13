using Classifieds.Data.DataContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace Classifieds.Service
{
    public class Gravatar
    {
        public const string GravatarUrl = "http://www.gravatar.com/avatar/";
        public const string GravatarSetUp = "?&r=g&d=identicon";

        public static string ToMD5Hash(string input)
        {
            // step 1, calculate MD5 hash from input
            MD5 md5 = System.Security.Cryptography.MD5.Create();
            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
            byte[] hash = md5.ComputeHash(inputBytes);

            // step 2, convert byte array to hex string
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                sb.Append(hash[i].ToString("X2"));
            }
            return sb.ToString().ToLower();
        }

        public static string GetGravatar(int userId)
        {
            ClassifedsContext db = new ClassifedsContext();

            var user = db.UserProfiles.Where(x => x.UserId == userId).FirstOrDefault();

            if (user != null)
                return GetGravatar(user.UserName);
            else
                return string.Empty;
        }

        public static string GetGravatar(string email)
        {
            return GravatarUrl + Gravatar.ToMD5Hash(email.ToLower()) + GravatarSetUp;
        }
    }
}