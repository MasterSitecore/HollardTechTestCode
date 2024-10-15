using System;
using MediatR;
using HollardTechTestApi.Data;
using HollardTechTestApi.Modules.Users.Commands;
using HollardTechTestApi.Modules.Users.Dtos;
using HollardTechTestApi.Modules.Users.Services;

namespace HollardTechTestApi.Modules.Users.Handlers
{
    public class UpdateUserHandler : IRequestHandler<UpdateUserCommand, Customer>
    {
        private readonly IUser _userRepository;
        public UpdateUserHandler(IUser userRepository) => _userRepository = userRepository;

        public async Task<Customer> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var updateUserDto = new UpdateUserDto
            {
                customerId = request.customerId,
                title = request.title,
                name = request.name,
                surname = request.surname,
                email = request.email,
                password = request.password,
                phone = request.phone,
                address1 = request.address1,
                address2 = request.address2,
            };

            return await _userRepository.UpdateUserAsync(updateUserDto);
        }
    }
}
