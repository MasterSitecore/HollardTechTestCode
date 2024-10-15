using Azure.Core;
using HollardTechTestApi.Data;
using HollardTechTestApi.Modules.Users.Queries;
using HollardTechTestApi.Modules.Users.Services;
using MediatR;

namespace HollardTechTestApi.Modules.Users.Handlers
{
   

    public class DeleteQuoteHandler : IRequestHandler<DeleteQuoteByIdQuery, int>
    {
        private readonly IUser _userRepository;

        public DeleteQuoteHandler(IUser userRepository) => _userRepository = userRepository;

        public async Task<int> Handle(DeleteQuoteByIdQuery request, CancellationToken cancellationToken)
        {
            return await _userRepository.DeleteQuoteById(request.Id);
        }
    }
}
