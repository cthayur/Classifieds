using Classifieds.Data.DataContext;
using Classifieds.Data.Models;
using Classifieds.Service.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Objects;
using System.Linq;

namespace Classifieds.Service
{
    public class MessageService
    {
        ClassifedsContext db = new ClassifedsContext();

        public IEnumerable<MessageVM> GetUserMessages(int userId)
        {
            var result = (from message in db.Messages
                          join post in db.Posts on message.PostId equals post.ID
                          where message.To == userId
                          orderby message.Date descending
                          select new
                            {
                                Date = message.Date,
                                From = message.From,
                                ID = message.ID,
                                Message = message.Body,
                                PostId = message.PostId,
                                PostTitle = post.Title,
                                Subject = message.Subject,
                                To = message.To
                            }).ToList();

            return (from message in result
                    select new MessageVM
                    {
                        Date = message.Date.ToString("ddd MMM dd yyyy"),
                        From = message.From,
                        ID = message.ID,
                        Message = message.Message,
                        PostId = message.PostId,
                        PostTitle = message.PostTitle,
                        Subject = message.Subject,
                        To = message.To
                    }).ToList();
            
        }

        public void AddMessage(MessageVM message)
        {
            var newMessage = new Message
            {
                Date = DateTime.Now,
                From = message.From,
                Body = message.Message,
                PostId = message.PostId,
                Subject = message.Subject,
                To = message.To
            };

            db.Messages.Add(newMessage);
            db.SaveChanges();
        }

        public void DeleteMessage(int messageId)
        {
            db.Entry(new Message { ID = messageId }).State = System.Data.EntityState.Deleted;
            db.SaveChanges();
        }
    }
}
