using System;
using MediatR;
using HollardTechTestApi.Modules.Users.Dtos;

namespace HollardTechTestApi.Modules.Users.Queries
{
    public class GetUserByIdQuery : IRequest<GetUserDto>
    {
        public Guid Id { get; set; }

        public GetUserByIdQuery(Guid id)
        {
            Id = id;
        }
    }
}

