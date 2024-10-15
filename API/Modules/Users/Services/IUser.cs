using HollardTechTestApi.Data;
using HollardTechTestApi.Modules.Users.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks; // Ensure this namespace is included

namespace HollardTechTestApi.Modules.Users.Services
{
    /// <summary>
    /// Interface for user-related operations.
    /// </summary>
    public interface IUser
    {
        /// <summary>
        /// Gets a list of all users.
        /// </summary>
        /// <returns>A list of <see cref="GetUserDto"/>.</returns>
        Task<List<GetUserDto>> GetUsersAsync();

        /// <summary>
        /// Gets a user by their unique identifier.
        /// </summary>
        /// <param name="id">The unique identifier of the user.</param>
        /// <returns>A <see cref="GetUserDto"/> representing the user.</returns>
        Task<GetUserDto> GetUserByIdAsync(Guid id);

        /// <summary>
        /// Creates a new user.
        /// </summary>
        /// <param name="user">The details of the user to create.</param>
        /// <returns>The created <see cref="Customer"/>.</returns>
        Task<Customer> CreateUserAsync(CreateUserDto user);

        /// <summary>
        /// Updates an existing user.
        /// </summary>
        /// <param name="user">The updated details of the user.</param>
        /// <returns>The updated <see cref="Customer"/>.</returns>
        Task<Customer> UpdateUserAsync(UpdateUserDto user);

        /// <summary>
        /// Deletes a user by their unique identifier.
        /// </summary>
        /// <param name="id">The unique identifier of the user.</param>
        /// <returns>A boolean indicating the success of the operation.</returns>
        Task<bool> DeleteUserAsync(Guid id); // Changed to Guid to match User model

        /// <summary>
        /// Authenticates a user and returns their details.
        /// </summary>
        /// <param name="signInDto">The sign-in credentials.</param>
        /// <returns>A <see cref="GetUserDto"/> representing the authenticated user.</returns>
        Task<GetUserDto> LoginUsersAsync(SignInDto signInDto);

        /// <summary>
        /// Adds or updates cover details for a customer.
        /// </summary>
        /// <param name="coverDetailsRequestDto">The cover details request.</param>
        /// <returns>The <see cref="CoverDetail"/> added or updated.</returns>
        Task<CoverDetail> AddUpdateCoverDetails(CoverDetailsRequest coverDetailsRequestDto,Guid customerId);

        /// <summary>
        /// Adds or updates risk details for a customer.
        /// </summary>
        /// <param name="riskDetailsRequestDto">The risk details request.</param>
        /// <returns>The <see cref="RiskDetail"/> added or updated.</returns>
        Task<RiskDetail> AddUpdateRiskDetails(RiskDetailsRequest riskDetailsRequestDto, Guid customerId);

        /// <summary>
        /// Gets a quote by the customer identifier.
        /// </summary>
        /// <param name="id">The unique identifier of the quote.</param>
        /// <returns>The <see cref="Quote"/> associated with the provided identifier.</returns>
        Task<Quote> GetQuoteById(Guid id);

        /// <summary>
        /// Deletes a quote by its identifier.
        /// </summary>
        /// <param name="id">The identifier of the quote to delete.</param>
        /// <returns>The identifier of the deleted quote.</returns>
        Task<int> DeleteQuoteById(int id); // Renamed for consistency

        /// <summary>
        /// Checks if an email already exists.
        /// </summary>
        /// <param name="email">The email to check.</param>
        /// <returns>True if the email exists; otherwise, false.</returns>
        Task<bool> EmailExistsAsync(string email);
    }
}


