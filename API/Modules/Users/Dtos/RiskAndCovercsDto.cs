using HollardTechTestApi.Modules.Users.Commands;
using Newtonsoft.Json;

namespace HollardTechTestApi.Modules.Users.Dtos
{
    public class RiskAndCovercsDto
    {
        public Guid customerId { get; set; }
        public CoverDetailsRequest coverDetails { get; set; }
        public List <RiskDetailsRequest> riskDetails { get; set; }

    }

    public class CoverDetailsRequest
    {
        public int coverDetailId { get; set; }
      //s  public Guid customerId { get; set; }
        public DateTime coverStartDate { get; set; }
        public DateTime coverEndDate { get; set; }
        public string? premiumPayoutTerm { get; set; }
        public string? branchCode { get; set; }
        public string quoteNumber { get; set; }
        public DateTime quoteDate { get; set; }
    }

    public class RiskDetailsRequest
    {
        public int riskDetailId { get; set; }
       // public Guid customerId { get; set; }
        public int coverDetailId { get; set; }
        public int makeId { get; set; }
        public int modelId { get; set; }
        public long sumInsured { get; set; }
        public long vehicleCost { get; set; }
        public int rateApplied { get; set; }

        public decimal premium { get; set; }
        public int yearOfManufacture { get; set; }
    }
}
