using MediatR;
using HollardTechTestApi.Data;
using HollardTechTestApi.Modules.Users.Commands;
using HollardTechTestApi.Modules.Users.Dtos;
using HollardTechTestApi.Modules.Users.Services;

namespace HollardTechTestApi.Modules.Users.Handlers
{
    public class CreateUserHandler : IRequestHandler<CreateUserCommand, Customer>
    {
        private readonly IUser _userRepository;
        public CreateUserHandler(IUser userRepository) => _userRepository = userRepository;

        public async Task<Customer> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var emailExists = await _userRepository.EmailExistsAsync(request.Email);

            if (emailExists)
            {
                // You can return an error message or throw an exception
                throw new Exception("Email already exists");
            }

            var createUserDto = new CreateUserDto
            {
                Title= request.Title,
                Name = request.Name,
                Surname=request.Surname,
                Email=request.Email,
                Password = request.Password,
            };
            return await _userRepository.CreateUserAsync(createUserDto);
        }
    }
}
