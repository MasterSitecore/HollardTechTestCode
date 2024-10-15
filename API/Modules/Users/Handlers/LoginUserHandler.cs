using MediatR;
using HollardTechTestApi.Data;
using HollardTechTestApi.Modules.Users.Commands;
using HollardTechTestApi.Modules.Users.Dtos;
using HollardTechTestApi.Modules.Users.Services;

namespace HollardTechTestApi.Modules.Users.Handlers
{
    public class LoginUserHandler : IRequestHandler<LoginUserCommand, GetUserDto>
    {
        private readonly IUser _userRepository;
        public LoginUserHandler(IUser userRepository) => _userRepository = userRepository;

        public async Task<GetUserDto> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            var signUserDto = new SignInDto
            {
                email = request.Email,
                password = request.Password,
            };
            return await _userRepository.LoginUsersAsync(signUserDto);
        }
    }
}
