using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using Classifieds.Data.Models;

namespace Classifieds.Data.DataContext
{
    public class ClassifedsContext : DbContext
    {
        public ClassifedsContext()
            : base("DefaultConnection")
        {
        }

        public DbSet<Message> Messages { get; set; }
        public DbSet<Post> Posts { get; set; }        
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<UserSubscription> UserSubsctiption { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}