using System;
using MediatR;
using HollardTechTestApi.Modules.Users.Dtos;
using HollardTechTestApi.Modules.Users.Queries;
using HollardTechTestApi.Modules.Users.Services;

namespace HollardTechTestApi.Modules.Users.Handlers
{
    public class GetUserByIdHandler : IRequestHandler<GetUserByIdQuery, GetUserDto>
    {
        private readonly IUser _userRepository;

        public GetUserByIdHandler(IUser userRepository) => _userRepository = userRepository;

        public async Task<GetUserDto> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
        {
            return await _userRepository.GetUserByIdAsync(request.Id);
        }
    }
}

