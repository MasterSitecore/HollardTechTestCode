using System;
using HollardTechTestApi.Data;
using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;


namespace HollardTechTestApi.Data
{
    public partial class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }


        public virtual DbSet<CoverDetail> CoverDetails { get; set; }

        public virtual DbSet<Customer> Customers { get; set; }

        public virtual DbSet<RiskDetail> RiskDetails { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("Customers", "dbo");
                entity.HasKey(e => e.Id).HasName("PK_dbo_Customers_Id");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.Address1).HasMaxLength(200);
                entity.Property(e => e.Address2).HasMaxLength(200);
                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false);
                entity.Property(e => e.Name)
                    .HasMaxLength(200)
                    .IsUnicode(false);
                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .IsUnicode(false);
                entity.Property(e => e.Phone)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.Surname)
                    .HasMaxLength(200)
                    .IsUnicode(false);
                entity.Property(e => e.Title)
                    .HasMaxLength(10)
                    .IsFixedLength();
            });
            modelBuilder.Entity<CoverDetail>(entity =>
            {
                entity.HasKey(e => e.CoverDetailId).HasName("PK_dbo_CoverDetails_Id");

                entity.Property(e => e.BranchCode).HasMaxLength(10);
                entity.Property(e => e.PremiumPayoutTerm)
                    .HasMaxLength(10)
                    .IsFixedLength();
                entity.Property(e => e.Quotenumber).HasMaxLength(200);
            });

            modelBuilder.Entity<RiskDetail>(entity =>
            {
                entity.HasKey(e => e.RiskDetailId).HasName("PK_dbo_RiskDetails_Id");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    }

}



