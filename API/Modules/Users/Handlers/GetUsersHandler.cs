using System;
using MediatR;
using HollardTechTestApi.Data;
using HollardTechTestApi.Modules.Users.Dtos;
using HollardTechTestApi.Modules.Users.Queries;
using HollardTechTestApi.Modules.Users.Services;
using Microsoft.EntityFrameworkCore;

namespace HollardTechTestApi.Modules.Users.Handlers
{
    public class GetUsersHandler : IRequestHandler<GetUsersListQuery, List<GetUserDto>>
    {
        private readonly IUser _userRepository;
        public GetUsersHandler(IUser userRepository) => _userRepository = userRepository;

        public async Task<List<GetUserDto>> Handle(GetUsersListQuery request, CancellationToken cancellationToken)
        {
            return await _userRepository.GetUsersAsync();
        }
    }
}

