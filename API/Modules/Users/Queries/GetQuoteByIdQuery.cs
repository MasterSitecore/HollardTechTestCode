using MediatR;
using HollardTechTestApi.Data;
using HollardTechTestApi.Modules.Users.Dtos;

namespace HollardTechTestApi.Modules.Users.Queries
{
  
    public class GetQuoteByIdQuery : IRequest<Quote>
    {
        public Guid Id { get; set; }

        public GetQuoteByIdQuery(Guid id)
        {
            Id = id;
        }
    }
}
