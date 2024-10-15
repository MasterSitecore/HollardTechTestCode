namespace HollardTechTestApi.Data
{
    public class Quote
    {
        public Guid customerId { get; set; }
        public List<CoverAndRisk> coverAndRiskList { get; set; }
    }

    public class CoverAndRisk
    {

        public CoverDetail CoverDetails { get; set; }
        public List<RiskDetail> RiskDetails { get; set; }

        public CoverAndRisk()
        {
            this.RiskDetails = new List<RiskDetail>();
        }

    }

    public partial class CoverDetail
    {
        public int CoverDetailId { get; set; }
        public Guid? CustomerId { get; set; }
        public DateTime? CoverStartDate { get; set; }
        public DateTime? CoverEndDate { get; set; }
        public string? PremiumPayoutTerm { get; set; }
        public string? BranchCode { get; set; }
        public string Quotenumber { get; set; }
        public DateTime? QuoteDate { get; set; }
    }
    public partial class RiskDetail
    {
        public int RiskDetailId { get; set; }
        public Guid? CustomerId { get; set; }
        public int? CoverDetailId { get; set; }
        public int? MakeId { get; set; }
        public int? ModelId { get; set; }
        public long? SumInsured { get; set; }
        public long? VehicleCost { get; set; }
        public int? RateApplied { get; set; }
        public int? Premium { get; set; }
        public int? YearOfManufacture { get; set; }
    }
}
