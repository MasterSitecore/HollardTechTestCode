using System;
using MediatR;
using HollardTechTestApi.Data;
using HollardTechTestApi.Modules.Users.Dtos;

namespace HollardTechTestApi.Modules.Users.Commands
{
    public class CreateUserCommand : IRequest<Customer>
    {
        
       // public Guid CustomerId { get; set; }
        public string Title { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }


        public CreateUserCommand(CreateUserDto user)
        {
            //CustomerId = user.CustomerId;
            Title =user.Title;
            Name = user.Name;
            Surname = user.Surname;
            Email = user.Email;
            Password = user.Password;

        }
    }
}

