using System;
namespace HollardTechTestApi.Data
{
    public partial class Customer
    {
        public Guid Id { get; set; }

        public string? Title { get; set; }

        public string Email { get; set; } = null!;

        public string? Name { get; set; }

        public string? Surname { get; set; }

        public string? Password { get; set; }

        public string? Phone { get; set; }

        public string? Address1 { get; set; }

        public string? Address2 { get; set; }

    }

}

