using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BCrypt.Net; // Ensure you have the BCrypt package installed
using MediatR;
using Microsoft.EntityFrameworkCore;
using HollardTechTestApi.Data;
using HollardTechTestApi.Modules.Users.Dtos;

namespace HollardTechTestApi.Modules.Users.Services
{
    public class UserRepository : IUser
    {
        private readonly ApplicationDbContext _dbContext;

        public UserRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Customer> CreateUserAsync(CreateUserDto user)
        {
            // Check if the email already exists
            if (await EmailExistsAsync(user.Email))
            {
                throw new Exception("Email already exists");
            }

            // Create a new user instance with hashed password
            var newUser = new Customer
            {
                Id = Guid.NewGuid(),
                Title = user.Title,
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(user.Password) // Hashing the password
            };

            await _dbContext.Customers.AddAsync(newUser);
            await _dbContext.SaveChangesAsync();
            return newUser;
        }

        public async Task<bool> DeleteUserAsync(Guid id)
        {
            var user = await _dbContext.Customers.FindAsync(id);
            if (user != null)
            {
                _dbContext.Customers.Remove(user);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<GetUserDto> GetUserByIdAsync(Guid id)
        {
            var user = await _dbContext.Customers.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null) return null;

            return new GetUserDto
            {
                customerId = user.Id,
                title = user.Title,
                name = user.Name,
                surname = user.Surname,
                //password = user.Password, // Consider removing this field for security reasons
                address1 = user.Address1,
                address2 = user.Address2,
                phone = user.Phone,
                email = user.Email
            };
        }

        public async Task<List<GetUserDto>> GetUsersAsync()
        {
            var users = await _dbContext.Customers.ToListAsync();
            return users.Select(user => new GetUserDto
            {
                customerId = user.Id,
                title = user.Title,
                name = user.Name,
                surname = user.Surname,
                email = user.Email // Adjust as necessary
            }).ToList();
        }

        public async Task<Customer> UpdateUserAsync(UpdateUserDto user)
        {
            var existingUser = await _dbContext.Customers.FindAsync(user.customerId);
            if (existingUser == null) return null;

            // Update user details
            existingUser.Title = user.title;
            existingUser.Name = user.name;
            existingUser.Surname = user.surname;
            existingUser.Password = BCrypt.Net.BCrypt.HashPassword(user.password); // Hashing the new password
            existingUser.Address1 = user.address1;
            existingUser.Address2 = user.address2;
            existingUser.Phone = user.phone;
            existingUser.Email = user.email;

            _dbContext.Customers.Update(existingUser);
            await _dbContext.SaveChangesAsync();
            return existingUser;
        }

        public async Task<GetUserDto> LoginUsersAsync(SignInDto signInDto)
        {
            var user = await _dbContext.Customers.FirstOrDefaultAsync(u => u.Email == signInDto.email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(signInDto.password, user.Password)) return null;

            return new GetUserDto
            {
                customerId = user.Id,
                title = user.Title,
                name = user.Name,
                surname = user.Surname,
                address1 = user.Address1,
                address2 = user.Address2,
                phone = user.Phone,
                email = user.Email
            };
        }

        public async Task<CoverDetail> AddUpdateCoverDetails(CoverDetailsRequest coverDetailsRequestDto, Guid customerId)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                var existingCoverDetail = await _dbContext.CoverDetails
                    .FirstOrDefaultAsync(u => u.CoverDetailId == coverDetailsRequestDto.coverDetailId);

                if (existingCoverDetail != null)
                {
                    _dbContext.CoverDetails.Remove(existingCoverDetail);
                    var associatedRiskDetail = await _dbContext.RiskDetails
                        .FirstOrDefaultAsync(u => u.CoverDetailId == coverDetailsRequestDto.coverDetailId);

                    if (associatedRiskDetail != null)
                    {
                        _dbContext.RiskDetails.Remove(associatedRiskDetail);
                    }
                    await _dbContext.SaveChangesAsync();
                }

                var newCoverDetail = new CoverDetail
                {
                    CustomerId = customerId,
                    CoverStartDate = coverDetailsRequestDto.coverStartDate,
                    CoverEndDate = coverDetailsRequestDto.coverEndDate,
                    PremiumPayoutTerm = coverDetailsRequestDto.premiumPayoutTerm,
                    BranchCode = coverDetailsRequestDto.branchCode,
                    Quotenumber = coverDetailsRequestDto.quoteNumber,
                    QuoteDate = coverDetailsRequestDto.quoteDate
                };

                await _dbContext.CoverDetails.AddAsync(newCoverDetail);
                await _dbContext.SaveChangesAsync();

                await transaction.CommitAsync();
                return newCoverDetail;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw; // Rethrow the exception after rollback
            }
        }

        public async Task<RiskDetail> AddUpdateRiskDetails(RiskDetailsRequest riskDetailsRequestDto, Guid customerId)
        {
            var riskDetails = new RiskDetail
            {
                CustomerId = customerId,
                CoverDetailId = riskDetailsRequestDto.coverDetailId,
                MakeId = riskDetailsRequestDto.makeId,
                ModelId = riskDetailsRequestDto.modelId,
                SumInsured = riskDetailsRequestDto.sumInsured,
                VehicleCost = riskDetailsRequestDto.vehicleCost,
                RateApplied = riskDetailsRequestDto.rateApplied,
                Premium = Convert.ToInt32( riskDetailsRequestDto.premium),
                YearOfManufacture = riskDetailsRequestDto.yearOfManufacture
            };

            await _dbContext.RiskDetails.AddAsync(riskDetails);
            await _dbContext.SaveChangesAsync();

            return riskDetails;
        }

        public async Task<Quote?> GetQuoteById(Guid customerId) // Allow null return
        {
            var coverDetails = await _dbContext.CoverDetails
                .Where(cd => cd.CustomerId == customerId)
                .Select(cd => new
                {
                    cd.CoverDetailId,
                    cd.CustomerId,
                    cd.CoverStartDate,
                    cd.CoverEndDate,
                    cd.PremiumPayoutTerm,
                    cd.BranchCode,
                    cd.Quotenumber,
                    cd.QuoteDate,
                    RiskDetails = _dbContext.RiskDetails
                        .Where(rd => rd.CoverDetailId == cd.CoverDetailId)
                        .Select(rd => new RiskDetail
                        {
                            RiskDetailId = rd.RiskDetailId,
                            CustomerId = rd.CustomerId,
                            CoverDetailId = rd.CoverDetailId,
                            MakeId = rd.MakeId,
                            ModelId = rd.ModelId,
                            SumInsured = rd.SumInsured,
                            VehicleCost = rd.VehicleCost,
                            RateApplied = rd.RateApplied,
                            Premium = rd.Premium,
                            YearOfManufacture = rd.YearOfManufacture
                        }).ToList()
                }).ToListAsync();

            if (!coverDetails.Any())
            {
                return null; // Return null if no cover details are found
            }

            return new Quote
            {
                customerId = customerId,
                coverAndRiskList = coverDetails.Select(cd => new CoverAndRisk
                {
                    CoverDetails = new CoverDetail
                    {
                        CoverDetailId = cd.CoverDetailId,
                        CustomerId = cd.CustomerId,
                        CoverStartDate = cd.CoverStartDate,
                        CoverEndDate = cd.CoverEndDate,
                        PremiumPayoutTerm = cd.PremiumPayoutTerm,
                        BranchCode = cd.BranchCode,
                        Quotenumber = cd.Quotenumber,
                        QuoteDate = cd.QuoteDate
                    },
                    RiskDetails = cd.RiskDetails // Already selected above
                }).ToList()
            };
        }

        public async Task<int> DeleteQuoteById(int id)
        {
            var existingCoverDetail = await _dbContext.CoverDetails
                .FirstOrDefaultAsync(u => u.CoverDetailId == id);

            if (existingCoverDetail != null)
            {
                _dbContext.CoverDetails.Remove(existingCoverDetail);
                var associatedRiskDetail = await _dbContext.RiskDetails
                    .FirstOrDefaultAsync(u => u.CoverDetailId == id);

                if (associatedRiskDetail != null)
                {
                    _dbContext.RiskDetails.Remove(associatedRiskDetail);
                }

                await _dbContext.SaveChangesAsync();
            }

            return existingCoverDetail?.CoverDetailId ?? -1; // Return -1 if not found
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _dbContext.Customers.AnyAsync(u => u.Email == email);
        }
    }
}
