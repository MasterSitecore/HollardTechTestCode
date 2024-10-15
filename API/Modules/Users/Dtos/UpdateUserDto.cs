using System;
using System.ComponentModel.DataAnnotations;

namespace HollardTechTestApi.Modules.Users.Dtos
{
    public class UpdateUserDto
    {
        public Guid customerId { get; set; }
        public string title { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string email { get; set; }

        public string password { get; set; }
        public string phone { get; set; }
        public string address1 { get; set; }
        public string address2 { get; set; }
       
        
    }
}
