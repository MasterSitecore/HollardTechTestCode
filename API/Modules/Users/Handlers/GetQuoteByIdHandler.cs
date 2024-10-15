using MediatR;
using HollardTechTestApi.Data;
using HollardTechTestApi.Modules.Users.Dtos;
using HollardTechTestApi.Modules.Users.Queries;
using HollardTechTestApi.Modules.Users.Services;

namespace HollardTechTestApi.Modules.Users.Handlers
{
 

    public class GetQuoteByIdHandler : IRequestHandler<GetQuoteByIdQuery, Quote>
    {
        private readonly IUser _userRepository;

        public GetQuoteByIdHandler(IUser userRepository) => _userRepository = userRepository;

        public async Task<Quote> Handle(GetQuoteByIdQuery request, CancellationToken cancellationToken)
        {
            return await _userRepository.GetQuoteById(request.Id);
        }
    }
}
