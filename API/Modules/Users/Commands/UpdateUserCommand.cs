using System;
using MediatR;
using HollardTechTestApi.Data;
using HollardTechTestApi.Modules.Users.Dtos;

namespace HollardTechTestApi.Modules.Users.Commands
{
    public class UpdateUserCommand : IRequest<Customer>
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

        public UpdateUserCommand(UpdateUserDto user)
        {
            customerId = user.customerId;
            title = user.title;
            name = user.name;
            surname = user.surname;
            email = user.email;
            password = user.password;
            phone = user.phone;
            address1 = user.address1;
            address2 = user.address2;
        }
    }
}
