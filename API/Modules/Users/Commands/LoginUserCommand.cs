using MediatR;
using HollardTechTestApi.Data;
using HollardTechTestApi.Modules.Users.Dtos;

namespace HollardTechTestApi.Modules.Users.Commands
{
    public class LoginUserCommand : IRequest<GetUserDto>
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public LoginUserCommand(SignInDto user)
        {
            Email = user.email;
            Password = user.password;

        }
    }
}
