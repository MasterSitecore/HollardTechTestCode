using MediatR;
using HollardTechTestApi.Data;
using HollardTechTestApi.Modules.Users.Dtos;
using Microsoft.IdentityModel.Tokens;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace HollardTechTestApi.Modules.Users.Commands
{

    public class QuoteCommand : IRequest<Quote>
    {

        public Guid customerId { get; set; }
        public CoverDetailsCommand coverDetails { get; set; }
        public List< RiskDetailsCommand> riskDetails { get; set; }


        public QuoteCommand(RiskAndCovercsDto request)
        {


            customerId = request.customerId;
            if (request.coverDetails != null )
            {
                coverDetails = new CoverDetailsCommand();
                coverDetails.coverDetailId = request.coverDetails.coverDetailId;
                coverDetails.customerId = request.customerId;
                coverDetails.coverStartDate = request.coverDetails.coverStartDate;
                coverDetails.coverEndDate = request.coverDetails.coverEndDate;
                coverDetails.premiumPayoutTerm = request.coverDetails.premiumPayoutTerm;
                coverDetails.branchCode = request.coverDetails.branchCode;
                coverDetails.quoteNumber = request.coverDetails.quoteNumber;
                coverDetails.quoteDate = request.coverDetails.quoteDate;


            }
            if (request.riskDetails != null)
            {
                riskDetails = new List<RiskDetailsCommand>();
                foreach (var riskDetail in request.riskDetails)
                {
                    if (riskDetail.modelId > 0) // Check to ensure modelId is valid
                    {
                        var riskDetailCommand = new RiskDetailsCommand
                        {
                            riskDetailId = riskDetail.riskDetailId,
                            customerId = request.customerId,
                            coverDetailId = riskDetail.coverDetailId,
                            makeId = riskDetail.makeId,
                            modelId = riskDetail.modelId,
                            sumInsured = riskDetail.sumInsured,
                            vehicleCost = riskDetail.vehicleCost,
                            rateApplied = riskDetail.rateApplied,
                            premium = Convert.ToInt32( riskDetail.premium),
                            yearOfManufacture = riskDetail.yearOfManufacture
                        };

                        riskDetails.Add(riskDetailCommand); // Add each risk detail command to the list
                    }
                }
            }
        }
        public class CoverDetailsCommand
        {
            public int coverDetailId { get; set; }
            public Guid customerId { get; set; }
            public DateTime coverStartDate { get; set; }
            public DateTime coverEndDate { get; set; }
            public string premiumPayoutTerm { get; set; }
            public string branchCode { get; set; }
            public string quoteNumber { get; set; }
            public DateTime quoteDate { get; set; }
        }

        public class RiskDetailsCommand
        {
            public int riskDetailId { get; set; }
            public Guid customerId { get; set; }
            public int coverDetailId { get; set; }
            public int makeId { get; set; }
            public int modelId { get; set; }
            public long sumInsured { get; set; }
            public long vehicleCost { get; set; }
            public int rateApplied { get; set; }
            public int premium { get; set; }
            public int yearOfManufacture { get; set; }
        }
    }

}
