using MediatR;
using HollardTechTestApi.Data;
using HollardTechTestApi.Modules.Users.Commands;
using HollardTechTestApi.Modules.Users.Dtos;
using HollardTechTestApi.Modules.Users.Services;

namespace HollardTechTestApi.Modules.Users.Handlers
{
    public class AddUpdateQuoteHandler : IRequestHandler<QuoteCommand, Quote>
    {
        private readonly IUser _userRepository;
        public AddUpdateQuoteHandler(IUser userRepository) => _userRepository = userRepository;

        public async Task<Quote> Handle(QuoteCommand request, CancellationToken cancellationToken)
        {
            var quote = new Quote();
            var coverDetail= new CoverDetail();
            var riskAndCovercsDto=new RiskAndCovercsDto { coverDetails=new CoverDetailsRequest(),riskDetails=new List< RiskDetailsRequest>()};

            if (request.coverDetails != null)
            {
                riskAndCovercsDto.coverDetails.coverDetailId = request.coverDetails.coverDetailId;
                //riskAndCovercsDto.coverDetails.customerId = request.customerId;
                riskAndCovercsDto.coverDetails.coverStartDate = request.coverDetails.coverStartDate;
                riskAndCovercsDto.coverDetails.coverEndDate = request.coverDetails.coverEndDate;
                riskAndCovercsDto.coverDetails.premiumPayoutTerm = request.coverDetails.premiumPayoutTerm;
                riskAndCovercsDto.coverDetails.branchCode = request.coverDetails.branchCode;
                riskAndCovercsDto.coverDetails.quoteNumber = request.coverDetails.quoteNumber;
                riskAndCovercsDto.coverDetails.quoteDate = request.coverDetails.quoteDate;

                 coverDetail = await _userRepository.AddUpdateCoverDetails(riskAndCovercsDto.coverDetails, request.customerId);
            };

            if (request.riskDetails!=null)
            {
                foreach (var riskDetail in request.riskDetails)
                {
                    var riskDetailsRequest =  new RiskDetailsRequest();
                    riskDetailsRequest.riskDetailId = riskDetail.riskDetailId;
                    //riskDetailsRequest.customerId = request.customerId;
                    riskDetailsRequest.coverDetailId = coverDetail.CoverDetailId;
                    riskDetailsRequest.makeId = riskDetail.makeId;
                    riskDetailsRequest.modelId = riskDetail.modelId;
                    riskDetailsRequest.sumInsured = riskDetail.sumInsured;
                    riskDetailsRequest.vehicleCost = riskDetail.vehicleCost;
                    riskDetailsRequest.rateApplied = riskDetail.rateApplied;
                    riskDetailsRequest.premium = riskDetail.premium;
                    riskDetailsRequest.yearOfManufacture = riskDetail.yearOfManufacture;

                    var test = await _userRepository.AddUpdateRiskDetails(riskDetailsRequest, request.customerId);
                }

            };

            quote.customerId = request.customerId;


            return quote;
        }
    }
}
