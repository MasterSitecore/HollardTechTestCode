using System;
using MediatR;
using HollardTechTestApi.Modules.Users.Dtos;

namespace HollardTechTestApi.Modules.Users.Queries
{
    public record GetUsersListQuery() : IRequest<List<GetUserDto>>;
}
