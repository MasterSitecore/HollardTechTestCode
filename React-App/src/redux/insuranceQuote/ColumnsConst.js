export const CoverDetailsColumns = {
    CoverDetailId: "CoverDetailId",      // int, identity
    CustomerId: "CustomerId",            // uniqueidentifier
    PremiumPayoutTerm: "PremiumPayoutTerm", // nchar(10)
    BranchCode: "BranchCode",            // nvarchar(10)
    Quotenumber: "Quotenumber",          // nvarchar(200)
    QuoteDescription: "QuoteDescription",          // nvarchar(200)
    CoverStartDate: "CoverStartDate",    // date
    CoverEndDate: "CoverEndDate",        // date
    QuoteDate: "QuoteDate"               // date
};

export const RiskDetailsColumns = {
    RiskDetailId: "RiskDetailId",        // int, identity
    CustomerId: "CustomerId",            // uniqueidentifier
    CoverDetailId: "CoverDetailId",      // int
    MakeId: "MakeId",                    // int
    ModelId: "ModelId",                  // int
    SumInsured: "SumInsured",            // bigint
    VehicleCost: "VehicleCost",          // bigint
    RateApplied: "RateApplied",          // int
    Premium: "Premium",                  // int
    YearOfManufacture: "YearOfManufacture" // date
};

export const CustomersColumns = {
    Id: "Id",                            // uniqueidentifier
    Title: "Title",                      // nchar(10)
    Email: "Email",                      // varchar(255)
    Name: "Name",                        // varchar(200)
    Surname: "Surname",                  // varchar(200)
    Password: "Password",                // varchar(255)
    Phone: "Phone",                      // varchar(20)
    Address1: "Address1",                // nvarchar(200)
    Address2: "Address2"                 // nvarchar(200)
};