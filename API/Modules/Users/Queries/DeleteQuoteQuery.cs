using HollardTechTestApi.Data;
using MediatR;

namespace HollardTechTestApi.Modules.Users.Queries
{
    public class DeleteQuoteByIdQuery : IRequest<int>
    {
        public int Id { get; set; }

        public DeleteQuoteByIdQuery(int id)
        {
            Id = id;
        }
    }
}
